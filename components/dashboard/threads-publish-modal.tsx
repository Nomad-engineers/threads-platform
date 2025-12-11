/**
 * Threads Publish Modal Component
 * Modal dialog for creating and publishing content to Threads
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Image,
  AlertCircle,
  CheckCircle,
  Plus
} from 'lucide-react'
import { useThreadsPublish } from '@/hooks/use-threads-api'
import { useThreadsAuth } from '@/hooks/use-threads-auth'

interface ThreadsPublishModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThreadsPublishModal({ open, onOpenChange }: ThreadsPublishModalProps) {
  const { publishTextPost, publishImagePost, publishing, error } = useThreadsPublish()
  const { user } = useThreadsAuth()
  const [activeTab, setActiveTab] = useState('text')
  const [showSuccess, setShowSuccess] = useState(false)

  // Text post state
  const [text, setText] = useState('')
  const [replyControl, setReplyControl] = useState('everyone')
  const [linkAttachment, setLinkAttachment] = useState('')
  const [topicTag, setTopicTag] = useState('')

  // Image post state
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [altText, setAltText] = useState('')

  const resetForm = () => {
    setText('')
    setReplyControl('everyone')
    setLinkAttachment('')
    setTopicTag('')
    setImageUrl('')
    setCaption('')
    setAltText('')
    setShowSuccess(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm()
    }
    onOpenChange(newOpen)
  }

  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      handleOpenChange(false)
    }, 2000)
  }

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      await publishTextPost(text, {
        reply_control: replyControl as any,
        link_attachment: linkAttachment || undefined,
        topic_tag: topicTag || undefined,
      })
      resetForm()
      handleSuccess()
    } catch (error) {
      console.error('Failed to publish text post:', error)
    }
  }

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageUrl.trim()) return

    try {
      await publishImagePost(imageUrl, caption, {
        alt_text: altText || undefined,
      })
      resetForm()
      handleSuccess()
    } catch (error) {
      console.error('Failed to publish image post:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Post
          </DialogTitle>
          <DialogDescription>
            Publish content directly to your Threads account
          </DialogDescription>
        </DialogHeader>

        {showSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Your post has been published successfully!
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Text Post
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image Post
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-4">
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Text Content *</Label>
                <Textarea
                  id="text"
                  placeholder="What's on your mind?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={500}
                  rows={4}
                  required
                />
                <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                  {text.length}/500 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-attachment">Link Attachment (Optional)</Label>
                <Input
                  id="link-attachment"
                  type="url"
                  placeholder="https://example.com"
                  value={linkAttachment}
                  onChange={(e) => setLinkAttachment(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic-tag">Topic Tag (Optional)</Label>
                <Input
                  id="topic-tag"
                  placeholder="technology"
                  value={topicTag}
                  onChange={(e) => setTopicTag(e.target.value)}
                  maxLength={30}
                />
              </div>

              <div className="space-y-2">
                <Label>Who can reply?</Label>
                <Select value={replyControl} onValueChange={setReplyControl}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="accounts_you_follow">Accounts you follow</SelectItem>
                    <SelectItem value="mentioned_only">Only mentioned accounts</SelectItem>
                    <SelectItem value="parent_post_author_only">Only author of parent post</SelectItem>
                    <SelectItem value="followers_only">Only followers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={publishing || !text.trim()}
                className="w-full"
              >
                {publishing ? 'Publishing...' : 'Publish Text Post'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="image" className="mt-4">
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL *</Label>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption">Caption (Optional)</Label>
                <Textarea
                  id="caption"
                  placeholder="Write a caption for your image"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={500}
                  rows={3}
                />
                <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                  {caption.length}/500 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt-text">Alt Text (Optional)</Label>
                <Textarea
                  id="alt-text"
                  placeholder="Describe your image for accessibility"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  maxLength={1000}
                  rows={2}
                />
                <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                  {altText.length}/1000 characters
                </div>
              </div>

              <Button
                type="submit"
                disabled={publishing || !imageUrl.trim()}
                className="w-full"
              >
                {publishing ? 'Publishing...' : 'Publish Image Post'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2 text-sm">Publishing Guidelines</h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Image posts require a public URL to the image file</li>
            <li>• Supported formats: JPEG, PNG, GIF</li>
            <li>• Maximum image size: 10MB</li>
            <li>• Processing may take up to 30 seconds for media posts</li>
            <li>• All posts are subject to Threads' content policies</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}