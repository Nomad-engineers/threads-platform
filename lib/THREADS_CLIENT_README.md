# Threads API Client

A comprehensive TypeScript client for the Meta Threads API with automatic token refresh, error handling, and full type safety.

## Features

- ✅ **Automatic Token Refresh**: Handles token expiration and refresh seamlessly
- ✅ **Full TypeScript Support**: Complete type definitions for all API responses
- ✅ **Error Handling**: Comprehensive error handling with logging
- ✅ **Bearer Token Injection**: Automatic authentication header management
- ✅ **Rate Limiting Support**: Built-in quota checking and management
- ✅ **React Hooks**: Easy-to-use React hooks for client-side development
- ✅ **Server-Side Support**: Works seamlessly in API routes

## Quick Start

### Basic Usage

```typescript
import { getDefaultThreadsClient } from '@/lib/threads-client';

// Get user ID from your authentication system
const userId = 'user-database-id';

// Create client with default settings
const client = getDefaultThreadsClient(userId);

// Get user profile
const profile = await client.getUserProfile();
console.log('User profile:', profile);

// Get user's recent threads
const threads = await client.getUserThreads(['id', 'text', 'timestamp'], 10);
console.log('Recent threads:', threads.data);
```

### Advanced Configuration

```typescript
import { createThreadsClient } from '@/lib/threads-client';

const client = createThreadsClient({
  userId: 'user-id',
  autoRefresh: true,
  logLevel: 'INFO',
  onTokenRefresh: (newToken) => {
    console.log('Token refreshed:', newToken.substring(0, 10) + '...');
  },
  onTokenError: (error) => {
    console.error('Token refresh failed:', error);
    // Redirect to login or show re-auth UI
  }
});
```

## API Methods

### User Profile

```typescript
// Get user profile with specific fields
const profile = await client.getUserProfile([
  'id',
  'username',
  'account_type',
  'threads_profile_picture_url',
  'threads_biography'
]);
```

### Thread Management

```typescript
// Get user's threads
const threads = await client.getUserThreads(
  ['id', 'text', 'timestamp', 'media_type'], // fields
  10,                                         // limit
  'cursor-before',                            // before cursor
  'cursor-after'                              // after cursor
);

// Create a text-only thread
const container = await client.createThreadsContainer({
  text: 'Hello from the Threads API! 🧵',
  media_type: 'TEXT'
});

// Create an image thread
const imageContainer = await client.createThreadsContainer({
  text: 'Check out this image! 📸',
  image_url: 'https://example.com/image.jpg',
  media_type: 'IMAGE',
  allow_reply_tier: 'everyone'
});

// Publish the container
const published = await client.publishThreadsContainer(container.id);
console.log('Published thread:', published.share_url);
```

### Analytics & Insights

```typescript
// Get user insights
const insights = await client.getInsights(
  undefined,                                    // mediaId (undefined = user-level)
  ['views', 'likes', 'comments', 'shares'],    // metrics
  'day'                                         // period
);

// Get insights for specific thread
const threadInsights = await client.getInsights(
  'thread-id',
  ['views', 'likes', 'comments'],
  'week'
);
```

### Replies Management

```typescript
// Get replies for a thread
const replies = await client.getReplies(
  'thread-id',
  ['id', 'text', 'timestamp', 'username'],  // fields
  20                                         // limit
);

// Hide/unhide a reply
await client.manageReply('reply-id', 'hide');
await client.manageReply('reply-id', 'unhide');
```

### Quota Management

```typescript
// Check publish quota
const quota = await client.getPublishQuota();
console.log(`Used ${quota.quota_usage} of ${quota.config.quota_total} posts`);

if (quota.quota_usage < quota.config.quota_total) {
  // Safe to publish
  const result = await client.publishThreadsContainer(containerId);
}
```

## React Hooks

### Basic Hook Usage

```typescript
import { useThreadsClient } from '@/hooks/use-threads-client';

function MyComponent() {
  const {
    client,
    loading,
    error,
    getUserProfile,
    getUserThreads,
    isAuthenticated
  } = useThreadsClient({
    autoRefresh: true,
    logLevel: 'INFO'
  });

  const handleLoadProfile = async () => {
    try {
      const profile = await getUserProfile();
      console.log('Profile:', profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isAuthenticated) return <div>Please log in</div>;

  return (
    <div>
      <button onClick={handleLoadProfile}>Load Profile</button>
    </div>
  );
}
```

### User Data Hook

```typescript
import { useThreadsUserData } from '@/hooks/use-threads-client';

function UserProfile() {
  const { profile, threads, insights, loading, error, refetch } = useThreadsUserData();

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{profile?.username}</h1>
      <p>Threads: {threads.length}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Publishing Hook

```typescript
import { useThreadsPublish } from '@/hooks/use-threads-client';

