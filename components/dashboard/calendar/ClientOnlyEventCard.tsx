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
        className={`h-full rounded-md border p-2 transition-all ${colorClass}`}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
      >
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1 min-w-0">
            <h4 className="text-xs font-semibold truncate">
              {event.title}
            </h4>
          </div>
        </div>
        <div className="text-xs opacity-90">
          {event.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {duration}min
        </div>
        {event.description && event.description.length < 50 && (
          <div className="text-xs opacity-75 mt-1 line-clamp-1">
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