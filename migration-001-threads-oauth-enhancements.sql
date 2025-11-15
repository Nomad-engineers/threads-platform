-- Migration: Add Threads OAuth Enhanced Fields
-- Description: Enhance existing Threads OAuth support with additional fields
-- Risk: LOW - Additive changes only, no data loss

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Start transaction
BEGIN;

-- Add new fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS "threadsFullName" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "threadsProfilePic" TEXT;

-- Add comment for documentation
COMMENT ON COLUMN users."threadsFullName" IS 'User full name from Threads profile';
COMMENT ON COLUMN users."threadsProfilePic" IS 'Profile picture URL from Threads';
COMMENT ON COLUMN users.fullName IS 'Legacy field - use threadsFullName instead';
COMMENT ON COLUMN users.profilePictureUrl IS 'Legacy field - use threadsProfilePic instead';

-- Add enhanced fields to threads_tokens table
ALTER TABLE threads_tokens
ADD COLUMN IF NOT EXISTS "issuedAt" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "lastRefreshedAt" TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS "isValid" BOOLEAN DEFAULT TRUE;

-- Add comments for documentation
COMMENT ON COLUMN threads_tokens."issuedAt" IS 'When the access token was originally issued';
COMMENT ON COLUMN threads_tokens."lastRefreshedAt" IS 'When the access token was last refreshed';
COMMENT ON COLUMN threads_tokens."isValid" IS 'Flag to indicate if token is currently valid';

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_users_threads_user_id ON users("threadsUserId");
CREATE INDEX IF NOT EXISTS idx_users_threads_username ON users("threadsUsername");
CREATE INDEX IF NOT EXISTS idx_threads_tokens_valid ON threads_tokens("isValid") WHERE "isValid" = TRUE;
CREATE INDEX IF NOT EXISTS idx_threads_tokens_expires_at ON threads_tokens("expiresAt");

-- Add constraint to ensure threadsUserId is not null
ALTER TABLE users ADD CONSTRAINT chk_users_threads_user_id_not_null
CHECK ("threadsUserId" IS NOT NULL);

-- Add constraint to ensure threadsUsername is not null
ALTER TABLE users ADD CONSTRAINT chk_users_threads_username_not_null
CHECK ("threadsUsername" IS NOT NULL);

-- Create function to sync legacy fields (optional data migration)
CREATE OR REPLACE FUNCTION sync_legacy_threads_fields()
RETURNS void AS $$
BEGIN
    -- Sync existing data to new fields if empty
    UPDATE users
    SET "threadsFullName" = fullName
    WHERE "threadsFullName" IS NULL AND fullName IS NOT NULL;

    UPDATE users
    SET "threadsProfilePic" = profilePictureUrl
    WHERE "threadsProfilePic" IS NULL AND profilePictureUrl IS NOT NULL;

    -- Set issuedAt for existing tokens if null
    UPDATE threads_tokens
    SET "issuedAt" = createdAt
    WHERE "issuedAt" IS NULL;

    RAISE NOTICE 'Legacy Threads fields synchronized';
END;
$$ LANGUAGE plpgsql;

-- Run the sync function
SELECT sync_legacy_threads_fields();

-- Drop the temporary function
DROP FUNCTION sync_legacy_threads_fields();

-- Create trigger to automatically maintain isValid flag based on expiration
CREATE OR REPLACE FUNCTION update_token_validity()
RETURNS TRIGGER AS $$
BEGIN
    -- Update isValid based on expiration
    IF NEW."expiresAt" <= NOW() THEN
        NEW."isValid" = FALSE;
    ELSE
        NEW."isValid" = TRUE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update token validity
DROP TRIGGER IF EXISTS trigger_update_token_validity ON threads_tokens;
CREATE TRIGGER trigger_update_token_validity
    BEFORE INSERT OR UPDATE ON threads_tokens
    FOR EACH ROW
    EXECUTE FUNCTION update_token_validity();

-- Update existing tokens validity
UPDATE threads_tokens
SET "isValid" = ("expiresAt" > NOW())
WHERE "isValid" = TRUE OR "expiresAt" <= NOW();

COMMIT;

-- Migration summary
-- ✓ Added threadsFullName and threadsProfilePic fields
-- ✓ Added enhanced token tracking fields (issuedAt, lastRefreshedAt, isValid)
-- ✓ Created performance indexes
-- ✓ Added data constraints
-- ✓ Synchronized legacy field data
-- ✓ Created automatic token validity management