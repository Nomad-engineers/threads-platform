"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface TimeScrollProps {
  times: string[]
  selectedTime?: string
  onTimeSelect: (time: string) => void
}

export function TimeScroll({ times, selectedTime, onTimeSelect }: TimeScrollProps) {
  return (
    <div className="space-y-2">
      <div className="px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Quick Times</h3>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-32 w-full">
          <div className="p-1 space-y-1">
            {times.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "ghost"}
                size="sm"
                onClick={() => onTimeSelect(time)}
                className="w-full justify-start text-xs h-7"
              >
                {time}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}