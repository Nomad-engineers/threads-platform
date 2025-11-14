"use client"

import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarHeaderProps {
  currentMonth: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
}

export function CalendarHeader({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-1 py-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPreviousMonth}
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="text-sm font-medium">
        {format(currentMonth, "MMMM yyyy")}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNextMonth}
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}