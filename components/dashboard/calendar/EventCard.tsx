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
        "h-full rounded-md border p-2 cursor-move transition-all hover:shadow-md hover:border-border/70",
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
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-1 min-w-0">
          {event.type === 'scheduled_post' && <MessageSquare className="h-3 w-3 flex-shrink-0" />}
          {event.type === 'analytics_review' && <Calendar className="h-3 w-3 flex-shrink-0" />}
          {event.type === 'content_planning' && <Calendar className="h-3 w-3 flex-shrink-0" />}
          {event.type === 'meeting' && <Calendar className="h-3 w-3 flex-shrink-0" />}
          <h4 className="text-xs font-semibold truncate">
            {event.title}
          </h4>
        </div>
      </div>

      {/* Event time */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-2.5 w-2.5" />
        <span>
          {format(event.startTime, 'h:mm')} • {duration}min
        </span>
      </div>

      {/* Event description (if short enough) */}
      {event.description && event.description.length < 50 && (
        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
          {event.description}
        </div>
      )}

      {/* Hover indicator */}
      <div className="absolute inset-0 border-2 border-accent/50 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none" />
    </div>
  )
}