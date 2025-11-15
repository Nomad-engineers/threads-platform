import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/threads-oauth';
import { getThreadsTokens, updateTokenLastUsed } from '@/lib/threads-db';
import { verifyJWT } from '@/lib/jwt';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Get the auth token from the request
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;

    const token = authHeader?.replace('Bearer ', '') || cookieToken;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication token is required' },
        { status: 401 }
      );
    }

    // Verify the JWT token and get user info
    const jwtPayload = await verifyJWT(token);
    if (!jwtPayload) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get the user's current tokens from database
    const tokens = await getThreadsTokens(jwtPayload.userId);
    if (!tokens || !tokens.refreshToken) {
      return NextResponse.json(
        { success: false, error: 'No refresh token available' },
        { status: 400 }
      );
    }

    // Use the refresh token to get a new access token
    const newTokenResponse = await refreshAccessToken(tokens.refreshToken);

    // Update the tokens in the database
    await prisma.threadsToken.update({
      where: { userId: jwtPayload.userId },
      data: {
        accessToken: newTokenResponse.access_token,
        refreshToken: newTokenResponse.refresh_token || tokens.refreshToken,
        expiresAt: new Date(Date.now() + (newTokenResponse.expires_in * 1000)),
        lastUsedAt: new Date(),
      },
    });

    // Update last used timestamp
    await updateTokenLastUsed(jwtPayload.userId);

    return NextResponse.json({
      success: true,
      tokens: {
        access_token: newTokenResponse.access_token,
        expires_in: newTokenResponse.expires_in,
        token_type: newTokenResponse.token_type,
        scope: newTokenResponse.scope,
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to refresh token',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}