"use client"

import React, { useState, useCallback } from 'react'
import { format, startOfDay, addHours, isSameDay, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns'
import { CalendarEvent, CalendarViewProps, ViewMode, MonthGridProps } from './types'
import { TimeGrid } from './TimeGrid'
import { WeekGrid } from './WeekGrid'
import { MonthGrid } from './MonthGrid'
import { EventModal } from './EventModal'
import { Card } from '@/components/ui/card'

interface CalendarViewWrapperProps extends CalendarViewProps {
  viewMode: ViewMode
  onCreateEvent?: (event: Partial<CalendarEvent>) => void
  onDeleteEvent?: (eventId: string) => void
}

export function CalendarView({
  currentDate,
  events = [],
  viewMode,
  onEventClick,
  onSlotClick,
  onEventMove,
  onEventResize,
  onCreateEvent,
  onDeleteEvent,
}: CalendarViewWrapperProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number } | undefined>()

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
    onEventClick?.(event)
  }, [onEventClick])

  const handleSlotClick = useCallback((date: Date, hour: number) => {
    setSelectedSlot({ date, hour })
    setSelectedEvent(undefined)
    setIsModalOpen(true)
    onSlotClick?.(date, hour)
  }, [onSlotClick])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    setSelectedEvent(undefined)
    setSelectedSlot(undefined)
  }, [])

  const handleEventMove = useCallback((eventId: string, newStartTime: Date, newEndTime: Date) => {
    onEventMove?.(eventId, newStartTime, newEndTime)
  }, [onEventMove])

  const handleEventResize = useCallback((eventId: string, newStartTime: Date, newEndTime: Date) => {
    onEventResize?.(eventId, newStartTime, newEndTime)
  }, [onEventResize])

  const handleSaveEvent = useCallback((eventData: Partial<CalendarEvent>) => {
    if (selectedEvent?.id) {
      // Update existing event
      onEventMove?.(selectedEvent.id, eventData.startTime!, eventData.endTime!)
    } else {
      // Create new event
      onCreateEvent?.(eventData)
    }
    handleModalClose()
  }, [selectedEvent, onEventMove, onCreateEvent, handleModalClose])

  const handleDeleteEvent = useCallback((eventId: string) => {
    onDeleteEvent?.(eventId)
    handleModalClose()
  }, [onDeleteEvent, handleModalClose])

  // Filter events based on view mode
  const getFilteredEvents = () => {
    if (viewMode === 'day') {
      return events.filter(event =>
        isSameDay(event.startTime, currentDate) || isSameDay(event.endTime, currentDate)
      )
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(currentDate)
      const weekEnd = addDays(weekStart, 6)
      return events.filter(event =>
        event.startTime <= weekEnd && event.endTime >= weekStart
      )
    } else {
      const monthStart = startOfMonth(currentDate)
      const monthEnd = endOfMonth(currentDate)
      return events.filter(event =>
        event.startTime <= monthEnd && event.endTime >= monthStart
      )
    }
  }

  const filteredEvents = getFilteredEvents()

  const getHeaderTitle = () => {
    if (viewMode === 'day') {
      return format(currentDate, 'EEEE, MMMM d, yyyy')
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(currentDate)
      const weekEnd = addDays(weekStart, 6)
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
    } else {
      return format(currentDate, 'MMMM yyyy')
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {getHeaderTitle()}
          </h2>
          <div className="text-sm text-muted-foreground">
            {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-hidden">
        <Card className="h-full rounded-none border-0 shadow-none">
          {viewMode === 'day' && (
            <TimeGrid
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onEventMove={handleEventMove}
              onEventResize={handleEventResize}
            />
          )}
          {viewMode === 'week' && (
            <WeekGrid
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onEventMove={handleEventMove}
              onEventResize={handleEventResize}
            />
          )}
          {viewMode === 'month' && (
            <MonthGrid
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onSlotClick={(date) => {
                setSelectedSlot({ date, hour: 9 }) // Default to 9 AM for month view
                setSelectedEvent(undefined)
                setIsModalOpen(true)
                onSlotClick?.(date, 9)
              }}
              onEventMove={handleEventMove}
            />
          )}
        </Card>
      </div>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        selectedSlot={selectedSlot}
      />
    </div>
  )
}