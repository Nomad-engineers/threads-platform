"use client"

import { Button } from "@/components/ui/button"
import { PostingSlot } from "@/types/date-time-picker"

interface PostingSlotsProps {
  slots: PostingSlot[]
  selectedSlot?: string
  onSlotSelect: (slotId: string) => void
}

export function PostingSlots({ slots, selectedSlot, onSlotSelect }: PostingSlotsProps) {
  return (
    <div className="space-y-2">
      <div className="px-1">
        <h3 className="text-sm font-medium text-muted-foreground">Posting Slots</h3>
      </div>
      <div className="flex flex-wrap gap-2 px-1">
        {slots.map((slot) => (
          <Button
            key={slot.id}
            variant={selectedSlot === slot.id ? "default" : "outline"}
            size="sm"
            onClick={() => onSlotSelect(slot.id)}
            className="h-8 text-xs"
          >
            {slot.label}
          </Button>
        ))}
      </div>
    </div>
  )
}