import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  getThreadsUser
} from '@/lib/threads-oauth';
import {
  createOrUpdateUser,
  storeThreadsTokens
} from '@/lib/threads-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}?error=${encodeURIComponent(error)}`
      );
    }

    // Verify state parameter
    const storedState = request.cookies.get('threads_oauth_state')?.value;
    if (!state || !storedState || state !== storedState) {
      console.error('Invalid state parameter');
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}?error=invalid_state`
      );
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}?error=no_code`
      );
    }

    console.log('Starting OAuth callback flow...');

    // 1. Exchange authorization code for short-lived access token
    console.log('Exchanging authorization code for short-lived token...');
    const shortLivedTokenResponse = await exchangeCodeForToken(code);
    console.log('Short-lived token received');

    // 2. Get user information using short-lived token
    console.log('Fetching Threads user information...');
    const threadsUser = await getThreadsUser(shortLivedTokenResponse.access_token);
    console.log('User info received:', { id: threadsUser.id, username: threadsUser.username });

    // 3. Exchange short-lived token for long-lived token
    console.log('Exchanging short-lived token for long-lived token...');
    const longLivedTokenResponse = await exchangeForLongLivedToken(shortLivedTokenResponse.access_token);
    console.log('Long-lived token received, expires in:', longLivedTokenResponse.expires_in, 'seconds');

    // 4. Create or update user in database
    console.log('Storing user information in database...');
    const user = await createOrUpdateUser(threadsUser);
    console.log('User stored/updated in database:', user.id);

    // 5. Store tokens in database
    console.log('Storing tokens in database...');
    await storeThreadsTokens(user.id, shortLivedTokenResponse, longLivedTokenResponse, threadsUser);
    console.log('Tokens stored successfully');

    // 6. Set up session cookies for immediate use
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard?auth=success`
    );

    // Store user session data in secure cookies
    response.cookies.set('threads_user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    // Store user data in a regular cookie (for client-side access)
    response.cookies.set('threads_user', JSON.stringify({
      id: threadsUser.id,
      username: threadsUser.username,
      account_type: threadsUser.account_type,
      profile_picture_url: threadsUser.threads_profile_picture_url
    }), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    // Clear the state cookie
    response.cookies.set('threads_oauth_state', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}?error=oauth_failed`
    );
  }
}