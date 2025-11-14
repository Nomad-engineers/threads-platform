"use client"

import { useState, useCallback } from 'react'
import { CalendarView, CalendarEvent, ViewMode } from '@/components/dashboard/calendar'
import { CalendarViewSelector } from '@/components/dashboard/calendar/CalendarViewSelector'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addDays, startOfDay, addHours, startOfWeek, addWeeks, addMonths } from 'date-fns'

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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
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

      {/* Calendar View */}
      <div className="flex-1 min-h-0">
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
  )
}