"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Heart,
  MoreHorizontal,
  Reply,
  Flag,
  Trash2,
  Check,
  X,
  Search,
  Filter,
  Star,
  UserCheck,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  content: string
  author: {
    name: string
    username: string
    avatar?: string
    isVIP?: boolean
    isVerified?: boolean
  }
  postId: string
  postContent: string
  createdAt: Date
  likes: number
  replies: number
  sentiment?: "positive" | "neutral" | "negative"
  status: "pending" | "approved" | "hidden" | "flagged"
}

interface CommentListProps {
  comments: Comment[]
  onReply?: (commentId: string, reply: string) => void
  onModerate?: (commentIds: string[], action: string) => void
  className?: string
}

export function CommentList({
  comments,
  onReply,
  onModerate,
  className,
}: CommentListProps) {
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredComments = comments.filter((comment) => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedComments = [...filteredComments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime()
      case "engagement":
        return (b.likes + b.replies) - (a.likes + a.replies)
      case "vip":
        return (b.author.isVIP ? 1 : 0) - (a.author.isVIP ? 1 : 0)
      default:
        return 0
    }
  })

  const handleSelectComment = (commentId: string) => {
    setSelectedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedComments.length === sortedComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(sortedComments.map(c => c.id))
    }
  }

  const handleReply = (commentId: string) => {
    if (replyText.trim()) {
      onReply?.(commentId, replyText)
      setReplyText("")
      setReplyingTo(null)
    }
  }

  const getSentimentBadge = (sentiment?: string) => {
    if (!sentiment) return null

    const variants = {
      positive: "default",
      neutral: "secondary",
      negative: "destructive",
    } as const

    const colors = {
      positive: "text-green-600",
      neutral: "text-yellow-600",
      negative: "text-red-600",
    }

    return (
      <Badge variant={variants[sentiment]} className="text-xs">
        {sentiment}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "secondary",
      approved: "default",
      hidden: "outline",
      flagged: "destructive",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="text-xs">
        {status}
      </Badge>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {selectedComments.length} selected
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="engagement">Most Engaged</SelectItem>
                <SelectItem value="vip">VIP First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedComments.length > 0 && (
            <div className="flex items-center justify-between p-2 bg-muted rounded">
              <span className="text-sm text-muted-foreground">
                Bulk actions for {selectedComments.length} comments
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onModerate?.(selectedComments, "approve")}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onModerate?.(selectedComments, "hide")}
                >
                  <X className="h-4 w-4 mr-1" />
                  Hide
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onModerate?.(selectedComments, "delete")}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {sortedComments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No comments found
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-2">
              <Checkbox
                checked={selectedComments.length === sortedComments.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm text-muted-foreground">Select all</span>
            </div>

            {sortedComments.map((comment) => (
              <div
                key={comment.id}
                className={cn(
                  "border rounded-lg p-4 space-y-3",
                  selectedComments.includes(comment.id) && "bg-muted/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedComments.includes(comment.id)}
                    onCheckedChange={() => handleSelectComment(comment.id)}
                  />

                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>
                      {comment.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{comment.author.name}</span>
                        {comment.author.isVIP && (
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        )}
                        {comment.author.isVerified && (
                          <UserCheck className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        @{comment.author.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      Replying to: "{comment.postContent.substring(0, 100)}..."
                    </p>

                    <p className="text-sm leading-relaxed mb-3">{comment.content}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getSentimentBadge(comment.sentiment)}
                        {getStatusBadge(comment.status)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {comment.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {comment.replies}
                        </div>
                      </div>
                    </div>

                    {/* Reply Section */}
                    {replyingTo === comment.id && (
                      <div className="mt-3 space-y-2">
                        <Textarea
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleReply(comment.id)}
                            disabled={!replyText.trim()}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setReplyingTo(comment.id)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onModerate?.([comment.id], "approve")}>
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onModerate?.([comment.id], "hide")}>
                        <X className="h-4 w-4 mr-2" />
                        Hide
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onModerate?.([comment.id], "flag")}>
                        <Flag className="h-4 w-4 mr-2" />
                        Flag
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onModerate?.([comment.id], "delete")}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}