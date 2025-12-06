/**
 * Authentication Configuration
 * Centralized configuration for OAuth and API endpoints
 */

export const AUTH_CONFIG = {
  // OAuth configuration
  oauth: {
    clientId: process.env.NEXT_PUBLIC_THREADS_CLIENT_ID || '',
    redirectUri: process.env.NEXT_PUBLIC_THREADS_REDIRECT_URI || '',
    scopes: [
      'threads_basic',
      'threads_content_publish',
      'threads_manage_insights',
      'threads_manage_replies',
      'threads_profile_discovery',
      'threads_read_replies',
    ] as const,
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
    endpoints: {
      login: '/users/login',
      logout: '/users/logout',
      refresh: '/users/refresh',
      profile: '/users/profile',
    } as const,
  },

  // Storage configuration
  storage: {
    accessTokenKey: 'accessToken',
    refreshTokenKey: 'refreshToken',
    userKey: 'authUser',
    authStateKey: 'authState',
  } as const,

  // UI configuration
  ui: {
    defaultRedirect: '/dashboard',
    authPage: '/auth',
    toastDuration: 5000,
  } as const,
}
