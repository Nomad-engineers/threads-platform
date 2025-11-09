"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ActivityItem, ActivityType } from "@/types"
import {
  Heart,
  MessageSquare,
  UserPlus,
  Bell,
  Quote,
  Share2,
  Eye,
  Reply,
  Check,
  User,
} from "lucide-react"

interface ActivityCardProps {
  activity: ActivityItem
  onMarkAsRead?: (id: string) => void
  onQuickAction?: (id: string, action: string) => void
  className?: string
}

export function ActivityCard({
  activity,
  onMarkAsRead,
  onQuickAction,
  className,
}: ActivityCardProps) {

  const getActivityIcon = (type: ActivityType) => {
    const iconClass = "h-4 w-4"
    switch (type) {
      case "like":
        return <Heart className={cn(iconClass, "text-gray-600")} />
      case "comment":
        return <MessageSquare className={cn(iconClass, "text-gray-600")} />
      case "reply":
        return <Reply className={cn(iconClass, "text-gray-600")} />
      case "follow":
        return <UserPlus className={cn(iconClass, "text-gray-600")} />
      case "mention":
        return <Bell className={cn(iconClass, "text-gray-600")} />
      case "quote":
        return <Quote className={cn(iconClass, "text-gray-600")} />
      case "repost":
        return <Share2 className={cn(iconClass, "text-gray-600")} />
      default:
        return <Bell className={cn(iconClass, "text-gray-600")} />
    }
  }

  const getActivityBadge = (type: ActivityType) => {
    const variants: Record<ActivityType, { label: string; className: string }> = {
      all: { label: "Activity", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      like: { label: "Like", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      comment: { label: "Comment", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      reply: { label: "Reply", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      follow: { label: "Follow", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      mention: { label: "Mention", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      quote: { label: "Quote", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      repost: { label: "Repost", className: "bg-gray-50 text-gray-800 border border-gray-200" },
      share: { label: "Share", className: "bg-gray-50 text-gray-800 border border-gray-200" },
    }

    const config = variants[type] || variants.all
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getPriorityIndicator = (priority: string) => {
    switch (priority) {
      case "high":
        return <div className="h-2 w-2 bg-gray-700 rounded-full" />
      case "medium":
        return <div className="h-2 w-2 bg-gray-500 rounded-full" />
      default:
        return <div className="h-2 w-2 bg-gray-300 rounded-full" />
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) return `${minutes} minutes ago`
    if (hours < 24) return `${hours} hours ago`
    return `${days} days ago`
  }

  const handleMarkAsRead = () => {
    if (!activity.isRead && onMarkAsRead) {
      onMarkAsRead(activity.id)
    }
  }

  const handleQuickAction = (action: string) => {
    if (onQuickAction) {
      onQuickAction(activity.id, action)
    }
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-sm border border-gray-200 bg-white",
        !activity.isRead && "border-l-2 border-l-gray-400 bg-gray-50/30",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium flex-shrink-0">
            {activity.user.avatar || <User className="h-5 w-5" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              {getActivityIcon(activity.type)}
              <div className="flex items-center gap-2 flex-1">
                <h4 className="font-semibold text-gray-900">
                  {activity.user.displayName}
                </h4>
                {activity.user.isVerified && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    ✓
                  </Badge>
                )}
                {activity.user.isVip && (
                  <Badge className="text-xs px-1 py-0 bg-gray-800 text-white">
                    VIP
                  </Badge>
                )}
              </div>
              {getActivityBadge(activity.type)}
              {getPriorityIndicator(activity.priority)}
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {formatTimestamp(activity.timestamp)}
              </span>
            </div>

            {/* Action */}
            <p className="text-sm text-gray-700 mb-2">{activity.action}</p>

            {/* Target Content */}
            {activity.target && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-600 font-medium">
                    {activity.target.type === "post" ? "POST" :
                     activity.target.type === "comment" ? "COMMENT" : "THREAD"}
                  </span>
                  {activity.target.engagementMetrics && (
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>♡ {activity.target.engagementMetrics.likes}</span>
                      <span>◆ {activity.target.engagementMetrics.comments}</span>
                      <span>↻ {activity.target.engagementMetrics.reposts}</span>
                      <span>⊕ {activity.target.engagementMetrics.views}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {activity.target.content}
                </p>
                {activity.metadata.isQuote && activity.metadata.originalContent && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 italic">
                      "Original: {activity.metadata.originalContent}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
              <span>👥 {activity.user.followerCount.toLocaleString()} followers</span>
              {activity.metadata.reach && (
                <span>📈 {activity.metadata.reach.toLocaleString()} reach</span>
              )}
              {activity.metadata.sentiment && (
                <span
                  className={cn(
                    "px-2 py-1 rounded-full border border-gray-200",
                    activity.metadata.sentiment === "positive"
                      ? "bg-gray-100 text-gray-700"
                      : activity.metadata.sentiment === "negative"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-50 text-gray-600"
                  )}
                >
                  {activity.metadata.sentiment} sentiment
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuickAction("view")}
                className="h-8 text-xs border-gray-400 text-gray-800 hover:bg-gray-50"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>

              {activity.type === "comment" || activity.type === "reply" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction("reply")}
                  className="h-8 text-xs border-gray-400 text-gray-800 hover:bg-gray-50"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              ) : activity.type === "follow" ? (
                <Button
                  size="sm"
                  onClick={() => handleQuickAction("follow-back")}
                  className="h-8 text-xs bg-gray-800 text-white hover:bg-gray-700"
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  Follow Back
                </Button>
              ) : activity.type === "mention" || activity.type === "quote" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction("engage")}
                  className="h-8 text-xs border-gray-400 text-gray-800 hover:bg-gray-50"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Engage
                </Button>
              ) : null}

              <Button
                size="sm"
                variant="ghost"
                onClick={handleMarkAsRead}
                disabled={activity.isRead}
                className="h-8 text-xs ml-auto hover:bg-gray-50"
              >
                {activity.isRead ? (
                  <Check className="h-3 w-3 text-gray-600" />
                ) : (
                  <div className="h-2 w-2 bg-gray-600 rounded-full" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}