"use client"

import React from 'react'
import { format, addHours, startOfDay, isWithinInterval, isSameDay, differenceInMinutes } from 'date-fns'
import { useDroppable } from '@dnd-kit/core'
import { CalendarEvent, HourColumnProps } from './types'
import { ClientOnlyEventCard } from './ClientOnlyEventCard'
import { cn } from '@/lib/utils'

export function HourColumn({
  hour,
  events = [],
  currentDate,
  onEventClick,
  onSlotClick,
}: HourColumnProps) {
  const slotStartTime = addHours(startOfDay(currentDate), hour)
  const slotEndTime = addHours(slotStartTime, 1)

  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${hour}`,
    data: {
      hour,
      date: currentDate,
    },
  })

  // Filter events that occur during this hour
  const hourEvents = events.filter(event => {
    const eventStart = event.startTime
    const eventEnd = event.endTime

    return (
      (isWithinInterval(slotStartTime, { start: eventStart, end: eventEnd })) ||
      (isWithinInterval(slotEndTime, { start: eventStart, end: eventEnd })) ||
      (isWithinInterval(eventStart, { start: slotStartTime, end: slotEndTime }))
    ) && isSameDay(eventStart, currentDate)
  })

  const handleSlotClick = () => {
    onSlotClick?.(currentDate, hour)
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "h-16 border-b border-l relative group cursor-pointer transition-colors",
        isOver && "bg-blue-50 border-blue-200"
      )}
      onClick={handleSlotClick}
    >
      {/* Slot background hover effect */}
      <div className="absolute inset-0 bg-muted/20 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Half-hour marker */}
      <div className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-muted-foreground/20" />

      {/* Events container */}
      <div className="absolute inset-0 pointer-events-none">
        {hourEvents.map((event) => {
          // Calculate event position and height
          const eventStart = event.startTime
          const eventEnd = event.endTime
          const slotStart = slotStartTime

          const topMinutes = Math.max(0, differenceInMinutes(eventStart, slotStart))
          const durationMinutes = Math.min(
            60,
            differenceInMinutes(eventEnd, slotStart)
          )

          const top = (topMinutes / 60) * 100
          const height = (durationMinutes / 60) * 100

          return (
            <div
              key={event.id}
              className="absolute left-1 right-1 pointer-events-auto"
              style={{
                top: `${top}%`,
                height: `${height}%`,
                minHeight: '20px',
              }}
            >
              <ClientOnlyEventCard
                event={event}
                onClick={() => onEventClick?.(event)}
              />
            </div>
          )
        })}
      </div>

      {/* Current time indicator */}
      {React.useMemo(() => {
        const now = new Date()
        if (isSameDay(now, currentDate)) {
          const currentHour = now.getHours()
          const currentMinutes = now.getMinutes()

          if (currentHour === hour) {
            const top = (currentMinutes / 60) * 100
            return (
              <div
                className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
                style={{ top: `${top}%` }}
              >
                <div className="absolute left-0 w-2 h-2 bg-red-500 rounded-full -top-0.75 -left-1" />
              </div>
            )
          }
        }
        return null
      }, [currentDate, hour])}
    </div>
  )
}