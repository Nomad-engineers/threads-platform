# Production Deployment Fallback Plan

## Migration Overview
**Migration Name**: `001_threads_oauth_enhancements`
**Risk Level**: LOW
**Type**: Additive (no data loss)

## Pre-Deployment Checklist

### 1. Database Backup
```bash
# Create full database backup
pg_dump $DATABASE_URL > backup_before_oauth_migration_$(date +%Y%m%d_%H%M%S).sql

# Verify backup integrity
pg_restore --list backup_before_oauth_migration_*.sql > /dev/null
```

### 2. Environment Verification
```bash
# Check database connection
psql $DATABASE_URL -c "SELECT version();"

# Verify current schema
psql $DATABASE_URL -c "\d users"
psql $DATABASE_URL -c "\d threads_tokens"
```

### 3. Application State
- [ ] Ensure no ongoing authentication flows
- [ ] Check for active user sessions
- [ ] Verify Threads API credentials are current

## Deployment Steps

### Phase 1: Schema Migration
```bash
# Apply migration using Prisma
pnpm db:migrate

# Or apply SQL manually for more control
psql $DATABASE_URL -f migration-001-threads-oauth-enhancements.sql
```

### Phase 2: Application Update
```bash
# Update Prisma client
pnpm db:generate

# Deploy application code
# (CI/CD process)
```

### Phase 3: Verification
```bash
# Verify new columns exist
psql $DATABASE_URL -c "\d users" | grep threads

# Check data migration
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users WHERE threadsFullName IS NULL;"

# Test token validity trigger
psql $DATABASE_URL -c "SELECT isValid, expiresAt FROM threads_tokens LIMIT 5;"
```

## Rollback Procedures

### Immediate Rollback (Schema)
```sql
-- Remove new columns (safe - no data loss)
ALTER TABLE users DROP COLUMN IF EXISTS "threadsFullName";
ALTER TABLE users DROP COLUMN IF EXISTS "threadsProfilePic";

ALTER TABLE threads_tokens DROP COLUMN IF EXISTS "issuedAt";
ALTER TABLE threads_tokens DROP COLUMN IF EXISTS "lastRefreshedAt";
ALTER TABLE threads_tokens DROP COLUMN IF EXISTS "isValid";

-- Remove indexes
DROP INDEX IF EXISTS idx_users_threads_user_id;
DROP INDEX IF EXISTS idx_users_threads_username;
DROP INDEX IF EXISTS idx_threads_tokens_valid;
DROP INDEX IF EXISTS idx_threads_tokens_expires_at;

-- Remove trigger
DROP TRIGGER IF EXISTS trigger_update_token_validity ON threads_tokens;
DROP FUNCTION IF EXISTS update_token_validity();
```

### Application Rollback
```bash
# Revert to previous application version
# (Deployment system specific)

# Regenerate Prisma client for previous schema
pnpm db:generate
```

## Monitoring & Validation

### Post-Deployment Health Checks

#### 1. Authentication Flow
```bash
# Test OAuth callback
curl -X POST "http://localhost:3000/api/auth/callback/threads" \
  -H "Content-Type: application/json" \
  -d '{"code":"test"}'

# Verify user creation/retrieval
psql $DATABASE_URL -c "SELECT threadsUserId, threadsUsername FROM users ORDER BY createdAt DESC LIMIT 5;"
```

#### 2. Token Management
```bash
# Check token validity triggers
psql $DATABASE_URL -c "
  SELECT
    threadsUserId,
    isValid,
    expiresAt > NOW() as actually_valid
  FROM threads_tokens
  LIMIT 10;
"
```

#### 3. Performance Impact
```bash
# Monitor query performance
psql $DATABASE_URL -c "
  EXPLAIN ANALYZE
  SELECT * FROM users
  WHERE threadsUserId = 'test_user_id';
"
```

### Application Metrics to Monitor
- [ ] Authentication success rate
- [ ] OAuth callback latency
- [ ] Database connection pool usage
- [ ] Error rates in auth endpoints

## Emergency Contacts
- **Database Admin**: [Contact Information]
- **DevOps Lead**: [Contact Information]
- **Product Manager**: [Contact Information]

## Known Risks & Mitigations

### Risk 1: Migration Timeout
- **Mitigation**: Run migration during low-traffic hours
- **Fallback**: Manual SQL execution with connection timeout adjustments

### Risk 2: Application Incompatibility
- **Mitigation**: Feature flag for new OAuth fields
- **Fallback**: Use legacy field aliases during transition

### Risk 3: Token Validity Issues
- **Mitigation**: Manual token refresh scripts prepared
- **Fallback**: Temporarily disable validity checks

## Success Criteria
- [ ] Migration completes without errors
- [ ] All existing users can authenticate
- [ ] New Threads OAuth fields populated
- [ ] Token validity tracking functional
- [ ] No performance degradation >10%
- [ ] Error rates remain below baseline

## Timeline
- **Preparation**: 30 minutes
- **Migration Execution**: 5-10 minutes
- **Verification**: 15 minutes
- **Monitoring**: 1 hour (critical period)
- **Full Monitoring**: 24 hours