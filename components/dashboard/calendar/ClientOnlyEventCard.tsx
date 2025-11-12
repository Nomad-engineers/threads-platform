"use client"

import React, { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { EventCardProps } from './types'

interface ClientOnlyEventCardProps extends EventCardProps {
  fallback?: React.ReactNode
}

export function ClientOnlyEventCard({
  event,
  isDragging = false,
  onClick,
  onDragStart,
  onDragEnd,
  fallback
}: ClientOnlyEventCardProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // During SSR and hydration, render a non-interactive version
  if (!isClient) {
    if (fallback) {
      return <>{fallback}</>
    }

    // Render a simplified version without DND functionality
    const eventColors = {
      scheduled_post: 'bg-blue-500 border-blue-600 text-white',
      analytics_review: 'bg-green-500 border-green-600 text-white',
      content_planning: 'bg-purple-500 border-purple-600 text-white',
      meeting: 'bg-orange-500 border-orange-600 text-white',
    }

    const colorClass = eventColors[event.type || 'scheduled_post']
    const duration = Math.round((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60))

    return (
      <div
        className={`h-full rounded-md border p-2 sm:p-3 transition-all overflow-hidden min-h-[120px] sm:min-h-[130px] md:min-h-[140px] ${colorClass}`}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
      >
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <h4 className="text-xs font-semibold truncate text-foreground leading-tight">
              {event.title}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs opacity-90 mb-1">
          <span className="font-medium">
            {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {duration}min
          </span>
        </div>
        {event.description && (
          <div className="text-xs opacity-75 line-clamp-2 leading-relaxed">
            {event.description}
          </div>
        )}
      </div>
    )
  }

  // After hydration, render the full EventCard with DND functionality
  return (
    <EventCard
      event={event}
      isDragging={isDragging}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  )
}