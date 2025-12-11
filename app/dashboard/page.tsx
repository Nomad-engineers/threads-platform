"use client"

import { useState, useCallback, useMemo } from 'react'
import { CalendarView, CalendarEvent, ViewMode } from '@/components/dashboard/calendar'
import { CalendarViewSelector } from '@/components/dashboard/calendar/CalendarViewSelector'
import { ThreadsPublishModal } from '@/components/dashboard/threads-publish-modal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { format, addDays, addHours, startOfDay, startOfWeek, addWeeks, addMonths } from 'date-fns'
import { useUserPosts } from '@/hooks/use-user-posts'


export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const [publishModalOpen, setPublishModalOpen] = useState(false)
  const { posts, isLoading, error, deletePost } = useUserPosts()

  // Convert posts to calendar events (same logic as RecentPosts component)
  const postEvents = useMemo(() => {
    // Media type mapping for display
    const getDisplayMediaType = (mediaType?: string): string => {
      if (!mediaType) return 'Text'

      const typeMap: Record<string, string> = {
        'TEXT_POST': 'Text',
        'IMAGE_POST': 'Image',
        'VIDEO_POST': 'Video',
        'CAROUSEL_POST': 'Carousel',
        'REPOST_FACADE': 'Repost',
        'TEXT': 'Text',
        'IMAGE': 'Image',
        'VIDEO': 'Video',
        'CAROUSEL': 'Carousel'
      }

      return typeMap[mediaType] || 'Text'
    }

    return posts.map((post): CalendarEvent => ({
      id: post.id,
      title: post.content.slice(0, 50) + (post.content.length > 50 ? '...' : ''),
      topic: getDisplayMediaType(post.media_type),
      startTime: new Date(post.timestamp),
      endTime: new Date(post.timestamp),
      data: post,
    }))
  }, [posts])

  // Combine posts with any additional calendar events
  const events = postEvents

  const handleEventClick = useCallback((event: CalendarEvent) => {
    // Handle post click - open permalink if available
    if (event.data?.permalink) {
      window.open(event.data.permalink, '_blank')
    }
    console.log('Event clicked:', event.data)
  }, [])

  const handleSlotClick = useCallback((date: Date, hour: number) => {
    console.log('Slot clicked:', date, hour)
  }, [])

  const handleEventMove = useCallback((eventId: string, newStartTime: Date) => {
    // Posts cannot be moved - this is handled by the calendar but should not update post data
    console.log('Post move attempted - posts cannot be rescheduled:', eventId)
  }, [])

  const handleEventResize = useCallback((eventId: string, newStartTime: Date) => {
    // Posts cannot be resized - this is handled by the calendar but should not update post data
    console.log('Post resize attempted - posts cannot be rescheduled:', eventId)
  }, [])

  const handleCreateEvent = useCallback((eventData: Partial<CalendarEvent>) => {
    // Posts are created through the Threads publish form, not the calendar
    console.log('Post creation through calendar not supported - use Threads publish form')
  }, [])

  const handleDeleteEvent = useCallback(async (eventId: string) => {
    // Delete the post using the API
    await deletePost(eventId)
  }, [deletePost])

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

  // Loading state
  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your Threads content schedule and activities
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading your posts...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your Threads content schedule and activities
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg font-medium mb-2">Error loading posts</div>
            <p className="text-muted-foreground">{error}</p>
            <Button
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
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
          {/* Create Post Button */}
          <Button onClick={() => setPublishModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Post
          </Button>

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

      {/* Posts Summary */}
      {posts.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Posts:</span>
              <div className="font-medium">{posts.length}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Text Posts:</span>
              <div className="font-medium">
                {posts.filter(p => !p.media_type || p.media_type === 'TEXT' || p.media_type === 'TEXT_POST').length}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Image Posts:</span>
              <div className="font-medium">
                {posts.filter(p => p.media_type === 'IMAGE' || p.media_type === 'IMAGE_POST').length}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Video Posts:</span>
              <div className="font-medium">
                {posts.filter(p => p.media_type === 'VIDEO' || p.media_type === 'VIDEO_POST').length}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Reposts:</span>
              <div className="font-medium">
                {posts.filter(p => p.media_type === 'REPOST_FACADE').length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full">
          <CalendarView
            events={events}
            viewMode={viewMode}
            currentDate={currentDate}
            onEventClick={handleEventClick}
            onSlotClick={handleSlotClick}
            onEventMove={handleEventMove}
            onEventResize={handleEventResize}
            onCreateEvent={handleCreateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>

        {posts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-background/95 backdrop-blur-sm p-8 rounded-lg border shadow-lg pointer-events-auto">
              <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first Threads post to see it in your content calendar
              </p>
              <Button onClick={() => setPublishModalOpen(true)}>
                Create Post
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Threads Publish Modal */}
      <ThreadsPublishModal
        open={publishModalOpen}
        onOpenChange={setPublishModalOpen}
      />
    </div>
  )
}