function ThreadPublisher() {
  const { publishThread, publishing, error } = useThreadsPublish();

  const handlePublish = async () => {
    try {
      const result = await publishThread({
        text: 'Hello from my app! 🚀',
        media_type: 'TEXT',
        allow_reply_tier: 'everyone'
      });
      console.log('Published:', result.share_url);
    } catch (error) {
      console.error('Publish failed:', error);
    }
  };

  return (
    <button onClick={handlePublish} disabled={publishing}>
      {publishing ? 'Publishing...' : 'Publish Thread'}
    </button>
  );
}
```

## API Routes

### User Data Endpoint

```typescript
// app/api/threads/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDefaultThreadsClient } from '@/lib/threads-client';

export async function GET(request: NextRequest) {
  // ... authentication logic ...

  const client = getDefaultThreadsClient(userId);

  const [profile, threads, insights] = await Promise.all([
    client.getUserProfile(),
    client.getUserThreads(['id', 'text', 'timestamp'], 10),
    client.getInsights(undefined, ['followers_count'], 'week')
  ]);

  return NextResponse.json({ profile, threads: threads.data, insights });
}
```

### Publish Endpoint

```typescript
// app/api/threads/publish/route.ts
export async function POST(request: NextRequest) {
  // ... authentication and validation ...

  const client = getDefaultThreadsClient(userId);

  const container = await client.createThreadsContainer({
    text: validatedData.text,
    image_url: validatedData.image_url,
    media_type: validatedData.media_type
  });

  const published = await client.publishThreadsContainer(container.id);

  return NextResponse.json({ success: true, thread: published });
}
```

## Error Handling

The client provides comprehensive error handling:

```typescript
try {
  const profile = await client.getUserProfile();
} catch (error) {
  if (error.message.includes('Authentication failed')) {
    // User needs to re-authenticate
    redirectToLogin();
  } else if (error.message.includes('Publish quota exceeded')) {
    // Handle rate limiting
    showQuotaExceededMessage();
  } else {
    // Handle other errors
    showGenericError(error.message);
  }
}
```

## Token Management

The client automatically handles:

- **Token Expiration**: Checks if tokens are expired before making requests
- **Auto-Refresh**: Automatically refreshes tokens when they expire
- **Database Storage**: Updates tokens in the database
- **Error Recovery**: Handles refresh failures gracefully

### Manual Token Refresh

```typescript
// The client will automatically refresh tokens when needed
// But you can also manually trigger a refresh if needed:

const client = createThreadsClient({
  userId: 'user-id',
  onTokenRefresh: (newToken) => {
    // Update your session state
    updateSessionToken(newToken);
  },
  onTokenError: (error) => {
    // Handle refresh failure
    console.error('Token refresh failed:', error);
  }
});
```

## TypeScript Types

The client includes comprehensive TypeScript types:

```typescript
interface ThreadsUser {
  id: string;
  username: string;
  account_type: string;
  threads_profile_picture_url?: string;
  threads_biography?: string;
}

interface ThreadsMediaObject {
  id: string;
  media_type: 'CAROUSEL_ALBUM' | 'IMAGE' | 'TEXT' | 'VIDEO';
  media_url?: string;
  permalink: string;
  text?: string;
  timestamp: string;
  // ... more fields
}

interface ThreadsInsights {
  id: string;
  name: string;
  period: string;
  values: Array<{
    value: number | string;
    end_time: string;
  }>;
}

interface ThreadsPublishResponse {
  id: string;
  media_type: string;
  media_status: string;
  share_url?: string;
}
```

## Configuration Options

```typescript
interface ThreadsApiClientConfig {
  userId: string;                    // User's database ID
  autoRefresh?: boolean;             // Enable auto token refresh (default: true)
  logLevel?: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'; // Logging level (default: 'ERROR')
  onTokenRefresh?: (newToken: string) => void;     // Callback when token is refreshed
  onTokenError?: (error: Error) => void;           // Callback when refresh fails
}
```

## Best Practices

1. **Always handle errors**: Use try-catch blocks and handle different error types
2. **Check quotas**: Verify publish quotas before creating content
3. **Use React hooks**: Leverage the provided hooks for better state management
4. **Implement proper logging**: Set appropriate log levels for development/production
5. **Handle authentication**: Implement proper re-authentication flows when tokens fail
6. **Validate inputs**: Use the provided validation schemas for API routes

## Environment Variables

Make sure these are configured in your `.env.local`:

```env
DATABASE_URL=your_postgres_connection
REDIS_URL=your_redis_connection
THREADS_CLIENT_ID=your_threads_client_id
THREADS_CLIENT_SECRET=your_threads_client_secret
THREADS_REDIRECT_URI=your_redirect_uri
```

## Support

For issues and questions:

1. Check the [Threads API Documentation](https://developers.facebook.com/docs/threads)
2. Review the error messages in the console
3. Check the network tab for API responses
4. Verify your environment variables are correctly set

The client is designed to be robust and handle most edge cases automatically, but proper error handling and user feedback are essential for a good user experience.