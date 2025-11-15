'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ThreadsSignInButton, ThreadsSignInOnlyButton, ThreadsAuthStatus } from '@/components/auth';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';

export default function ThreadsAuthDemo() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Threads OAuth2 Integration</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Complete OAuth2 Sign-In implementation for Meta's Threads API
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <Badge variant="default">Next.js 15</Badge>
          <Badge variant="secondary">React 19</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">OAuth2</Badge>
          <Badge variant="secondary">Meta Threads API</Badge>
        </div>
      </div>

      {/* Authentication Status Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Authentication Status</CardTitle>
          <CardDescription>
            Real-time status of your Threads account connection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ThreadsAuthStatus />
        </CardContent>
      </Card>

      {/* Sign-In Components */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sign-In with User Info</CardTitle>
            <CardDescription>
              Shows user info when authenticated and provides sign out option
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ThreadsSignInButton />
            <div className="text-sm text-muted-foreground">
              This component displays user information when signed in and provides a sign out option.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sign-In Only Button</CardTitle>
            <CardDescription>
              Simple button that only handles sign-in functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ThreadsSignInOnlyButton variant="outline" />
            <div className="text-sm text-muted-foreground">
              This component only shows the sign-in button without user information.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Status Display */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compact Status Display</CardTitle>
          <CardDescription>
            Small inline component showing authentication status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ThreadsAuthStatus compact />
            <div className="text-sm text-muted-foreground">
              Perfect for navigation headers or sidebar integration.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Implementation Details
          </CardTitle>
          <CardDescription>
            Key components and endpoints of the OAuth2 implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">API Endpoints</h4>
            <div className="grid gap-2 text-sm">
              <div className="p-2 bg-muted rounded">
                <code className="font-mono">GET /api/auth/threads</code>
                <p className="text-muted-foreground text-xs mt-1">
                  Initiates OAuth flow and redirects to Threads authorization page
                </p>
              </div>
              <div className="p-2 bg-muted rounded">
                <code className="font-mono">GET /api/auth/threads/callback</code>
                <p className="text-muted-foreground text-xs mt-1">
                  Handles OAuth callback and exchanges authorization code for access token
                </p>
              </div>
              <div className="p-2 bg-muted rounded">
                <code className="font-mono">POST /api/auth/threads/refresh</code>
                <p className="text-muted-foreground text-xs mt-1">
                  Refreshes expired access tokens using refresh token
                </p>
              </div>
              <div className="p-2 bg-muted rounded">
                <code className="font-mono">POST /api/auth/threads/logout</code>
                <p className="text-muted-foreground text-xs mt-1">
                  Signs out user and clears all authentication cookies
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Secure OAuth2 flow with PKCE support</li>
              <li>• Automatic token refresh handling</li>
              <li>• CSRF protection with state parameters</li>
              <li>• Secure httpOnly cookie storage</li>
              <li>• Real-time authentication status</li>
              <li>• TypeScript type safety</li>
              <li>• Error handling and user feedback</li>
              <li>• Multiple UI component variants</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">OAuth Scopes</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">threads_basic</Badge>
              <Badge variant="outline">threads_content_publish</Badge>
              <Badge variant="outline">threads_manage_insights</Badge>
              <Badge variant="outline">threads_manage_replies</Badge>
              <Badge variant="outline">threads_profile_discovery</Badge>
              <Badge variant="outline">threads_read_replies</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>
            Code examples for integrating the Threads authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Basic Usage</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`import { ThreadsSignInButton } from '@/components/auth';

// In your component
<ThreadsSignInButton onAuthSuccess={(user) => {
  console.log('User authenticated:', user);
}} />`}</code>
            </pre>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Auth Status Hook</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`import { useThreadsAuth } from '@/lib/threads-auth';

// In your component
const { isAuthenticated, user, needsRefresh, logout } = useThreadsAuth();`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}