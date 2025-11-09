"use client"

import { useState } from "react"
import { PostCard } from "@/components/content/post-card"
import { PostScheduler } from "@/components/content/post-scheduler"
import { BulkActions } from "@/components/content/bulk-actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, Filter, Calendar, FileText } from "lucide-react"

// Sample posts data
const samplePosts = [
  {
    id: "1",
    content: "Just shipped a major update to our analytics dashboard! 🚀\n\nNew features:\n- Real-time engagement tracking\n- Advanced filtering options\n- Export capabilities\n\nCheck it out and let me know what you think!",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    metrics: {
      likes: 234,
      comments: 45,
      reposts: 12,
      views: 5678,
    },
    status: "published" as const,
  },
  {
    id: "2",
    content: "Quick tip: The best time to post on Threads is usually between 9-11 AM on weekdays. We've seen 3x better engagement during these hours! ⏰",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    metrics: {
      likes: 567,
      comments: 89,
      reposts: 34,
      views: 12345,
    },
    status: "published" as const,
  },
  {
    id: "3",
    content: "We're hiring! 🎉 Looking for a talented frontend developer to join our team. Remote-first position with great benefits. DM me for details!",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    metrics: {
      likes: 123,
      comments: 23,
      reposts: 8,
      views: 3456,
    },
    status: "published" as const,
  },
  {
    id: "4",
    content: "Draft: Exploring the future of social media analytics and how AI is changing the game. What are your thoughts?",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    metrics: {
      likes: 0,
      comments: 0,
      reposts: 0,
      views: 0,
    },
    status: "draft" as const,
  },
  {
    id: "5",
    content: "Announcing our next webinar! Join us next Tuesday as we discuss advanced content strategies for 2024.",
    author: {
      name: "John Doe",
      username: "johndoe",
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    metrics: {
      likes: 0,
      comments: 0,
      reposts: 0,
      views: 0,
    },
    status: "scheduled" as const,
    scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
]

export default function ContentPage() {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showScheduler, setShowScheduler] = useState(false)

  const filteredPosts = samplePosts.filter((post) => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime()
      case "engagement":
        return (b.metrics.likes + b.metrics.comments) - (a.metrics.likes + a.metrics.comments)
      default:
        return 0
    }
  })

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSchedulePost = (post: { content: string; scheduledFor: Date; platform?: string }) => {
    console.log("Scheduling post:", post)
    setShowScheduler(false)
  }

  const handleSaveDraft = (post: { content: string; platform?: string }) => {
    console.log("Saving draft:", post)
  }

  const postsByStatus = {
    all: sortedPosts,
    published: sortedPosts.filter(p => p.status === "published"),
    scheduled: sortedPosts.filter(p => p.status === "scheduled"),
    drafts: sortedPosts.filter(p => p.status === "draft"),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">
            Create, schedule, and manage your Threads content.
          </p>
        </div>
        <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <PostScheduler
              onSchedule={handleSchedulePost}
              onSaveDraft={handleSaveDraft}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="drafts">Drafts</SelectItem>
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
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-2">
            <FileText className="h-3 w-3" />
            {filteredPosts.length} posts
          </Badge>
          {selectedPosts.length > 0 && (
            <Badge variant="default">
              {selectedPosts.length} selected
            </Badge>
          )}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <BulkActions
          selectedItems={selectedPosts}
          onDelete={(ids) => console.log("Delete posts:", ids)}
          onExport={(ids, format) => console.log("Export posts:", ids, format)}
          onArchive={(ids) => console.log("Archive posts:", ids)}
          itemType="posts"
        />
      )}

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled
            <Badge variant="secondary" className="ml-2">
              {postsByStatus.scheduled.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts
            <Badge variant="outline" className="ml-2">
              {postsByStatus.drafts.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {postsByStatus.all.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by creating your first post.
                </p>
                <Button onClick={() => setShowScheduler(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {postsByStatus.all.map((post) => (
                <div
                  key={post.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectPost(post.id)}
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4">
            {postsByStatus.published.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                showActions={true}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {postsByStatus.scheduled.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No scheduled posts</h3>
                <p className="text-muted-foreground mb-4">
                  Schedule posts to be published automatically.
                </p>
                <Button onClick={() => setShowScheduler(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {postsByStatus.scheduled.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {postsByStatus.drafts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No drafts</h3>
                <p className="text-muted-foreground mb-4">
                  Drafts are saved here until you're ready to publish.
                </p>
                <Button onClick={() => setShowScheduler(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Draft
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {postsByStatus.drafts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}