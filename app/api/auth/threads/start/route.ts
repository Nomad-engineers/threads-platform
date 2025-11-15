import { NextResponse } from 'next/server';
import { generateThreadsOAuthUrl, generateSecureState } from '@/lib/threads-oauth';

export async function POST() {
  try {
    // Generate a secure state parameter for CSRF protection
    const state = generateSecureState();

    // Generate the OAuth redirect URL
    const redirectUrl = generateThreadsOAuthUrl(state);

    // Return the URL to the client
    return NextResponse.json({
      success: true,
      redirect_url: redirectUrl,
      state
    });
  } catch (error) {
    console.error('OAuth start error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initiate OAuth flow'
      },
      { status: 500 }
    );
  }
}