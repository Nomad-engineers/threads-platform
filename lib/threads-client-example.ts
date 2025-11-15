/**
 * Example usage of the Threads API Client
 * This file demonstrates how to use the threads-client for various operations
 */

import { createThreadsClient, getDefaultThreadsClient } from './threads-client';
import { getUserByThreadsId } from './threads-db';

// Example 1: Basic usage with auto-refresh
export async function basicUsageExample() {
  // Get user ID from your auth system
  const userId = 'user-id-from-your-database';

  // Create client with default settings
  const client = getDefaultThreadsClient(userId);

  try {
    // Get user profile
    const profile = await client.getUserProfile();
    console.log('User profile:', profile);

    // Get user's threads
    const threads = await client.getUserThreads({ limit: 10 });
    console.log('User threads:', threads.data);

    // Get insights
    const insights = await client.getInsights();
    console.log('User insights:', insights);

    // Create a new text-only thread
    const container = await client.createThreadsContainer({
      text: 'Hello from the Threads API! 🧵',
      media_type: 'TEXT'
    });

    // Publish the container
    const published = await client.publishThreadsContainer(container.id);
    console.log('Published thread:', published);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Advanced usage with callbacks
export async function advancedUsageExample() {
  const userId = 'user-id-from-your-database';

  // Create client with custom configuration
  const client = createThreadsClient({
    userId,
    autoRefresh: true,
    logLevel: 'INFO',
    onTokenRefresh: (newToken) => {
      console.log('Token was refreshed:', newToken.substring(0, 10) + '...');
      // You could update your session state here
    },
    onTokenError: (error) => {
      console.error('Token refresh failed:', error);
      // You could redirect user to login here
    }
  });

  try {
    // Get detailed user profile
    const detailedProfile = await client.getUserProfile([
      'id',
      'username',
      'account_type',
      'threads_profile_picture_url',
      'threads_biography'
    ]);

    // Get publish quota
    const quota = await client.getPublishQuota();
    console.log('Publish quota:', quota);

    if (quota.quota_usage < quota.config.quota_total) {
      // Create a thread with an image
      const imageContainer = await client.createThreadsContainer({
        text: 'Check out this image! 📸',
        image_url: 'https://example.com/image.jpg',
        media_type: 'IMAGE',
        allow_reply_tier: 'everyone'
      });

      const publishedImage = await client.publishThreadsContainer(imageContainer.id);
      console.log('Published image thread:', publishedImage);
    }

    // Get replies for a specific thread
    const replies = await client.getReplies('thread-id', {
      limit: 20
    });
    console.log('Thread replies:', replies.data);

    // Hide a reply
    if (replies.data.length > 0) {
      await client.manageReply(replies.data[0].id, 'hide');
      console.log('Reply hidden');
    }

  } catch (error) {
    console.error('Advanced usage error:', error);
  }
}

// Example 3: Analytics usage
export async function analyticsExample() {
  const userId = 'user-id-from-your-database';
  const client = getDefaultThreadsClient(userId);

  try {
    // Get user's threads from the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const threads = await client.getUserThreads({
      limit: 50,
      fields: ['id', 'timestamp', 'text', 'media_type']
    });

    console.log(`Found ${threads.data.length} threads from the last week`);

    // Get insights for each thread
    for (const thread of threads.data) {
      const insights = await client.getInsights(thread.id, [
        'views',
        'likes',
        'comments',
        'shares',
        'saves'
      ], 'day');

      console.log(`Insights for thread ${thread.id}:`, {
        text: thread.text?.substring(0, 50) + '...',
        views: insights.find(i => i.name === 'views')?.values[0]?.value || 0,
        likes: insights.find(i => i.name === 'likes')?.values[0]?.value || 0,
        comments: insights.find(i => i.name === 'comments')?.values[0]?.value || 0,
      });
    }

    // Get overall user insights
    const userInsights = await client.getInsights(undefined, [
      'followers_count',
      'views',
      'likes'
    ], 'day');

    console.log('Overall user insights:', userInsights);

  } catch (error) {
    console.error('Analytics error:', error);
  }
}

// Example 4: Content creation workflow
export async function contentCreationExample() {
  const userId = 'user-id-from-your-database';
  const client = getDefaultThreadsClient(userId);

  try {
    // Step 1: Check publish quota
    const quota = await client.getPublishQuota();

    if (quota.quota_usage >= quota.config.quota_total) {
      throw new Error('Publish quota exceeded');
    }

    // Step 2: Create different types of content

    // Text-only thread
    const textContainer = await client.createThreadsContainer({
      text: 'Just a simple text post! ✨',
      media_type: 'TEXT'
    });

    // Image thread
    const imageContainer = await client.createThreadsContainer({
      text: 'Beautiful sunset today! 🌅',
      image_url: 'https://example.com/sunset.jpg',
      media_type: 'IMAGE',
      allow_reply_tier: 'everyone'
    });

    // Reply to an existing thread
    const replyContainer = await client.createThreadsContainer({
      text: 'Great point! I totally agree 👍',
      reply_to_id: 'original-thread-id',
      media_type: 'TEXT'
    });

    // Quote post
    const quoteContainer = await client.createThreadsContainer({
      text: 'This is so relatable!',
      quote_post_id: 'thread-to-quote-id',
      media_type: 'TEXT'
    });

    // Step 3: Publish all containers
    const results = await Promise.all([
      client.publishThreadsContainer(textContainer.id),
      client.publishThreadsContainer(imageContainer.id),
      client.publishThreadsContainer(replyContainer.id),
      client.publishThreadsContainer(quoteContainer.id)
    ]);

    console.log('Published content:', results);

    // Step 4: Get the published content details
    for (const result of results) {
      if (result.share_url) {
        const mediaDetails = await client.getMediaObject(result.id);
        console.log(`Published thread ${result.id}:`, {
          url: result.share_url,
          type: mediaDetails.media_type,
          text: mediaDetails.text,
          timestamp: mediaDetails.timestamp
        });
      }
    }

  } catch (error) {
    console.error('Content creation error:', error);
  }
}

// Example 5: Error handling and recovery
export async function errorHandlingExample() {
  const userId = 'user-id-from-your-database';

  const client = createThreadsClient({
    userId,
    autoRefresh: true,
    logLevel: 'DEBUG',
    onTokenError: async (error) => {
      console.error('Token error detected, attempting recovery...');

      // You could implement additional recovery logic here:
      // - Show re-authentication UI
      // - Clear local session
      // - Redirect to login

      // For now, we'll just log the error
      console.error('Token refresh failed, user may need to re-authenticate');
    }
  });

  try {
    // This will automatically handle token refresh if needed
    const profile = await client.getUserProfile();
    console.log('Successfully fetched profile:', profile.username);

  } catch (error) {
    if (error.message.includes('Authentication failed')) {
      console.error('Authentication failed, user needs to log in again');
      // Redirect to login or show re-authentication UI
    } else {
      console.error('Other error:', error);
    }
  }
}

// Example 6: Server-side usage in API routes
export async function serverSideExample(userId: string) {
  // This would typically be used in an API route
  const client = getDefaultThreadsClient(userId);

  try {
    // Get user data for server-side processing
    const [profile, threads, insights] = await Promise.all([
      client.getUserProfile(),
      client.getUserThreads({ limit: 5 }),
      client.getInsights(undefined, ['followers_count'], 'week')
    ]);

    return {
      profile,
      recentThreads: threads.data,
      insights
    };

  } catch (error) {
    console.error('Server-side API error:', error);
    throw error; // Re-throw to handle in API route
  }
}