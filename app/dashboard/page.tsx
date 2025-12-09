"use client"

import { useState, useCallback, useEffect } from 'react'
import { CalendarView, CalendarEvent, ViewMode } from '@/components/dashboard/calendar'
import { CalendarViewSelector } from '@/components/dashboard/calendar/CalendarViewSelector'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, ChevronLeft, ChevronRight, MessageCircle, Heart, Share2, Repeat2 } from 'lucide-react'
import { format, addDays, startOfDay, addHours, startOfWeek, addWeeks, addMonths } from 'date-fns'
import { useUserPosts } from '@/hooks/use-user-posts'

// Sample events for demonstration
const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Morning Threads Post',
    topic: 'Content Creation Tips',
    startTime: addHours(startOfDay(new Date()), 9),
  },
  {
    id: '2',
    title: 'Afternoon Threads Post',
    topic: 'Analytics Insights',
    startTime: addHours(startOfDay(new Date()), 14),
  },
  {
    id: '3',
    title: 'Evening Threads Post',
    startTime: addHours(startOfDay(new Date()), 16),
  },
  {
    id: '4',
    title: 'Quick Update Post',
    topic: 'Team Updates',
    startTime: addHours(startOfDay(new Date()), 10),
  },
]

export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const { posts, isLoading: postsLoading, error: postsError, refresh } = useUserPosts()

  const handleEventClick = useCallback((event: CalendarEvent) => {
    console.log('Event clicked:', event)
  }, [])

  const handleSlotClick = useCallback((date: Date, hour: number) => {
    console.log('Slot clicked:', date, hour)
  }, [])

  const handleEventMove = useCallback((eventId: string, newStartTime: Date) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, startTime: newStartTime }
        : event
    ))
  }, [])

  const handleEventResize = useCallback((eventId: string, newStartTime: Date) => {
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, startTime: newStartTime }
        : event
    ))
  }, [])

  const handleCreateEvent = useCallback((eventData: Partial<CalendarEvent>) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title || 'New Post',
      topic: eventData.topic,
      startTime: eventData.startTime || new Date(),
    }
    setEvents(prev => [...prev, newEvent])
  }, [])

  const handleDeleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
  }, [])

  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'prev') {
      if (viewMode === 'day') {
        setCurrentDate(prev => addDays(prev, -1))
      } else if (viewMode === 'week') {
        setCurrentDate(prev => addWeeks(prev, -1))
      } else {
        setCurrentDate(prev => addMonths(prev, -1))
      }
    } else if (direction === 'next') {
      if (viewMode === 'day') {
        setCurrentDate(prev => addDays(prev, 1))
      } else if (viewMode === 'week') {
        setCurrentDate(prev => addWeeks(prev, 1))
      } else {
        setCurrentDate(prev => addMonths(prev, 1))
      }
    } else {
      setCurrentDate(new Date())
    }
  }

  const getDateDisplay = () => {
    if (viewMode === 'day') {
      return format(currentDate, 'EEEE, MMMM d')
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(currentDate)
      const weekEnd = addDays(weekStart, 6)
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
    } else {
      return format(currentDate, 'MMMM yyyy')
    }
  }

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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your Threads content schedule and activities
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CalendarViewSelector
              currentView={viewMode}
              onViewChange={setViewMode}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Current Date Badge */}
          <Badge variant="secondary" className="flex items-center gap-2">
            <CalendarDays className="h-3 w-3" />
            {getDateDisplay()}
          </Badge>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
            <Button variant="outline" size="sm" onClick={refresh}>
              Refresh
            </Button>
          </div>

          {postsError && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <p>Error loading posts: {postsError}</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={refresh}>
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {postsLoading && posts.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <p>Loading posts...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {!postsLoading && !postsError && posts.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <p>No posts found</p>
                  <p className="text-sm">Your recent Threads posts will appear here</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="w-full">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={post.media_type === 'TEXT' ? 'default' : 'secondary'}>
                        {post.media_type || 'TEXT'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatPostTime(post.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm">{post.content}</p>

                    {post.media_url && post.media_type !== 'TEXT' && (
                      <div className="mt-2">
                        <img
                          src={post.media_url}
                          alt="Post media"
                          className="rounded-md max-w-full h-auto"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-2">
                      {post.like_count !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          {post.like_count}
                        </div>
                      )}
                      {post.reply_count !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          {post.reply_count}
                        </div>
                      )}
                      {post.repost_count !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Repeat2 className="h-4 w-4" />
                          {post.repost_count}
                        </div>
                      )}
                      {post.share_count !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Share2 className="h-4 w-4" />
                          {post.share_count}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <div className="min-h-[400px]">
            <CalendarView
              currentDate={currentDate}
              events={events}
              viewMode={viewMode}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onEventMove={handleEventMove}
              onEventResize={handleEventResize}
              onCreateEvent={handleCreateEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          </div>
        </div>
      </div>
    </div>
  )
}