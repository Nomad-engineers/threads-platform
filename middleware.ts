import { NextRequest, NextResponse } from 'next/server';
import { getThreadsAuthStatus } from '@/lib/threads-auth';

// Paths that require Threads authentication
const protectedPaths = [
  '/dashboard',
  '/api/threads',
  '/api/analytics',
  '/api/scheduling',
  '/api/comments'
];

// Paths that should be accessible without authentication
const publicPaths = [
  '/',
  '/auth',
  '/auth/threads-demo',
  '/privacy',
  '/terms',
  '/about',
  '/contact',
  '/demo',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/robots.txt'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/favicon.') ||
    pathname === '/robots.txt'
  ) {
    return NextResponse.next();
  }

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  );

  const isPublicPath = publicPaths.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  );

  // Get authentication status
  const authStatus = getThreadsAuthStatus(request);

  // Allow access to dashboard - authentication will be checked on client side
  // Don't redirect from middleware since we use localStorage

  // For API routes, return 401 instead of redirect
  if (pathname.startsWith('/api/') && isProtectedPath && !authStatus.isAuthenticated) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Don't redirect authenticated users - let client handle auth flow

  // Add auth headers to requests for downstream usage
  const response = NextResponse.next();

  if (authStatus.isAuthenticated && authStatus.user) {
    // Add user info to request headers for API routes
    response.headers.set('x-threads-user-id', authStatus.user.id);
    response.headers.set('x-threads-username', authStatus.user.username);

    // Add auth status for client-side usage
    response.headers.set('x-authenticated', 'true');
  }

  // Handle token refresh scenarios
  if (authStatus.isAuthenticated && authStatus.needsRefresh && !pathname.startsWith('/api/auth/')) {
    // For API calls, let the client handle refresh
    // For page navigation, we could add a refresh indicator
    response.headers.set('x-token-refresh-needed', 'true');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|public).*)',
  ],
};