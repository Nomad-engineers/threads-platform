"use client"

import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ManualTimePickerProps {
  time: string
  timezone: string
  onTimeChange: (time: string) => void
}

export function ManualTimePicker({ time, timezone, onTimeChange }: ManualTimePickerProps) {
  // Generate time options (every 15 minutes from 12:00 AM to 11:45 PM)
  const generateTimeOptions = () => {
    const times: string[] = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const displayTime = format(
          new Date().setHours(hour, minute, 0, 0),
          "h:mm a"
        )
        times.push(displayTime)
      }
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  const handleTimeSelect = (timeDisplay: string) => {
    // Convert display time (e.g., "9:00 AM") to HH:mm format
    const [timeStr, period] = timeDisplay.split(" ")
    const [hours, minutes] = timeStr.split(":").map(Number)

    let hour24 = hours
    if (period === "PM" && hours !== 12) {
      hour24 += 12
    } else if (period === "AM" && hours === 12) {
      hour24 = 0
    }

    const time24 = `${hour24.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`
    onTimeChange(time24)
  }

  // Get current time in display format for highlighting
  const getCurrentDisplayTime = () => {
    const [hours, minutes] = time.split(":").map(Number)
    return format(
      new Date().setHours(hours, minutes, 0, 0),
      "h:mm a"
    )
  }

  const currentDisplayTime = getCurrentDisplayTime()

  return (
    <div className="space-y-2">
      <div className="px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Manual Time</h3>
      </div>
      <div className="rounded-md border p-2 space-y-3">
        {/* Time input with timezone */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="flex-1 h-8 text-sm"
          />
          <Button variant="outline" size="sm" className="h-8 text-xs text-muted-foreground">
            {timezone}
          </Button>
        </div>

        {/* Scrollable time list */}
        <ScrollArea
          className="h-48 w-full rounded-md border"
          data-manual-time-scroll
          onWheel={(e) => {
            // Ensure wheel events work properly in modal context
            e.stopPropagation()
          }}
          onTouchMove={(e) => {
            // Ensure touch events work properly in modal context
            e.stopPropagation()
          }}
        >
          <div className="p-1">
            <div
              className="space-y-1"
              style={{
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              {timeOptions.map((timeOption) => (
                <Button
                  key={timeOption}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleTimeSelect(timeOption)}
                  className={cn(
                    "w-full justify-start h-7 text-xs font-normal px-2",
                    currentDisplayTime === timeOption &&
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onMouseDown={(e) => e.stopPropagation()}
                  onMouseMove={(e) => e.stopPropagation()}
                  onMouseUp={(e) => e.stopPropagation()}
                >
                  {timeOption}
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}