"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ActivityType, ActivityStats } from "@/types"
import {
  Activity,
  MessageSquare,
  UserPlus,
  Bell,
  Quote,
  Share2,
} from "lucide-react"

interface ActivityFiltersProps {
  activeFilter: ActivityType
  onFilterChange: (filter: ActivityType) => void
  stats: ActivityStats
  className?: string
}

const filterConfig = [
  {
    type: "all" as ActivityType,
    label: "All Activities",
    icon: Activity,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-accent border border-border",
    activeColor: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  },
  {
    type: "follow" as ActivityType,
    label: "Followers",
    icon: UserPlus,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-accent border border-border",
    activeColor: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  },
  {
    type: "reply" as ActivityType,
    label: "Replies",
    icon: MessageSquare,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-accent border border-border",
    activeColor: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  },
  {
    type: "mention" as ActivityType,
    label: "Mentions",
    icon: Bell,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-accent border border-border",
    activeColor: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  },
  {
    type: "quote" as ActivityType,
    label: "Quotes",
    icon: Quote,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-accent border border-border",
    activeColor: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  },
  {
    type: "repost" as ActivityType,
    label: "Reposts",
    icon: Share2,
    color: "text-muted-foreground",
    bgColor: "bg-muted hover:bg-accent border border-border",
    activeColor: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
  },
]

export function ActivityFilters({
  activeFilter,
  onFilterChange,
  stats,
  className,
}: ActivityFiltersProps) {
  const getFilterCount = (type: ActivityType) => {
    if (type === "all") return stats.total
    return stats.byType[type] || 0
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {filterConfig.map((filter) => {
        const count = getFilterCount(filter.type)
        const Icon = filter.icon
        const isActive = activeFilter === filter.type

        return (
          <Button
            key={filter.type}
            variant="outline"
            onClick={() => onFilterChange(filter.type)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 border-0",
              isActive
                ? filter.activeColor
                : filter.bgColor,
              !isActive && filter.color
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{filter.label}</span>

            {/* Count badge */}
            <Badge
              variant={isActive ? "secondary" : "outline"}
              className={cn(
                "ml-1 px-2 py-0.5 text-xs font-semibold",
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  : "bg-muted text-muted-foreground border-border"
              )}
            >
              {count}
            </Badge>

            {/* Unread indicator */}
            {!isActive && filter.type !== "all" && stats.unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full border-2 border-background" />
            )}
          </Button>
        )
      })}
    </div>
  )
}