"use client"

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Calendar, CalendarDays, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ViewMode = 'day' | 'week' | 'month'

interface ViewOption {
  value: ViewMode
  label: string
  icon: React.ReactNode
  description: string
}

const viewOptions: ViewOption[] = [
  {
    value: 'day',
    label: 'Today',
    icon: <Calendar className="h-4 w-4" />,
    description: 'Detailed view of current day'
  },
  {
    value: 'week',
    label: 'Week',
    icon: <CalendarDays className="h-4 w-4" />,
    description: '7-day layout'
  },
  {
    value: 'month',
    label: 'Month',
    icon: <LayoutGrid className="h-4 w-4" />,
    description: 'Compact monthly grid'
  },
]

interface CalendarViewSelectorProps {
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  className?: string
}

export function CalendarViewSelector({
  currentView,
  onViewChange,
  className
}: CalendarViewSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = viewOptions.find(option => option.value === currentView)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleViewSelect = (view: ViewMode) => {
    onViewChange(view)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[120px] justify-between"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          {currentOption?.icon}
          {currentOption?.label}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 mt-1 min-w-[200px] bg-popover border rounded-md shadow-lg z-50",
          "transition-all duration-200 ease-in-out",
          "origin-top",
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        )}
      >
        <div className="p-1" role="listbox">
          {viewOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleViewSelect(option.value)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm",
                "transition-colors duration-150",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                currentView === option.value && "bg-accent/50 font-medium"
              )}
              role="option"
              aria-selected={currentView === option.value}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/50">
                {option.icon}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-muted-foreground">
                  {option.description}
                </div>
              </div>
              {currentView === option.value && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}