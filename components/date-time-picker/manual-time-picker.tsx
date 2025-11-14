"use client"

import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ManualTimePickerProps {
  time: string
  timezone: string
  onTimeChange: (time: string) => void
}

export function ManualTimePicker({ time, timezone, onTimeChange }: ManualTimePickerProps) {
  return (
    <div className="space-y-2">
      <div className="px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Manual Time</h3>
      </div>
      <div className="flex items-center gap-2 rounded-md border p-2">
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
    </div>
  )
}