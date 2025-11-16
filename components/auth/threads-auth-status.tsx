'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Instagram, CheckCircle, AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import { useThreadsAuth } from '@/lib/threads-auth';

interface ThreadsAuthStatusProps {
  showRefreshButton?: boolean;
  showSignOutButton?: boolean;
  compact?: boolean;
}

export function ThreadsAuthStatus({
  showRefreshButton = true,
  showSignOutButton = true,
  compact = false
}: ThreadsAuthStatusProps) {
  const { isAuthenticated, user, needsRefresh, refreshTokens, logout } = useThreadsAuth();

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Instagram className="h-12 w-12 mx-auto text-muted-foreground" />
          <CardTitle>Not Connected to Threads</CardTitle>
          <CardDescription>
            Sign in with Threads to enable analytics and publishing features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" disabled>
            <Instagram className="h-4 w-4 mr-2" />
            Sign in with Threads
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
        <Avatar className="h-6 w-6">
          <AvatarImage src={user.threads_profile_picture_url} alt={user.username} />
          <AvatarFallback>
            <Instagram className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">@{user.username}</span>
        <Badge variant={needsRefresh ? 'destructive' : 'default'} className="ml-auto">
          {needsRefresh ? (
            <>
              <AlertCircle className="h-3 w-3 mr-1" />
              Expired
            </>
          ) : (
            <>
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </>
          )}
        </Badge>
        {needsRefresh && showRefreshButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshTokens}
            className="h-6 px-2"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.threads_profile_picture_url} alt={user.username} />
            <AvatarFallback>
              <Instagram className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              @{user.username}
              <Badge variant={needsRefresh ? 'destructive' : 'default'}>
                {needsRefresh ? (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Session Expired
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </>
                )}
              </Badge>
            </CardTitle>
            <CardDescription>
              {user.account_type} Account • ID: {user.id}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {needsRefresh && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Session Expired</span>
            </div>
            <p className="text-sm text-destructive/80 mt-1">
              Your Threads session has expired. Please refresh your connection.
            </p>
            {showRefreshButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={refreshTokens}
                className="mt-2 w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Connection
              </Button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">User ID:</span>
            <p className="font-medium font-mono">{user.id}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Account Type:</span>
            <p className="font-medium">{user.account_type}</p>
          </div>
        </div>

        {showSignOutButton && (
          <>
            <Separator />
            <Button
              variant="outline"
              onClick={logout}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out from Threads
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}