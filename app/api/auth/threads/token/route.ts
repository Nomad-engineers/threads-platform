import { NextRequest, NextResponse } from 'next/server';
import { getThreadsTokens, updateTokenLastUsed } from '@/lib/threads-db';

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('threads_user_id')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'No user session found' },
        { status: 401 }
      );
    }

    const tokens = await getThreadsTokens(userId);

    if (!tokens) {
      return NextResponse.json(
        { error: 'No tokens found for user' },
        { status: 404 }
      );
    }

    // Update last used timestamp
    await updateTokenLastUsed(userId);

    // Return token info (without actual tokens for security)
    return NextResponse.json({
      success: true,
      tokenInfo: {
        hasLongLivedToken: !!tokens.longLivedToken,
        longLivedExpiresAt: tokens.longLivedExpiresAt,
        tokenType: tokens.tokenType,
        scope: tokens.scope,
        threadsUserId: tokens.threadsUserId,
        threadsUsername: tokens.threadsUsername,
        lastUsedAt: tokens.lastUsedAt,
        user: {
          id: tokens.user.id,
          username: tokens.user.threadsUsername,
          subscriptionTier: tokens.user.subscriptionTier,
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}