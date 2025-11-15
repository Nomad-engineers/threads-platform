'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Instagram } from 'lucide-react';
import { useThreadsAuth } from '@/lib/threads-auth';

interface ThreadsSignInButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onAuthError?: (error: string) => void;
}

export function ThreadsSignInButton({
  className,
  variant = 'default',
  size = 'default',
  onAuthError
}: ThreadsSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user, needsRefresh, refreshTokens, logout } = useThreadsAuth();
  const { toast } = useToast();

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      // Redirect to OAuth endpoint
      window.location.href = '/api/auth/threads';
    } catch (error) {
      console.error('Sign-in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Threads';

      toast({
        title: 'Sign In Error',
        description: errorMessage,
        variant: 'destructive'
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await logout();

      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out from Threads.'
      });

      // Redirect to home or current page
      window.location.href = '/';
    } catch (error) {
      console.error('Sign-out error:', error);
      toast({
        title: 'Sign Out Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      const success = await refreshTokens();

      if (success) {
        toast({
          title: 'Session Refreshed',
          description: 'Your Threads session has been refreshed.'
        });
      } else {
        toast({
          title: 'Refresh Failed',
          description: 'Failed to refresh your session. Please sign in again.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      toast({
        title: 'Refresh Error',
        description: 'An error occurred while refreshing your session.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If already authenticated, show user info and sign out option
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
          <Instagram className="h-4 w-4" />
          <span className="text-sm font-medium">@{user.username}</span>
          {needsRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="h-6 px-2 text-xs"
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Refresh'}
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          disabled={isLoading}
          className={className}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign Out'}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignIn}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Instagram className="h-4 w-4" />
          Sign in with Threads
        </>
      )}
    </Button>
  );
}

// Simple version that only handles sign in
export function ThreadsSignInOnlyButton({
  className,
  variant = 'default',
  size = 'default',
  onAuthError
}: ThreadsSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      // Redirect to OAuth endpoint
      window.location.href = '/api/auth/threads';
    } catch (error) {
      console.error('Sign-in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Threads';

      toast({
        title: 'Sign In Error',
        description: errorMessage,
        variant: 'destructive'
      });

      onAuthError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignIn}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Instagram className="h-4 w-4" />
          Sign in with Threads
        </>
      )}
    </Button>
  );
}