"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  post: {
    id: string
    content: string
    author: {
      name: string
      username: string
      avatar?: string
    }
    createdAt: Date
    metrics: {
      likes: number
      comments: number
      reposts: number
      views: number
    }
    status?: "published" | "scheduled" | "draft"
    scheduledFor?: Date
    media?: Array<{
      type: "image" | "video"
      url: string
      alt?: string
    }>
  }
  className?: string
  showActions?: boolean
}

export function PostCard({
  post,
  className,
  showActions = true,
}: PostCardProps) {
  const formatMetric = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  const getStatusBadge = () => {
    if (!post.status) return null

    const badgeClasses = {
      published: "post-badge-published",
      scheduled: "post-badge-scheduled",
      draft: "post-badge-draft",
    } as const

    return (
      <div className={cn("post-badge", badgeClasses[post.status])}>
        {post.status === "scheduled" && post.scheduledFor && (
          <>
            <Clock className="w-3 h-3 mr-1" />
            {formatDistanceToNow(post.scheduledFor, { addSuffix: true })}
          </>
        )}
        {post.status === "published" && "Published"}
        {post.status === "draft" && "Draft"}
      </div>
    )
  }

  return (
    <Card className={cn("post-card w-full", className)}>
      <CardHeader className="post-header">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {post.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  @{post.author.username}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {getStatusBadge()}
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 post-button">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit post</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>View analytics</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Delete post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="post-content text-sm whitespace-pre-wrap">
          {post.content}
        </p>

        {post.media && post.media.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {post.media.map((media, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted"
              >
                {media.type === "image" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={media.url}
                    alt={media.alt || ""}
                    className="object-cover w-full h-full"
                  />
                )}
                {media.type === "video" && (
                  <video
                    src={media.url}
                    className="object-cover w-full h-full"
                    controls
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="post-footer">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="h-8 px-2 post-button">
              <Heart className="h-4 w-4 mr-1" />
              <span className={cn("text-xs", "post-metric")}>{formatMetric(post.metrics.likes)}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 post-button">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className={cn("text-xs", "post-metric")}>{formatMetric(post.metrics.comments)}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 post-button">
              <Repeat2 className="h-4 w-4 mr-1" />
              <span className={cn("text-xs", "post-metric")}>{formatMetric(post.metrics.reposts)}</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {formatMetric(post.metrics.views)}
            </div>
            {post.metrics.views > 1000 && (
              <div className={cn("flex items-center text-xs", "post-performance", "post-performance-good")}>
                <TrendingUp className="h-3 w-3 mr-1" />
                Performing well
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}