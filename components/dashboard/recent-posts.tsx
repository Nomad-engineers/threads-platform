"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Calendar, CalendarDays, Grid, List, Trash2, ExternalLink, MessageCircle, Heart, Share2, Repeat2, MoreHorizontal } from 'lucide-react'
import { format, isToday, isYesterday, startOfDay, endOfDay, eachDayOfInterval, isSameDay } from 'date-fns'
import { CalendarView, CalendarEvent, ViewMode } from './calendar'
import { CalendarViewSelector } from './calendar/CalendarViewSelector'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useUserPosts, UserPost } from '@/hooks/use-user-posts'
import { addDays, addWeeks, addMonths, startOfWeek } from 'date-fns'

interface RecentPostsProps {
  className?: string
}

export function RecentPosts({ className }: RecentPostsProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [calendarViewMode, setCalendarViewMode] = useState<ViewMode>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const { posts, isLoading, error, deletePost } = useUserPosts()

  // Convert posts to calendar events
  const calendarEvents = useMemo(() => {
    return posts.map((post): CalendarEvent => ({
      id: post.id,
      title: post.content.slice(0, 50) + (post.content.length > 50 ? '...' : ''),
      topic: post.media_type || 'Text',
      startTime: new Date(post.timestamp),
      endTime: new Date(post.timestamp),
      data: post,
    }))
  }, [posts])

  // Group posts by date for calendar view
  const postsByDate = useMemo(() => {
    const grouped = new Map<string, UserPost[]>()

    posts.forEach(post => {
      const dateKey = format(new Date(post.timestamp), 'yyyy-MM-dd')
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, [])
      }
      grouped.get(dateKey)!.push(post)
    })

    return grouped
  }, [posts])

  // Format post timestamp for display
  const formatPostTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  // Get media type icon and color
  const getMediaTypeIcon = (mediaType?: string) => {
    switch (mediaType) {
      case 'IMAGE':
        return { icon: '🖼️', color: 'bg-green-100 text-green-800' }
      case 'VIDEO':
        return { icon: '🎥', color: 'bg-blue-100 text-blue-800' }
      case 'CAROUSEL':
        return { icon: '🎠', color: 'bg-purple-100 text-purple-800' }
      default:
        return { icon: '📝', color: 'bg-gray-100 text-gray-800' }
    }
  }

  // Handle delete post
  const handleDeletePost = async (postId: string) => {
    await deletePost(postId)
  }

  // Navigate calendar dates
  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'prev') {
      if (calendarViewMode === 'day') {
        setCurrentDate(prev => addDays(prev, -1))
      } else if (calendarViewMode === 'week') {
        setCurrentDate(prev => addWeeks(prev, -1))
      } else {
        setCurrentDate(prev => addMonths(prev, -1))
      }
    } else if (direction === 'next') {
      if (calendarViewMode === 'day') {
        setCurrentDate(prev => addDays(prev, 1))
      } else if (calendarViewMode === 'week') {
        setCurrentDate(prev => addWeeks(prev, 1))
      } else {
        setCurrentDate(prev => addMonths(prev, 1))
      }
    } else {
      setCurrentDate(new Date())
    }
  }

  // Get date display for calendar header
  const getDateDisplay = () => {
    if (calendarViewMode === 'day') {
      return format(currentDate, 'EEEE, MMMM d')
    } else if (calendarViewMode === 'week') {
      const weekStart = startOfWeek(currentDate)
      const weekEnd = addDays(weekStart, 6)
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
    } else {
      return format(currentDate, 'MMMM yyyy')
    }
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent>
          <div className="text-red-500">Error loading posts: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
            >
              <CalendarDays className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No posts yet. Create your first post to see it here!
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <div className="space-y-4">
                {posts.map((post) => {
                  const { icon, color } = getMediaTypeIcon(post.media_type)
                  return (
                    <div
                      key={post.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className={color}>
                            {icon} {post.media_type || 'Text'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatPostTime(post.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-2 line-clamp-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {post.like_count !== undefined && (
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.like_count}
                            </span>
                          )}
                          {post.reply_count !== undefined && (
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.reply_count}
                            </span>
                          )}
                          {post.repost_count !== undefined && (
                            <span className="flex items-center gap-1">
                              <Repeat2 className="h-3 w-3" />
                              {post.repost_count}
                            </span>
                          )}
                          {post.share_count !== undefined && (
                            <span className="flex items-center gap-1">
                              <Share2 className="h-3 w-3" />
                              {post.share_count}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {post.permalink && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <a
                              href={post.permalink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Post</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this post? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-red-500 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Calendar View Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CalendarViewSelector
                      currentView={calendarViewMode}
                      onViewChange={setCalendarViewMode}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateDate('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <CalendarDays className="h-3 w-3" />
                    {getDateDisplay()}
                  </Badge>
                </div>

                {/* Calendar */}
                <div className="h-96">
                  <CalendarView
                    events={calendarEvents}
                    viewMode={calendarViewMode}
                    currentDate={currentDate}
                    onEventClick={(event) => {
                      console.log('Event clicked:', event.data)
                    }}
                    onSlotClick={() => {}}
                    onEventMove={() => {}}
                    onEventResize={() => {}}
                    onCreateEvent={() => {}}
                    onDeleteEvent={(eventId) => handleDeletePost(eventId)}
                  />
                </div>

                {/* Posts Legend/Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Posts:</span>
                      <div className="font-medium">{posts.length}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Text Posts:</span>
                      <div className="font-medium">
                        {posts.filter(p => !p.media_type || p.media_type === 'TEXT').length}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Image Posts:</span>
                      <div className="font-medium">
                        {posts.filter(p => p.media_type === 'IMAGE').length}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Video Posts:</span>
                      <div className="font-medium">
                        {posts.filter(p => p.media_type === 'VIDEO').length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}