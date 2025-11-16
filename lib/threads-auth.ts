import { ThreadsUser } from './threads-oauth';
import React from 'react';

export interface ThreadsAuthStatus {
  isAuthenticated: boolean;
  user: ThreadsUser | null;
  needsRefresh: boolean;
  accessToken?: string | undefined;
}

export function getThreadsAuthStatus(request?: Request): ThreadsAuthStatus {
  // For server-side usage with Request object
  if (request) {
    const cookieHeader = request.headers.get('cookie');
    const cookies = parseCookies(cookieHeader || '');

    return getAuthStatusFromCookies(cookies);
  }

  // For client-side usage
  if (typeof window !== 'undefined') {
    const cookies = parseCookies(document.cookie);
    return getAuthStatusFromCookies(cookies);
  }

  return {
    isAuthenticated: false,
    user: null,
    needsRefresh: false
  };
}

function getAuthStatusFromCookies(cookies: Record<string, string>): ThreadsAuthStatus {
  const accessToken = cookies['threads_access_token'];
  const expiresAt = cookies['threads_token_expires_at'];
  const userCookie = cookies['threads_user'];

  const isAuthenticated = !!accessToken && !!userCookie;
  const needsRefresh = !!expiresAt && Date.now() >= parseInt(expiresAt);

  let user: ThreadsUser | null = null;
  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch {
    user = null;
  }

  return {
    isAuthenticated,
    user,
    needsRefresh,
    accessToken: accessToken || undefined
  };
}

function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });

  return cookies;
}

export async function refreshTokensIfNecessary(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/threads/refresh', {
      method: 'POST',
      credentials: 'include'
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to refresh tokens:', error);
    return false;
  }
}

export async function logoutFromThreads(): Promise<void> {
  try {
    await fetch('/api/auth/threads/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Failed to logout:', error);
  }
}

// React hook for client-side usage
export function useThreadsAuth() {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      user: null,
      needsRefresh: false,
      loading: true,
      refreshTokens: async () => false,
      logout: async () => {}
    };
  }

  const [authStatus, setAuthStatus] = React.useState<ThreadsAuthStatus>(() =>
    getThreadsAuthStatus()
  );

  React.useEffect(() => {
    const checkAuth = () => {
      setAuthStatus(getThreadsAuthStatus());
    };

    // Check auth on mount
    checkAuth();

    // Set up periodic check for token expiration
    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const refreshTokens = React.useCallback(async () => {
    const success = await refreshTokensIfNecessary();
    if (success) {
      setAuthStatus(getThreadsAuthStatus());
    }
    return success;
  }, []);

  const logout = React.useCallback(async () => {
    await logoutFromThreads();
    setAuthStatus({
      isAuthenticated: false,
      user: null,
      needsRefresh: false
    });
  }, []);

  return {
    ...authStatus,
    refreshTokens,
    logout
  };
}