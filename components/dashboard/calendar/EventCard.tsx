"use client"

import React from 'react'
import { format } from 'date-fns'
import { useDraggable } from '@dnd-kit/core'
import { CalendarEvent, EventCardProps } from './types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MessageSquare } from 'lucide-react'

// Unified neutral color scheme for all events
const eventColors = {
  scheduled_post: 'bg-card border-border text-card-foreground shadow-sm',
  analytics_review: 'bg-card border-border text-card-foreground shadow-sm',
  content_planning: 'bg-card border-border text-card-foreground shadow-sm',
  meeting: 'bg-card border-border text-card-foreground shadow-sm',
}

export function EventCard({
  event,
  isDragging = false,
  onClick,
}: EventCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isDraggingEvent,
  } = useDraggable({
    id: event.id,
    data: {
      event,
    },
  })

  const colorClass = eventColors[event.type || 'scheduled_post']
  const duration = Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60))

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "h-full rounded-md border p-2 sm:p-3 cursor-move transition-all hover:shadow-md hover:border-border/70 overflow-hidden min-h-[120px] sm:min-h-[130px] md:min-h-[140px]",
        colorClass,
        (isDragging || isDraggingEvent) && "opacity-50 scale-95 rotate-2",
        "group"
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      style={{
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}
    >
      {/* Event header */}
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {event.type === 'scheduled_post' && <MessageSquare className="h-3 w-3 flex-shrink-0 text-blue-600 dark:text-blue-400" />}
          {event.type === 'analytics_review' && <Calendar className="h-3 w-3 flex-shrink-0 text-green-600 dark:text-green-400" />}
          {event.type === 'content_planning' && <Calendar className="h-3 w-3 flex-shrink-0 text-purple-600 dark:text-purple-400" />}
          {event.type === 'meeting' && <Calendar className="h-3 w-3 flex-shrink-0 text-orange-600 dark:text-orange-400" />}
          <h4 className="text-xs font-semibold truncate text-foreground leading-tight">
            {event.title}
          </h4>
        </div>
      </div>

      {/* Event time */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        <Clock className="h-2.5 w-2.5 flex-shrink-0" />
        <span className="font-medium">
          {format(event.startTime, 'h:mm')} • {duration}min
        </span>
      </div>

      {/* Event description */}
      {event.description && (
        <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {event.description}
        </div>
      )}

      {/* Hover indicator */}
      <div className="absolute inset-0 border-2 border-accent/50 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none" />
    </div>
  )
}