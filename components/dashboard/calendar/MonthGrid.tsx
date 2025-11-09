"use client"

import React from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns'
import { CalendarEvent, MonthGridProps } from './types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export function MonthGrid({
  currentDate,
  events = [],
  onEventClick,
  onSlotClick,
}: MonthGridProps) {
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
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isCurrentDay = isToday(day)

          return (
            <div
              key={index}
              className={cn(
                "min-h-[100px] border-r border-b p-2 cursor-pointer transition-colors",
                "hover:bg-muted/20",
                !isCurrentMonth && "bg-muted/10 text-muted-foreground",
                isCurrentDay && "bg-primary/5",
                "last:border-r-0"
              )}
              onClick={() => handleDayClick(day)}
            >
              {/* Day Number */}
              <div className={cn(
                "text-sm font-medium mb-1",
                isCurrentDay && "text-primary font-bold"
              )}>
                {format(day, 'd')}
              </div>

              {/* Events */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs p-1 rounded truncate cursor-pointer",
                      "hover:opacity-80 transition-opacity",
                      getEventColorClass(event.type)
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick?.(event)
                    }}
                    title={event.title}
                  >
                    {format(event.startTime, 'h:mm a')} - {event.title}
                  </div>
                ))}

                {/* Show more indicator */}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
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