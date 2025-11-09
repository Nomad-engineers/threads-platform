"use client"

import React, { useState } from 'react'
import { format, addHours } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarEvent, EventModalProps } from './types'
import { Calendar, Clock, MessageSquare, Trash2 } from 'lucide-react'

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
    description: event?.description || '',
    type: event?.type || 'scheduled_post' as const,
    startTime: event?.startTime || (selectedSlot ? addHours(selectedSlot.date, selectedSlot.hour) : new Date()),
    endTime: event?.endTime || (selectedSlot ? addHours(selectedSlot.date, selectedSlot.hour + 1) : addHours(new Date(), 1)),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const eventData = {
        ...formData,
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

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    const [hours, minutes] = value.split(':').map(Number)
    const newDate = new Date(formData[field])
    newDate.setHours(hours, minutes, 0, 0)
    setFormData(prev => ({ ...prev, [field]: newDate }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {event ? (
              <>
                <Calendar className="h-5 w-5" />
                Edit Event
              </>
            ) : (
              <>
                <Calendar className="h-5 w-5" />
                New Event
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Event Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled_post">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Scheduled Post
                  </div>
                </SelectItem>
                <SelectItem value="analytics_review">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Analytics Review
                  </div>
                </SelectItem>
                <SelectItem value="content_planning">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Content Planning
                  </div>
                </SelectItem>
                <SelectItem value="meeting">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Meeting
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Event title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Event description (optional)"
              rows={3}
            />
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="startTime"
                  type="time"
                  value={format(formData.startTime, 'HH:mm')}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="endTime"
                  type="time"
                  value={format(formData.endTime, 'HH:mm')}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Date Display */}
          <div className="text-sm text-muted-foreground">
            {format(formData.startTime, 'EEEE, MMMM d, yyyy')}
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