"use client"

import React, { useCallback, useState, useEffect } from 'react'
import { format, addHours, startOfDay, isWithinInterval, isSameDay, differenceInMinutes } from 'date-fns'
import { DndContext, DragStartEvent, DragOverEvent, DragEndEvent, useSensor, useSensors, PointerSensor, DragOverlay } from '@dnd-kit/core'
import { CalendarEvent, TimeGridProps } from './types'
import { HourColumn } from './HourColumn'
import { ClientOnlyEventCard } from './ClientOnlyEventCard'

export function TimeGrid({
  currentDate,
  events = [],
  onEventClick,
  onSlotClick,
  onEventMove,
  onEventResize,
}: TimeGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Ensure DND only initializes on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id as string)
    const foundEvent = events.find(e => e.id === active.id)
    setDraggedEvent(foundEvent || null)
  }, [events])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // Handle drag over logic for visual feedback
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setDraggedEvent(null)

    if (!over || !draggedEvent) return

    // Extract hour and date from droppable id
    const [dropType, hourStr] = over.id.toString().split('-')
    const targetHour = parseInt(hourStr)

    if (dropType === 'slot' && !isNaN(targetHour)) {
      const duration = differenceInMinutes(draggedEvent.endTime, draggedEvent.startTime)
      const newStartTime = addHours(startOfDay(currentDate), targetHour)
      const newEndTime = addHours(newStartTime, duration / 60)

      onEventMove?.(draggedEvent.id, newStartTime, newEndTime)
    }
  }, [draggedEvent, currentDate, onEventMove])

  const renderContent = () => {
    return (
      <div className="h-full flex">
        {/* Time labels column */}
        <div className="w-20 flex-shrink-0 border-r bg-muted/30">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b flex items-center justify-center px-2"
            >
              <span className="text-xs text-muted-foreground font-medium">
                {format(addHours(startOfDay(new Date()), hour), 'ha')}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex-1 relative min-w-0">
          {/* Hour columns */}
          <div className="relative h-full">
            {hours.map((hour) => (
              <HourColumn
                key={hour}
                hour={hour}
                events={events}
                currentDate={currentDate}
                onEventClick={onEventClick}
                onSlotClick={onSlotClick}
              />
            ))}
          </div>
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
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {renderContent()}

      {/* Drag overlay */}
      <DragOverlay>
        {activeId && draggedEvent ? (
          <div className="bg-white border shadow-lg rounded p-2 opacity-90">
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