'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Instagram, CheckCircle } from 'lucide-react'
import { useThreadsAuth } from '@/hooks/use-threads-auth'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ThreadsBadgeProps {
  className?: string
  showDetails?: boolean
  compact?: boolean
}

export function ThreadsBadge({
  className,
  showDetails = true,
  compact = false,
}: ThreadsBadgeProps) {
  const { isAuthenticated, user, isLoading } = useThreadsAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={`flex items-center gap-2 ${className}`}>
              <Instagram className="h-4 w-4 text-pink-600" />
              <Badge variant="secondary" className="text-xs">
                @{user.username}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-sm">
              <p className="font-medium">Threads: @{user.username}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Threads avatar and info */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.picUrl} alt={`@${user.username}`} />
            <AvatarFallback className="bg-pink-100 text-pink-600">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1">
            <CheckCircle className="h-4 w-4 rounded-full bg-white text-green-500" />
          </div>
        </div>

        {showDetails && (
          <div className="flex flex-col">
            <span className="text-sm font-medium">@{user.username}</span>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">
                <Instagram className="mr-1 h-3 w-3" />
                Threads
              </Badge>
              <span className="text-xs text-muted-foreground">
                {user.account_type?.toLowerCase() || 'creator'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// User profile card variant for detailed view
export function ThreadsProfileCard({ className }: ThreadsBadgeProps) {
  const { isAuthenticated, user } = useThreadsAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className={`rounded-lg border bg-card p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.picUrl} alt={`@${user.username}`} />
            <AvatarFallback className="bg-pink-100 text-lg text-pink-600">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">@{user.username}</h3>
            <p className="text-sm capitalize text-muted-foreground">
              {user.account_type?.toLowerCase() || 'creator'} account
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Badge variant="default" className="text-xs">
            Connected
          </Badge>
        </div>
      </div>

      {user.bio && <p className="mb-3 text-sm italic text-muted-foreground">"{user.bio}"</p>}

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
  )
}
