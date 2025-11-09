"use client"

import { useState, useMemo } from "react"
import { ActivityCard } from "./activity-card"
import { ActivityFilters } from "./activity-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityItem, ActivityType, ActivityStats } from "@/types"
import { allMockActivities } from "@/lib/mock-activities"
import {
  Search,
  Filter as FilterIcon,
  Check,
  RefreshCw,
} from "lucide-react"

interface ActivityFeedProps {
  className?: string
}

export function ActivityFeed({ className }: ActivityFeedProps) {
  const [activeFilter, setActiveFilter] = useState<ActivityType>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activities, setActivities] = useState<ActivityItem[]>(allMockActivities)
  const [isLoading, setIsLoading] = useState(false)

  // Filter activities based on active filter and search term
  const filteredActivities = useMemo(() => {
    let filtered = activities

    // Filter by type
    if (activeFilter !== "all") {
      filtered = filtered.filter(activity => activity.type === activeFilter)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(activity =>
        activity.user.displayName.toLowerCase().includes(term) ||
        activity.user.username.toLowerCase().includes(term) ||
        activity.action.toLowerCase().includes(term) ||
        activity.target?.content.toLowerCase().includes(term) ||
        activity.metadata.originalContent?.toLowerCase().includes(term)
      )
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }, [activities, activeFilter, searchTerm])

  // Calculate current stats
  const currentStats: ActivityStats = {
    total: activities.length,
    byType: activities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1
      return acc
    }, {} as Record<ActivityType, number>),
    unreadCount: activities.filter(a => !a.isRead).length,
    todayCount: activities.filter(a => {
      const today = new Date()
      return a.timestamp.toDateString() === today.toDateString()
    }).length,
    thisWeekCount: activities.filter(a => {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return a.timestamp > weekAgo
    }).length,
  }

  const handleMarkAsRead = (id: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id ? { ...activity, isRead: true } : activity
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setActivities(prev =>
      prev.map(activity => ({ ...activity, isRead: true }))
    )
  }

  const handleQuickAction = (id: string, action: string) => {
    console.log(`Quick action: ${action} for activity ${id}`)
    // Handle different quick actions here
    switch (action) {
      case "view":
        // Navigate to post/comment
        break
      case "reply":
        // Open reply modal
        break
      case "follow-back":
        // Follow user logic
        break
      case "engage":
        // Like/comment on mention
        break
      default:
        break
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const unreadCount = currentStats.unreadCount

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-light text-foreground">Activity Feed</h2>
          <p className="text-muted-foreground">
            {filteredActivities.length} activities
            {unreadCount > 0 && (
              <span className="text-foreground font-medium"> • {unreadCount} unread</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="border-border text-foreground hover:bg-accent"
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="border-border text-foreground hover:bg-accent"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6 border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2 text-foreground font-light">
            <FilterIcon className="h-5 w-5 text-muted-foreground" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* Activity Type Filters */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Activity Type</h3>
            <ActivityFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              stats={currentStats}
            />
          </div>

          <Separator />

          {/* Search */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, content, or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-input focus:border-ring"
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {(activeFilter !== "all" || searchTerm) && (
            <>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {activeFilter !== "all" && (
                    <Badge variant="outline" className="capitalize border-border text-foreground">
                      {activeFilter}
                    </Badge>
                  )}
                  {searchTerm && (
                    <Badge variant="outline" className="border-border text-foreground">
                      "{searchTerm}"
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveFilter("all")
                    setSearchTerm("")
                  }}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  Clear all
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center justify-between text-foreground font-light">
            <span>Activities</span>
            <Badge variant="outline" className="border-border text-foreground">
              {filteredActivities.length} items
            </Badge>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {activeFilter === "all"
              ? "All your recent activities and interactions"
              : `Showing ${activeFilter} activities only`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                  {i < 5 && <Separator />}
                </div>
              ))}
            </div>
          ) : filteredActivities.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FilterIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-light text-foreground mb-2">
                No activities found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || activeFilter !== "all"
                  ? "Try adjusting your filters or search terms"
                  : "Your activity feed is empty"}
              </p>
              {(searchTerm || activeFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveFilter("all")
                    setSearchTerm("")
                  }}
                  className="border-border text-foreground hover:bg-accent"
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            // Activity list
            <div className="flex flex-col space-y-4">
              {filteredActivities.map((activity, index) => (
                <div key={activity.id} className="flex items-stretch">
                  <ActivityCard
                    activity={activity}
                    onMarkAsRead={handleMarkAsRead}
                    onQuickAction={handleQuickAction}
                    className="flex-1"
                  />
                  {index < filteredActivities.length - 1 && (
                    <div className="w-px bg-border dark:bg-gray-700 mx-4 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ")
}