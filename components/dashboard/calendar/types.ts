export type ViewMode = 'day' | 'week' | 'month'

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  color?: string
  type?: 'scheduled_post' | 'analytics_review' | 'content_planning' | 'meeting'
}

export interface TimeSlot {
  hour: number
  date: Date
}

export interface CalendarViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (date: Date, hour: number) => void
  onEventMove?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
  onEventResize?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
}

export interface EventCardProps {
  event: CalendarEvent
  isDragging?: boolean
  onClick?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

export interface TimeGridProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (date: Date, hour: number) => void
  onEventMove?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
  onEventResize?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
}

export interface EventModalProps {
  event?: CalendarEvent
  isOpen: boolean
  onClose: () => void
  onSave?: (event: Partial<CalendarEvent>) => void
  onDelete?: (eventId: string) => void
  selectedSlot?: { date: Date; hour: number }
}

export interface HourColumnProps {
  hour: number
  events: CalendarEvent[]
  currentDate: Date
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (date: Date, hour: number) => void
}

export interface WeekGridProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (date: Date, hour: number) => void
  onEventMove?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
  onEventResize?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
}

export interface MonthGridProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onSlotClick?: (date: Date) => void
  onEventMove?: (eventId: string, newStartTime: Date, newEndTime: Date) => void
}