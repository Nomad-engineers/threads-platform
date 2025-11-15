import { NextRequest, NextResponse } from 'next/server';
import { getDefaultThreadsClient } from '@/lib/threads-client';
import { getUserByThreadsId } from '@/lib/threads-db';
import { getThreadsAuthStatus } from '@/lib/threads-auth';

export async function GET(request: NextRequest) {
  try {
    // Get authentication status from cookies
    const authStatus = getThreadsAuthStatus(request);

    if (!authStatus.isAuthenticated || !authStatus.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

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

    // Fetch user profile and recent threads
    const [profile, recentThreads, insights, quota] = await Promise.all([
      client.getUserProfile([
        'id',
        'username',
        'account_type',
        'threads_profile_picture_url',
        'threads_biography'
      ]),
      client.getUserThreads(['id', 'text', 'timestamp', 'media_type', 'permalink'], 10),
      client.getInsights(undefined, ['followers_count'], 'week'),
      client.getPublishQuota()
    ]);

    return NextResponse.json({
      profile,
      recentThreads: recentThreads.data || [],
      insights,
      quota,
      lastSync: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching Threads user data:', error);

    if (error instanceof Error && error.message.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Authentication failed, please re-authenticate' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}