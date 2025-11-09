"use client"

import React, { useState, useCallback } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, eachDayOfInterval, isSameMonth, isSameDay, isToday, setHours, setMinutes } from 'date-fns'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core'
import { CalendarEvent, MonthGridProps } from './types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ClientOnlyEventCard } from './ClientOnlyEventCard'

export function MonthGrid({
  currentDate,
  events = [],
  onEventClick,
  onSlotClick,
  onEventMove,
}: MonthGridProps) {
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Ensure DND only initializes on client side
  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = startOfWeek(monthEnd)
  calendarEnd.setDate(calendarEnd.getDate() + 6) // Include last week

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  })

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getEventsForDay = (day: Date) => {
    return events.filter(event =>
      isSameDay(event.startTime, day) || isSameDay(event.endTime, day)
    )
  }

  const handleDayClick = (day: Date) => {
    onSlotClick?.(day)
  }

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const eventData = active.data.current as { event: CalendarEvent }
    if (eventData?.event) {
      setDraggedEvent(eventData.event)
    }
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !draggedEvent) {
      setDraggedEvent(null)
      return
    }

    const dropData = over.data.current as { date: Date }

    if (dropData?.date) {
      // Default to 9 AM for month view drops
      const baseDate = setHours(setMinutes(dropData.date, 0), 9)
      const duration = draggedEvent.endTime.getTime() - draggedEvent.startTime.getTime()
      const newStartTime = new Date(baseDate)
      const newEndTime = new Date(baseDate.getTime() + duration)

      onEventMove?.(draggedEvent.id, newStartTime, newEndTime)
    }

    setDraggedEvent(null)
  }, [draggedEvent, onEventMove])

  // Droppable day component
  const DroppableDay = ({ day, children }: { day: Date; children: React.ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `day-${format(day, 'yyyy-MM-dd')}`,
      data: {
        date: day
      }
    })

    const isCurrentMonth = isSameMonth(day, currentDate)
    const isCurrentDay = isToday(day)

    return (
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-[100px] border-r border-b p-2 cursor-pointer transition-colors",
          "last:border-r-0",
          !isCurrentMonth && "bg-muted/10 text-muted-foreground",
          isCurrentDay && "bg-primary/5",
          isOver ? "bg-accent/20" : "hover:bg-muted/20"
        )}
        onClick={() => handleDayClick(day)}
      >
        {children}
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className="h-full overflow-auto">
        {/* Week Day Headers */}
        <div className="grid grid-cols-7 border-b bg-muted/50 sticky top-0 z-10">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="p-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(day)

            return (
              <DroppableDay key={index} day={day}>
                {/* Day Number */}
                <div className={cn(
                  "text-sm font-medium mb-1",
                  isToday(day) && "text-primary font-bold"
                )}>
                  {format(day, 'd')}
                </div>

                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <ClientOnlyEventCard
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick?.(event)}
                      onDragStart={() => {}}
                      onDragEnd={() => {}}
                    />
                  ))}

                  {/* Show more indicator */}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </DroppableDay>
            )
          })}
        </div>
      </div>
    )
  }

  // Only render DND context on client side
  if (!isClient) {
    return renderContent()
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {renderContent()}

      <DragOverlay>
        {draggedEvent ? (
          <div className="bg-white border rounded-lg shadow-lg p-2 opacity-90">
            <ClientOnlyEventCard
              event={draggedEvent}
              isDragging={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function getEventColorClass(type?: string) {
  const colors = {
    scheduled_post: 'bg-blue-500 text-white border-blue-600',
    analytics_review: 'bg-green-500 text-white border-green-600',
    content_planning: 'bg-purple-500 text-white border-purple-600',
    meeting: 'bg-orange-500 text-white border-orange-600',
  }
  return colors[type as keyof typeof colors] || 'bg-gray-500 text-white border-gray-600'
}