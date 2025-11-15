import { NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Get the auth token from the request
    const authHeader = request.headers.get('authorization');
    const cookies = (request as any).cookies || {};
    const cookieToken = cookies.get('auth_token')?.value ||
                      (request as any).cookies?.get('auth_token');

    const token = authHeader?.replace('Bearer ', '') || cookieToken;

    // Remove tokens from database if user is authenticated
    if (token) {
      try {
        // Verify the JWT token and get user info
        const jwtPayload = await verifyJWT(token);

        if (jwtPayload) {
          // Delete tokens from database
          await prisma.threadsToken.delete({
            where: { userId: jwtPayload.userId }
          });

          console.log(`Removed Threads tokens for user: ${jwtPayload.userId}`);
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

    // Clear all authentication-related cookies
    const cookiesToClear = [
      'auth_token',
      'user_data',
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
      {
        success: false,
        error: 'Failed to logout'
      },
      { status: 500 }
    );
  }
}