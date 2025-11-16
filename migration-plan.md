# Threads OAuth Migration Plan

## Current State Analysis

✅ **Already Implemented:**
- No email/password fields in the User model
- Threads OAuth fields: `threadsUserId`, `threadsUsername`, `threadsAccountId`
- Separate `ThreadsToken` model for OAuth tokens
- User subscription and timezone management

## Required Changes

The current schema is **already optimized for Threads OAuth only**, but we need to make the following enhancements:

### 1. User Model Updates

**Missing fields to add:**
- `threadsFullName` (for consistency with requested field names)
- `threadsProfilePic` (for consistency with requested field names)

**Field name standardization:**
- Keep `fullName` → add alias for backward compatibility
- Keep `profilePictureUrl` → add alias for backward compatibility

### 2. Enhanced ThreadsToken Model

**Additional fields requested:**
- Better token expiration handling
- Enhanced refresh token management

## Migration Strategy

Since the current schema already supports Threads OAuth, this migration will be:
- **Non-breaking** (no data loss)
- **Additive** (only adding new fields)
- **Backward compatible** (keeping existing field names)

## Risk Assessment: LOW

- No email/password fields to remove (already absent)
- No user data migration required
- No authentication logic changes needed
- Purely additive changes