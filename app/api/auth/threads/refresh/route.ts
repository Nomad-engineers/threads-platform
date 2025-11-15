import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken, calculateTokenExpiration } from '@/lib/threads-oauth';

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('threads_refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token available' },
        { status: 401 }
      );
    }

    const tokenResponse = await refreshAccessToken(refreshToken);
    const expiresAt = calculateTokenExpiration(tokenResponse.expires_in);

    const response = NextResponse.json({
      success: true,
      expiresAt
    });

    // Update the access token cookie
    response.cookies.set('threads_access_token', tokenResponse.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenResponse.expires_in,
      path: '/'
    });

    // Update refresh token if provided
    if (tokenResponse.refresh_token) {
      response.cookies.set('threads_refresh_token', tokenResponse.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
    }

    // Update expiration time
    response.cookies.set('threads_token_expires_at', expiresAt.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokenResponse.expires_in,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);

    // Clear invalid tokens
    const response = NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 401 }
    );

    response.cookies.set('threads_access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    response.cookies.set('threads_refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return response;
  }
}