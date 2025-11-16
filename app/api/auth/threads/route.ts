import { NextResponse } from 'next/server';
import { generateThreadsOAuthUrl, generateSecureState } from '@/lib/threads-oauth';

export async function GET() {
  try {
    // Generate a secure state parameter for CSRF protection
    const state = generateSecureState();

    // Store state in session/cookie for verification
    const response = NextResponse.redirect(generateThreadsOAuthUrl(state));

    // Set the state in a secure, httpOnly cookie
    response.cookies.set('threads_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('OAuth redirect error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate OAuth flow' },
      { status: 500 }
    );
  }
}