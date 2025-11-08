"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  CheckSquare,
  Trash2,
  Reply,
  Download,
  Archive,
  Flag,
  Tag,
  MessageSquare,
} from "lucide-react"

interface BulkActionsProps {
  selectedItems: string[]
  onApprove?: (itemIds: string[]) => void
  onDelete?: (itemIds: string[]) => void
  onReply?: (itemIds: string[], message: string) => void
  onExport?: (itemIds: string[], format: string) => void
  onArchive?: (itemIds: string[]) => void
  onFlag?: (itemIds: string[], reason: string) => void
  onTag?: (itemIds: string[], tags: string[]) => void
  className?: string
  itemType: "posts" | "comments" | "messages"
}

export function BulkActions({
  selectedItems,
  onApprove,
  onDelete,
  onReply,
  onExport,
  onArchive,
  onFlag,
  onTag,
  className,
  itemType,
}: BulkActionsProps) {
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("csv")
  const [flagDialogOpen, setFlagDialogOpen] = useState(false)
  const [flagReason, setFlagReason] = useState("")
  const [tagDialogOpen, setTagDialogOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  if (selectedItems.length === 0) {
    return null
  }

  const handleReply = () => {
    if (replyMessage.trim()) {
      onReply?.(selectedItems, replyMessage)
      setReplyMessage("")
      setReplyDialogOpen(false)
    }
  }

  const handleExport = () => {
    onExport?.(selectedItems, exportFormat)
    setExportDialogOpen(false)
  }

  const handleFlag = () => {
    if (flagReason.trim()) {
      onFlag?.(selectedItems, flagReason)
      setFlagReason("")
      setFlagDialogOpen(false)
    }
  }

  const handleTag = () => {
    if (tags.length > 0) {
      onTag?.(selectedItems, tags)
      setTags([])
      setTagDialogOpen(false)
    }
  }

  const getItemLabel = () => {
    switch (itemType) {
      case "posts":
        return "posts"
      case "comments":
        return "comments"
      case "messages":
        return "messages"
      default:
        return "items"
    }
  }

  return (
    <div className={cn("flex items-center gap-2 p-3 bg-muted rounded-lg", className)}>
      <div className="flex items-center gap-2">
        <CheckSquare className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {selectedItems.length} {getItemLabel()} selected
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* Approve Action */}
        {itemType === "comments" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApprove?.(selectedItems)}
          >
            <CheckSquare className="h-4 w-4 mr-1" />
            Approve
          </Button>
        )}

        {/* Reply Action */}
        {itemType === "comments" && (
          <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Reply className="h-4 w-4 mr-1" />
                Reply
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Reply</DialogTitle>
                <DialogDescription>
                  Send a reply to all selected comments
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reply-message">Reply message</Label>
                  <Textarea
                    id="reply-message"
                    placeholder="Type your reply here..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                  Send Reply
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Tag Action */}
        <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Tag className="h-4 w-4 mr-1" />
              Tag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Tags</DialogTitle>
              <DialogDescription>
                Add tags to selected {getItemLabel()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="urgent, vip, review-needed"
                  onChange={(e) => setTags(e.target.value.split(",").map(t => t.trim()).filter(t => t))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTagDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleTag} disabled={tags.length === 0}>
                Add Tags
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Export Action */}
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export {getItemLabel()}</DialogTitle>
              <DialogDescription>
                Export selected {getItemLabel()} in your preferred format
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="export-format">Export format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport}>
                Export
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Archive Action */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onArchive?.(selectedItems)}
        >
          <Archive className="h-4 w-4 mr-1" />
          Archive
        </Button>

        {/* Flag Action */}
        {itemType === "comments" && (
          <Dialog open={flagDialogOpen} onOpenChange={setFlagDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4 mr-1" />
                Flag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Flag Comments</DialogTitle>
                <DialogDescription>
                  Flag selected comments for review
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="flag-reason">Reason for flagging</Label>
                  <Textarea
                    id="flag-reason"
                    placeholder="Describe why these comments need to be reviewed..."
                    value={flagReason}
                    onChange={(e) => setFlagReason(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setFlagDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleFlag} disabled={!flagReason.trim()}>
                  Flag Comments
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Action */}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete?.(selectedItems)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  )
}