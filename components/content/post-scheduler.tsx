"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  Clock,
  Sparkles,
  Image,
  Send,
  Save,
  X,
} from "lucide-react"
import { format } from "date-fns"

interface PostSchedulerProps {
  onSchedule?: (post: {
    content: string
    scheduledFor: Date
    platform?: string
  }) => void
  onSaveDraft?: (post: {
    content: string
    platform?: string
  }) => void
  className?: string
}

export function PostScheduler({ onSchedule, onSaveDraft, className }: PostSchedulerProps) {
  const [content, setContent] = useState("")
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [scheduledTime, setScheduledTime] = useState("12:00")
  const [platform, setPlatform] = useState("threads")
  const [showCalendar, setShowCalendar] = useState(false)

  const optimalTimes = [
    { day: "Monday", times: ["9:00 AM", "12:00 PM", "6:00 PM"] },
    { day: "Tuesday", times: ["10:00 AM", "2:00 PM", "7:00 PM"] },
    { day: "Wednesday", times: ["9:00 AM", "1:00 PM", "8:00 PM"] },
    { day: "Thursday", times: ["11:00 AM", "3:00 PM", "6:00 PM"] },
    { day: "Friday", times: ["10:00 AM", "2:00 PM", "5:00 PM"] },
  ]

  const suggestedContent = [
    "Share a behind-the-scenes moment from your work today! #BehindTheScenes",
    "What's one thing you learned this week that changed your perspective?",
    "Quick poll: What's your biggest challenge right now? A) Time management B) Creative blocks C) Marketing D) Other",
    "Throwback to when we first started this journey. So much has changed! #ThrowbackThursday",
    "Pro tip of the day: [Share a helpful tip related to your industry]",
  ]

  const handleSchedule = () => {
    if (!content || !scheduledDate) return

    const scheduledDateTime = new Date(scheduledDate)
    const [hours, minutes] = scheduledTime.split(":")
    const [period] = scheduledTime.split(" ")
    let hour = parseInt(hours)

    if (period === "PM" && hour !== 12) hour += 12
    if (period === "AM" && hour === 12) hour = 0

    scheduledDateTime.setHours(hour, parseInt(minutes))

    onSchedule?.({
      content,
      scheduledFor: scheduledDateTime,
      platform,
    })

    // Reset form
    setContent("")
    setScheduledDate(undefined)
    setScheduledTime("12:00")
  }

  const handleSaveDraft = () => {
    if (!content) return

    onSaveDraft?.({
      content,
      platform,
    })
  }

  const generateAISuggestion = () => {
    const randomSuggestion = suggestedContent[Math.floor(Math.random() * suggestedContent.length)]
    setContent(randomSuggestion)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Schedule Post
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platform Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Platform</label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="threads">Threads</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Content</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={generateAISuggestion}
                className="h-7 px-2"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                AI Suggest
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2">
                <Image className="h-3 w-3 mr-1" />
                Add Media
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="What would you like to share?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {content.length}/500 characters
          </p>
        </div>

        {/* Scheduling */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Schedule for</label>
          <div className="flex gap-2">
            <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {scheduledDate ? format(scheduledDate, "MMM dd, yyyy") : "Select date"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Date</DialogTitle>
                  <DialogDescription>
                    Choose when you'd like to publish this post
                  </DialogDescription>
                </DialogHeader>
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
                <DialogFooter>
                  <Button onClick={() => setShowCalendar(false)}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-32"
            />
          </div>
        </div>

        {/* Optimal Times */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Optimal posting times</span>
            <Badge variant="secondary" className="text-xs">
              AI Recommended
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-2 text-xs">
            {optimalTimes.slice(0, 3).map((day) => (
              <div key={day.day} className="flex items-center justify-between p-2 rounded bg-muted/50">
                <span className="font-medium">{day.day}</span>
                <div className="flex gap-1">
                  {day.times.map((time) => (
                    <Badge key={time} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={!content}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!content || !scheduledDate}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}