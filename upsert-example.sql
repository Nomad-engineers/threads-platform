-- Example: User Upsert Logic for Threads OAuth Only Authentication

-- Function to handle user upsert during OAuth callback
CREATE OR REPLACE FUNCTION upsert_user_from_threads_oauth(
  p_threads_user_id VARCHAR(255),
  p_threads_username VARCHAR(255),
  p_threads_full_name VARCHAR(255) DEFAULT NULL,
  p_threads_profile_pic TEXT DEFAULT NULL,
  p_threads_account_id VARCHAR(255) DEFAULT NULL,
  p_access_token TEXT,
  p_refresh_token TEXT DEFAULT NULL,
  p_expires_at TIMESTAMP WITH TIME ZONE,
  p_token_scope VARCHAR(255) DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  existing_user_id users.id%TYPE;
  result JSON;
BEGIN
  -- Check if user exists by threadsUserId
  SELECT id INTO existing_user_id
  FROM users
  WHERE "threadsUserId" = p_threads_user_id;

  IF existing_user_id IS NOT NULL THEN
    -- Update existing user
    UPDATE users
    SET
      "threadsUsername" = p_threads_username,
      "threadsFullName" = COALESCE(p_threads_full_name, "threadsFullName"),
      "threadsProfilePic" = COALESCE(p_threads_profile_pic, "threadsProfilePic"),
      "threadsAccountId" = COALESCE(p_threads_account_id, "threadsAccountId"),
      -- Update legacy fields for backward compatibility
      fullName = COALESCE(p_threads_full_name, fullName),
      profilePictureUrl = COALESCE(p_threads_profile_pic, profilePictureUrl),
      "lastSyncAt" = NOW(),
      "updatedAt" = NOW()
    WHERE id = existing_user_id;

    -- Update or create token record
    INSERT INTO threads_tokens (
      "userId",
      "accessToken",
      "refreshToken",
      "expiresAt",
      "issuedAt",
      "lastRefreshedAt",
      "scope",
      "threadsUserId",
      "threadsUsername",
      "threadsAccountId"
    ) VALUES (
      existing_user_id,
      p_access_token,
      p_refresh_token,
      p_expires_at,
      NOW(),
      NOW(),
      p_token_scope,
      p_threads_user_id,
      p_threads_username,
      p_threads_account_id
    )
    ON CONFLICT ("userId")
    DO UPDATE SET
      "accessToken" = EXCLUDED."accessToken",
      "refreshToken" = EXCLUDED."refreshToken",
      "expiresAt" = EXCLUDED."expiresAt",
      "lastRefreshedAt" = NOW(),
      "scope" = EXCLUDED."scope",
      "updatedAt" = NOW()
    RETURNING json_build_object(
      'action', 'updated',
      'userId', id,
      'threadsUserId', "threadsUserId",
      'threadsUsername', "threadsUsername"
    ) INTO result;

  ELSE
    -- Create new user
    INSERT INTO users (
      "threadsUserId",
      "threadsUsername",
      "threadsFullName",
      "threadsProfilePic",
      "threadsAccountId",
      fullName,
      profilePictureUrl,
      "lastSyncAt"
    ) VALUES (
      p_threads_user_id,
      p_threads_username,
      p_threads_full_name,
      p_threads_profile_pic,
      p_threads_account_id,
      p_threads_full_name,
      p_threads_profile_pic,
      NOW()
    )
    RETURNING json_build_object(
      'action', 'created',
      'userId', id,
      'threadsUserId', "threadsUserId",
      'threadsUsername', "threadsUsername"
    ) INTO result;

    -- Create token record for new user
    INSERT INTO threads_tokens (
      "userId",
      "accessToken",
      "refreshToken",
      "expiresAt",
      "issuedAt",
      "lastRefreshedAt",
      "scope",
      "threadsUserId",
      "threadsUsername",
      "threadsAccountId"
    ) VALUES (
      (SELECT id FROM users WHERE "threadsUserId" = p_threads_user_id),
      p_access_token,
      p_refresh_token,
      p_expires_at,
      NOW(),
      NOW(),
      p_token_scope,
      p_threads_user_id,
      p_threads_username,
      p_threads_account_id
    );
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Example usage:
-- SELECT upsert_user_from_threads_oauth(
--   '123456789',
--   'johndoe',
--   'John Doe',
--   'https://example.com/profile.jpg',
--   'acc_123456',
--   'access_token_here',
--   'refresh_token_here',
--   NOW() + INTERVAL '1 hour',
--   'basic profile'
-- );

-- Create optimized index for upsert performance
CREATE INDEX IF NOT EXISTS idx_users_threads_user_id_hash
ON users USING hash("threadsUserId");

-- Create partial index for active users only
CREATE INDEX IF NOT EXISTS idx_users_active_threads
ON users("threadsUserId", "threadsUsername")
WHERE "subscriptionStatus" = 'ACTIVE';