"use client"

import {Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DatePickerFooterProps {  onDone?: () => void
}

export function DatePickerFooter({onDone }: DatePickerFooterProps) {
  return (
    <div className="flex items-center justify-between pt-2 border-t">
      <Button
        size="sm"
        onClick={onDone}
        className="text-xs h-7"
      >
        <Check className="h-3 w-3 mr-1" />
        Done
      </Button>
    </div>
  )
}