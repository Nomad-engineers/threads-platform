"use client"

import React, { useState } from 'react'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { DateTimePickerValue, PostingSlot } from '@/types/date-time-picker'

export default function DateTimePickerDemo() {
  const [selectedDateTime, setSelectedDateTime] = useState<DateTimePickerValue | undefined>({
    date: new Date(),
    time: "09:57",
    timezone: "Asia/Almaty",
  })
  const [logs, setLogs] = useState<string[]>([])

  const customPostingSlots: PostingSlot[] = [
    { id: "1", time: "09:57", label: "9:57 AM" },
    { id: "2", time: "07:31", label: "7:31 PM" },
    { id: "3", time: "14:15", label: "2:15 PM" },
    { id: "4", time: "10:00", label: "10:00 AM" },
    { id: "5", time: "17:45", label: "5:45 PM" },
    { id: "6", time: "23:30", label: "11:30 PM" },
    { id: "7", time: "08:00", label: "8:00 AM" },
  ]

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
  }

  const handleClear = () => {
    setSelectedDateTime(undefined)
    addLog('Cleared date/time')
  }

  const handleSetNow = () => {
    const now = new Date()
    setSelectedDateTime({
      date: now,
      time: format(now, "HH:mm"),
      timezone: "Asia/Almaty",
    })
    addLog('Set to current time')
  }

  const createCombinedDateTime = (value: DateTimePickerValue) => {
    const [hours, minutes] = value.time.split(':').map(Number)
    const combined = new Date(value.date)
    combined.setHours(hours || 0, minutes || 0, 0, 0)
    return combined
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">DateTime Picker Demo</h1>
          <p className="text-muted-foreground">Test the custom DateTimePicker component with posting slots, time scrolling, and manual time input</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>DateTime Picker Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DateTimePicker
              value={selectedDateTime}
              onChange={(value) => {
                setSelectedDateTime(value)
                const combined = createCombinedDateTime(value)
                addLog(`Selected: ${format(combined, 'PPP p')}`)
              }}
              postingSlots={customPostingSlots}
              timezone="Asia/Almaty"
            />

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSetNow}>
                Set to Now
              </Button>
              <Button variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>

            {selectedDateTime && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Selected Date/Time:</h4>
                <div className="space-y-1 text-sm">
                  <div><strong>Date:</strong> {format(selectedDateTime.date, 'PPP')}</div>
                  <div><strong>Time:</strong> {selectedDateTime.time}</div>
                  <div><strong>Timezone:</strong> {selectedDateTime.timezone}</div>
                  <div><strong>Combined:</strong> {format(createCombinedDateTime(selectedDateTime), 'PPP p')}</div>
                  <div><strong>ISO:</strong> {createCombinedDateTime(selectedDateTime).toISOString()}</div>
                  <div><strong>Unix:</strong> {createCombinedDateTime(selectedDateTime).getTime()}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {logs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Event Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 font-mono text-xs max-h-40 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="p-1 bg-muted/50 rounded">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}