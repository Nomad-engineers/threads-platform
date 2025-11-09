"use client"

import React, { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { format, startOfWeek, addDays, isSameDay, setHours, setMinutes } from 'date-fns'
import { CalendarEvent, WeekGridProps } from './types'
import { EventCard } from './EventCard'
import { cn } from '@/lib/utils'

export function WeekGrid({
  currentDate,
  events = [],
  onEventClick,
  onSlotClick,
  onEventMove,
}: WeekGridProps) {
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)
  const [dragStartTime, setDragStartTime] = useState<Date | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const weekStart = startOfWeek(currentDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const eventData = active.data.current as { event: CalendarEvent }
    if (eventData?.event) {
      setDraggedEvent(eventData.event)
      setDragStartTime(eventData.event.startTime)
    }
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !draggedEvent || !dragStartTime) {
      setDraggedEvent(null)
      setDragStartTime(null)
      return
    }

    const dropData = over.data.current as {
      date: Date,
      hour?: number,
      minutes?: number
    }

    if (dropData?.date) {
      const baseDate = setMinutes(setHours(dropData.date, dropData.hour || 0), dropData.minutes || 0)
      const duration = draggedEvent.endTime.getTime() - draggedEvent.startTime.getTime()
      const newStartTime = new Date(baseDate)
      const newEndTime = new Date(baseDate.getTime() + duration)

      onEventMove?.(draggedEvent.id, newStartTime, newEndTime)
    }

    setDraggedEvent(null)
    setDragStartTime(null)
  }, [draggedEvent, dragStartTime, onEventMove])

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      const hourStart = setHours(setMinutes(day, 0), hour)
      const hourEnd = setHours(setMinutes(day, 59), hour)
      return event.startTime < hourEnd && event.endTime > hourStart
    })
  }

  const getEventPosition = (event: CalendarEvent, day: Date, hour: number) => {
    const hourStart = setHours(setMinutes(day, 0), hour)
    const hourEnd = setHours(setMinutes(day, 59), hour)

    const eventStart = event.startTime > hourStart ? event.startTime : hourStart
    const eventEnd = event.endTime < hourEnd ? event.endTime : hourEnd

    const topMinutes = eventStart.getMinutes()
    const durationMinutes = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60)

    const top = (topMinutes / 60) * 100
    const height = (durationMinutes / 60) * 100

    return { top, height }
  }

  const handleSlotClick = (day: Date, hour: number) => {
    onSlotClick?.(day, hour)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full overflow-auto">
        <div className="min-w-[800px]">
          {/* Week Header */}
          <div className="grid grid-cols-8 border-b bg-muted/50 sticky top-0 z-10">
            <div className="p-2 text-sm font-medium text-muted-foreground border-r">
              Time
            </div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "p-2 text-center border-r last:border-r-0",
                  isSameDay(day, new Date()) && "bg-primary/10"
                )}
              >
                <div className="text-sm font-medium">
                  {format(day, 'EEE')}
                </div>
                <div className={cn(
                  "text-lg font-bold",
                  isSameDay(day, new Date()) && "text-primary"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b">
                {/* Hour Label */}
                <div className="p-2 text-sm text-muted-foreground border-r bg-muted/30">
                  {format(setHours(new Date(), hour), 'ha')}
                </div>

                {/* Day Columns */}
                {weekDays.map((day, dayIndex) => {
                  const hourEvents = getEventsForDayAndHour(day, hour)

                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        "relative border-r last:border-r-0 min-h-[60px] cursor-pointer hover:bg-muted/20 transition-colors",
                        isSameDay(day, new Date()) && "bg-primary/5"
                      )}
                      onClick={() => handleSlotClick(day, hour)}
                      data-day={format(day, 'yyyy-MM-dd')}
                      data-hour={hour}
                    >
                      {/* Events */}
                      {hourEvents.map((event) => {
                        const position = getEventPosition(event, day, hour)
                        return (
                          <div
                            key={event.id}
                            className="absolute left-1 right-1 z-10"
                            style={{
                              top: `${position.top}%`,
                              height: `${position.height}%`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              onEventClick?.(event)
                            }}
                          >
                            <EventCard
                              event={event}
                              onClick={() => onEventClick?.(event)}
                              onDragStart={() => {}}
                              onDragEnd={() => {}}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <DragOverlay>
        {draggedEvent ? (
          <div className="bg-white border rounded-lg shadow-lg p-2 opacity-90">
            <EventCard
              event={draggedEvent}
              isDragging={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}