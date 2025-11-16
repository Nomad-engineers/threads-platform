import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForToken,
  getThreadsUser
} from '@/lib/threads-oauth';
import {
  createOrUpdateUser,
  storeThreadsTokens
} from '@/lib/threads-db';
import { generateJWT } from '@/lib/jwt';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'OAuth authentication failed',
          details: error
        },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authorization code is required'
        },
        { status: 400 }
      );
    }

    console.log('Starting OAuth callback flow...');

    // 1. Exchange authorization code for access token
    console.log('Exchanging authorization code for access token...');
    const tokenResponse = await exchangeCodeForToken(code);
    console.log('Access token received');

    // 2. Get user information using access token
    console.log('Fetching Threads user information...');
    const threadsUser = await getThreadsUser(tokenResponse.access_token);
    console.log('User info received:', { id: threadsUser.id, username: threadsUser.username });

    // 3. Create or update user in database (this acts as both registration and login)
    console.log('Creating/updating user in database...');
    const user = await createOrUpdateUser(threadsUser);
    console.log('User stored/updated in database:', user.id);

    // 4. Store tokens in database
    console.log('Storing tokens in database...');
    await storeThreadsTokens(
      user.id,
      tokenResponse.access_token,
      tokenResponse.refresh_token,
      tokenResponse.expires_in,
      threadsUser
    );
    console.log('Tokens stored successfully');

    // 5. Generate JWT token for the user
    console.log('Generating JWT token...');
    const jwtToken = await generateJWT(user);
    console.log('JWT token generated successfully');

    // 6. Return success response with user data and JWT
    const responseData = {
      success: true,
      user: {
        id: user.id,
        username: user.threadsUsername,
        fullName: user.fullName,
        profilePictureUrl: user.profilePictureUrl,
        subscriptionTier: user.subscriptionTier,
        subscriptionStatus: user.subscriptionStatus,
        createdAt: user.createdAt,
      },
      token: jwtToken,
      tokens: {
        access_token: tokenResponse.access_token,
        expires_in: tokenResponse.expires_in,
        token_type: tokenResponse.token_type,
        scope: tokenResponse.scope,
      }
    };

    // Check if this is a web request (browser) vs API request
    const userAgent = request.headers.get('user-agent') || '';
    const isWebBrowser = userAgent.includes('Mozilla') && !userAgent.includes('Postman') && !userAgent.includes('curl');

    if (isWebBrowser) {
      // For web browsers, redirect to dashboard with auth success
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const redirectUrl = new URL('/dashboard', baseUrl);
      redirectUrl.searchParams.set('auth', 'success');

      const response = NextResponse.redirect(redirectUrl);

      // Set JWT token in httpOnly cookie
      response.cookies.set('auth_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      // Set user data in regular cookie for client-side access
      response.cookies.set('user_data', JSON.stringify(responseData.user), {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return response;
    } else {
      // For API requests, return JSON response
      return NextResponse.json(responseData);
    }

  } catch (error) {
    console.error('OAuth callback error:', error);

    const userAgent = request.headers.get('user-agent') || '';
    const isWebBrowser = userAgent.includes('Mozilla') && !userAgent.includes('Postman') && !userAgent.includes('curl');

    if (isWebBrowser) {
      // For web browsers, redirect to auth page with error
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const redirectUrl = new URL('/auth', baseUrl);
      redirectUrl.searchParams.set('error', 'oauth_failed');

      return NextResponse.redirect(redirectUrl);
    } else {
      // For API requests, return JSON error
      return NextResponse.json(
        {
          success: false,
          error: 'OAuth authentication failed',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  }
}