import { NextRequest, NextResponse } from 'next/server';
import { getDefaultThreadsClient } from '@/lib/threads-client';
import { getUserByThreadsId } from '@/lib/threads-db';
import { getThreadsAuthStatus } from '@/lib/threads-auth';
import { z } from 'zod';

// Validation schema for thread creation
const publishSchema = z.object({
  text: z.string().min(1).max(500),
  media_type: z.enum(['TEXT', 'IMAGE', 'VIDEO']).optional(),
  image_url: z.string().url().optional(),
  video_url: z.string().url().optional(),
  reply_to_id: z.string().optional(),
  quote_post_id: z.string().optional(),
  allow_reply_tier: z.enum(['everyone', 'mentioned_only', 'accounts_you_follow']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get authentication status
    const authStatus = getThreadsAuthStatus(request);

    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = publishSchema.parse(body);

    // Get user from database
    const dbUser = await getUserByThreadsId(authStatus.user.id);
    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    // Create Threads client
    const client = getDefaultThreadsClient(dbUser.id);

    // Check publish quota
    const quota = await client.getPublishQuota();
    if (quota.quota_usage >= quota.config.quota_total) {
      return NextResponse.json(
        {
          error: 'Publish quota exceeded',
          quota: {
            used: quota.quota_usage,
            total: quota.config.quota_total,
            resetTime: quota.config.quota_duration
          }
        },
        { status: 429 }
      );
    }

    // Create thread container
    const containerParams: any = {
      text: validatedData.text,
      reply_to_id: validatedData.reply_to_id,
      quote_post_id: validatedData.quote_post_id,
      allow_reply_tier: validatedData.allow_reply_tier,
    };

    // Only add media-related fields if they exist
    if (validatedData.media_type) {
      containerParams.media_type = validatedData.media_type;
    }
    if (validatedData.image_url) {
      containerParams.image_url = validatedData.image_url;
    }
    if (validatedData.video_url) {
      containerParams.video_url = validatedData.video_url;
    }

    const container = await client.createThreadsContainer(containerParams);

    // Publish the container
    const published = await client.publishThreadsContainer(container.id);

    return NextResponse.json({
      success: true,
      thread: published,
      containerId: container.id,
      quota: {
        used: quota.quota_usage + 1,
        total: quota.config.quota_total
      }
    });

  } catch (error) {
    console.error('Error publishing thread:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication failed, please re-authenticate' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to publish thread' },
      { status: 500 }
    );
  }
}