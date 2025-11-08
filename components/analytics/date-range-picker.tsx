"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
  className?: string
}

const presetRanges = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
  { label: "Last 6 months", value: 180 },
  { label: "Last year", value: 365 },
]

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handlePresetChange = (days: string) => {
    const daysNum = parseInt(days)
    const from = new Date()
    from.setDate(from.getDate() - daysNum)
    const to = new Date()

    onChange?.({ from, to })
    setOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (!value?.from) {
      onChange?.({ from: date, to: undefined })
    } else if (!value?.to) {
      if (date < value.from) {
        onChange?.({ from: date, to: value.from })
      } else {
        onChange?.({ from: value.from, to: date })
      }
      setOpen(false)
    } else {
      onChange?.({ from: date, to: undefined })
    }
  }

  const formatDateRange = () => {
    if (!value?.from) return placeholder

    if (value.to) {
      return `${format(value.from, "MMM dd, yyyy")} - ${format(
        value.to,
        "MMM dd, yyyy"
      )}`
    }

    return `${format(value.from, "MMM dd, yyyy")} - ...`
  }

  const selectedDays = value?.from ? [value.from] : []
  if (value?.to && value.from !== value.to) {
    selectedDays.push(value.to)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick select</label>
              <Select onValueChange={handlePresetChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose preset" />
                </SelectTrigger>
                <SelectContent>
                  {presetRanges.map((preset) => (
                    <SelectItem key={preset.value} value={preset.value.toString()}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-3">
              <Calendar
                mode="single"
                selected={selectedDays}
                onSelect={handleDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                numberOfMonths={1}
                className="rounded-md border"
              />
            </div>

            {value?.from && value?.to && (
              <div className="border-t pt-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => onChange?.({ from: undefined, to: undefined })}
                >
                  Clear selection
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}