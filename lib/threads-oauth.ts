export interface ThreadsOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface ThreadsTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string | undefined;
  scope?: string | undefined;
}

export interface ThreadsLongLivedTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ThreadsUser {
  id: string;
  username: string;
  account_type: string;
  threads_profile_picture_url?: string | undefined;
  threads_biography?: string | undefined;
}

export const THREADS_OAUTH_CONFIG: ThreadsOAuthConfig = {
  clientId: process.env.THREADS_CLIENT_ID || '1165567432148744',
  clientSecret: process.env.THREADS_CLIENT_SECRET || 'e373ac0c13db41f6d55954503396ef15',
  redirectUri: process.env.THREADS_REDIRECT_URI || 'https://nomad.publicvm.com/api/auth/threads/callback',
  scopes: [
    'threads_basic',
    'threads_content_publish',
    'threads_manage_insights',
    'threads_manage_replies',
    'threads_profile_discovery',
    'threads_read_replies'
  ]
};

export const THREADS_API_BASE_URL = 'https://graph.threads.net';
export const FACEBOOK_OAUTH_URL = 'https://www.facebook.com/v18.0/dialog/oauth';

export function generateThreadsOAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: THREADS_OAUTH_CONFIG.clientId,
    redirect_uri: THREADS_OAUTH_CONFIG.redirectUri,
    scope: THREADS_OAUTH_CONFIG.scopes.join(','),
    response_type: 'code',
    state
  });

  return `${FACEBOOK_OAUTH_URL}?${params.toString()}`;
}

export function generateSecureState(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

export async function exchangeCodeForToken(code: string): Promise<ThreadsTokenResponse> {
  const response = await fetch(`${THREADS_API_BASE_URL}/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: THREADS_OAUTH_CONFIG.clientId,
      client_secret: THREADS_OAUTH_CONFIG.clientSecret,
      redirect_uri: THREADS_OAUTH_CONFIG.redirectUri,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  const data = await response.json();

  // The response might be in form-urlencoded format
  if (typeof data === 'string') {
    const urlParams = new URLSearchParams(data);
    return {
      access_token: urlParams.get('access_token') || '',
      token_type: urlParams.get('token_type') || 'bearer',
      expires_in: parseInt(urlParams.get('expires_in') || '3600'),
      refresh_token: urlParams.get('refresh_token') || undefined,
      scope: urlParams.get('scope') || undefined,
    };
  }

  return data as ThreadsTokenResponse;
}

export async function refreshAccessToken(refreshToken: string): Promise<ThreadsTokenResponse> {
  const response = await fetch(`${THREADS_API_BASE_URL}/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: THREADS_OAUTH_CONFIG.clientId,
      client_secret: THREADS_OAUTH_CONFIG.clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token refresh failed: ${error}`);
  }

  const data = await response.json();
  return data as ThreadsTokenResponse;
}

export async function getThreadsUser(accessToken: string): Promise<ThreadsUser> {
  const response = await fetch(`${THREADS_API_BASE_URL}/me?fields=id,username,account_type,threads_profile_picture_url,threads_biography`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch user: ${error}`);
  }

  return response.json() as Promise<ThreadsUser>;
}

/**
 * Exchange short-lived access token for long-lived access token
 * As per: https://developers.facebook.com/docs/threads/get-started/get-access-tokens-and-permissions
 */
export async function exchangeForLongLivedToken(shortLivedToken: string): Promise<ThreadsLongLivedTokenResponse> {
  const params = new URLSearchParams({
    grant_type: 'th_exchange_token',
    client_secret: THREADS_OAUTH_CONFIG.clientSecret,
    access_token: shortLivedToken,
  });

  const response = await fetch(`${THREADS_API_BASE_URL}/access_token?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Long-lived token exchange failed: ${error}`);
  }

  const data = await response.json();
  return data as ThreadsLongLivedTokenResponse;
}

export function isTokenExpired(tokenExpiresAt: number): boolean {
  return Date.now() >= tokenExpiresAt;
}

export function calculateTokenExpiration(expiresIn: number): number {
  return Date.now() + (expiresIn * 1000) - (5 * 60 * 1000); // 5 minutes buffer
}