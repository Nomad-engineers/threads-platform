"use client"

import React, { useState } from 'react'
import { format, addHours } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarEvent, EventModalProps } from './types'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { DateTimePickerValue, PostingSlot } from '@/types/date-time-picker'
import { Calendar, Trash2 } from 'lucide-react'

export function EventModal({
  event,
  isOpen,
  onClose,
  selectedSlot,
  onSave,
  onDelete,
}: EventModalProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    topic: event?.topic || '',
  })

  const [selectedDateTime, setSelectedDateTime] = useState<DateTimePickerValue>(() => {
    const initialDate = event?.startTime || (selectedSlot ? addHours(selectedSlot.date, selectedSlot.hour || 0) : new Date())
    return {
      date: initialDate,
      time: format(initialDate, 'HH:mm'),
      timezone: 'Asia/Almaty',
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Combine date and time from DateTimePicker
      const [hours, minutes] = selectedDateTime.time.split(':').map(Number)
      const combinedDateTime = new Date(selectedDateTime.date)
      combinedDateTime.setHours(hours, minutes, 0, 0)

      const eventData = {
        ...formData,
        startTime: combinedDateTime,
        ...(event && { id: event.id }),
      }

      await onSave?.(eventData)
      onClose()
    } catch (error) {
      console.error('Failed to save event:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (event?.id) {
      setIsSubmitting(true)
      try {
        await onDelete?.(event.id)
        onClose()
      } catch (error) {
        console.error('Failed to delete event:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const customPostingSlots: PostingSlot[] = [
    { id: "1", time: "09:57", label: "9:57 AM" },
    { id: "2", time: "07:31", label: "7:31 PM" },
    { id: "3", time: "14:15", label: "2:15 PM" },
    { id: "4", time: "10:00", label: "10:00 AM" },
    { id: "5", time: "17:45", label: "5:45 PM" },
    { id: "6", time: "23:30", label: "11:30 PM" },
    { id: "7", time: "08:00", label: "8:00 AM" },
  ]

  const createCombinedDateTime = (value: DateTimePickerValue) => {
    const [hours, minutes] = value.time.split(':').map(Number)
    const combined = new Date(value.date)
    combined.setHours(hours || 0, minutes || 0, 0, 0)
    return combined
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {event ? (
              <>
                <Calendar className="h-5 w-5" />
                Edit Post
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5" />
                Create New Post
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Post title"
              required
            />
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              placeholder="Topic (optional)"
            />
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-2">
            <Label>Date and Time</Label>
            <DateTimePicker
              value={selectedDateTime}
              onChange={setSelectedDateTime}
              timezone="Asia/Almaty"
              placeholder="Select date and time for your post"
            />            
          </div>
          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <div>
              {event && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title.trim()}
              >
                {isSubmitting ? 'Saving...' : event ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}