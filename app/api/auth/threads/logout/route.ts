import { NextResponse } from 'next/server';
import { getThreadsTokens } from '@/lib/threads-db';
import { getThreadsAuthStatus } from '@/lib/threads-auth';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Get current user info from cookies before clearing
    const authStatus = getThreadsAuthStatus(request);

    // Remove tokens from database if user is authenticated
    if (authStatus.isAuthenticated && authStatus.user) {
      try {
        // Get user from database using Threads user ID
        const dbUser = await prisma.user.findUnique({
          where: { threadsUserId: authStatus.user.id },
          select: { id: true }
        });

        if (dbUser) {
          // Delete tokens from database
          await prisma.threadsToken.delete({
            where: { userId: dbUser.id }
          });

          console.log(`Removed Threads tokens for user: ${dbUser.id}`);
        }
      } catch (dbError) {
        console.error('Failed to remove tokens from database:', dbError);
        // Continue with cookie cleanup even if DB operation fails
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Successfully logged out'
    });

    // Clear all Threads-related cookies
    const cookiesToClear = [
      'threads_access_token',
      'threads_refresh_token',
      'threads_token_expires_at',
      'threads_user',
      'threads_user_id',
      'threads_oauth_state'
    ];

    cookiesToClear.forEach(cookieName => {
      response.cookies.set(cookieName, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      });
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}