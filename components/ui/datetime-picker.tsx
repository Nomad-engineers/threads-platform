"use client"

import * as React from "react"
import { format, addMonths, subMonths } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { CalendarHeader } from "@/components/date-time-picker/calendar-header"
import { PostingSlots } from "@/components/date-time-picker/posting-slots"
import { TimeScroll } from "@/components/date-time-picker/time-scroll"
import { ManualTimePicker } from "@/components/date-time-picker/manual-time-picker"

import {
  DateTimePickerProps,
  DateTimePickerValue,
  PostingSlot,
} from "@/types/date-time-picker"

export function DateTimePicker({
  value,
  onChange,
  postingSlots,
  timezone = "Asia/Almaty",
  disabled = false,
  placeholder = "Pick a date and time",
  className,
}: DateTimePickerProps & { placeholder?: string; className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    value?.date || new Date()
  )
  const [selectedTime, setSelectedTime] = React.useState<string>(
    value?.time || format(new Date(), "HH:mm")
  )
  const [selectedSlot, setSelectedSlot] = React.useState<string>()
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  // Generate default posting slots
  const defaultPostingSlots: PostingSlot[] = [
    { id: "1", time: "09:57", label: "9:57 AM" },
    { id: "2", time: "12:30", label: "12:30 PM" },
    { id: "3", time: "15:45", label: "3:45 PM" },
    { id: "4", time: "19:31", label: "7:31 PM" },
  ]

  const slots = postingSlots || defaultPostingSlots

  // Generate time options (every 15 minutes)
  const generateTimeOptions = () => {
    const times: string[] = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
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

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      updateValue(date, selectedTime)
    }
  }

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId)
    const slot = slots.find((s) => s.id === slotId)
    if (slot) {
      setSelectedTime(slot.time)
      updateValue(selectedDate, slot.time)
    }
  }

  const handleTimeSelect = (timeDisplay: string) => {
    // Convert display time (e.g., "9:00 AM") to HH:mm format
    const [time, period] = timeDisplay.split(" ")
    const [hours, minutes] = time.split(":").map(Number)

    let hour24 = hours
    if (period === "PM" && hours !== 12) {
      hour24 += 12
    } else if (period === "AM" && hours === 12) {
      hour24 = 0
    }

    const time24 = `${hour24.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`
    setSelectedTime(time24)
    updateValue(selectedDate, time24)
  }

  const handleManualTimeChange = (time: string) => {
    setSelectedTime(time)
    updateValue(selectedDate, time)
  }

  const updateValue = (date: Date, time: string) => {
    const newValue: DateTimePickerValue = {
      date,
      time,
      timezone,
    }
    onChange?.(newValue)
  }

  const handleDone = () => {
    setIsOpen(false)
  }



  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const displayValue = value
    ? `${format(value.date, "MMM d, yyyy")} at ${format(
        new Date().setHours(
          parseInt(value.time.split(":")[0]),
          parseInt(value.time.split(":")[1])
        ),
        "h:mm a"
      )}`
    : placeholder

  return (
    <div className={cn("w-full max-w-sm", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            {/* Calendar Section */}
            <div className="space-y-2">
              {/* <CalendarHeader
                currentMonth={currentMonth}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
              /> */}
              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="rounded-md"
                  showOutsideDays={false}
                />
              </div>
            </div>

            {/* Posting Slots */}
            <PostingSlots
              slots={slots}
              selectedSlot={selectedSlot}
              onSlotSelect={handleSlotSelect}
            />

            {/* Time Scroll */}
            <TimeScroll
              times={timeOptions}
              selectedTime={format(
                new Date().setHours(
                  parseInt(selectedTime.split(":")[0]),
                  parseInt(selectedTime.split(":")[1])
                ),
                "h:mm a"
              )}
              onTimeSelect={handleTimeSelect}
            />

            {/* Manual Time Picker */}
            <ManualTimePicker
              time={selectedTime}
              timezone={timezone}
              onTimeChange={handleManualTimeChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}