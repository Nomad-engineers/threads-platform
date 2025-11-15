'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Instagram, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useThreadsAuth } from '@/lib/threads-auth';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ThreadsBadgeProps {
  className?: string;
  showDetails?: boolean;
  compact?: boolean;
}

export function ThreadsBadge({
  className,
  showDetails = true,
  compact = false
}: ThreadsBadgeProps) {
  const { isAuthenticated, user, needsRefresh, refreshTokens, loading } = useThreadsAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleRefresh = async () => {
    await refreshTokens();
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center gap-2 ${className}`}>
              <Instagram className="h-4 w-4 text-pink-600" />
              <Badge
                variant={needsRefresh ? "outline" : "secondary"}
                className="text-xs"
              >
                @{user.username}
              </Badge>
              {needsRefresh && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 text-yellow-600 hover:text-yellow-700"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-medium">Threads: @{user.username}</p>
              <p className="text-xs text-muted-foreground">
                {needsRefresh ? 'Session needs refresh' : 'Connected'}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Threads avatar and info */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.threads_profile_picture_url}
              alt={`@${user.username}`}
            />
            <AvatarFallback className="bg-pink-100 text-pink-600">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1">
            {needsRefresh ? (
              <AlertCircle className="h-4 w-4 text-yellow-500 bg-white rounded-full" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500 bg-white rounded-full" />
            )}
          </div>
        </div>

        {showDetails && (
          <div className="flex flex-col">
            <span className="text-sm font-medium">@{user.username}</span>
            <div className="flex items-center gap-1">
              <Badge
                variant={needsRefresh ? "outline" : "secondary"}
                className="text-xs"
              >
                <Instagram className="h-3 w-3 mr-1" />
                Threads
              </Badge>
              <span className="text-xs text-muted-foreground">
                {user.account_type?.toLowerCase() || 'creator'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Refresh button if needed */}
      {needsRefresh && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="h-8 px-2 text-xs"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your Threads session needs to be refreshed</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

// User profile card variant for detailed view
export function ThreadsProfileCard({ className }: ThreadsBadgeProps) {
  const { isAuthenticated, user, needsRefresh, refreshTokens, loading } = useThreadsAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className={`bg-card border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user.threads_profile_picture_url}
              alt={`@${user.username}`}
            />
            <AvatarFallback className="bg-pink-100 text-pink-600 text-lg">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">@{user.username}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {user.account_type?.toLowerCase() || 'creator'} account
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Badge
            variant={needsRefresh ? "outline" : "default"}
            className="text-xs"
          >
            {needsRefresh ? 'Needs Refresh' : 'Connected'}
          </Badge>

          {needsRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={refreshTokens}
              disabled={loading}
              className="h-7 px-2 text-xs"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {user.threads_biography && (
        <p className="text-sm text-muted-foreground italic mb-3">
          "{user.threads_biography}"
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Instagram className="h-3 w-3" />
          <span>Threads Connected</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-green-500" />
          <span>API Access Active</span>
        </div>
      </div>
    </div>
  );
}