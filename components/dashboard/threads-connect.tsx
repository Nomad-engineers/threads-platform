/**
 * Threads Connect Component
 * Dashboard component for connecting and managing Threads API integration
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import {
  ThreadsIcon,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Users,
  TrendingUp,
  Link,
  Image,
  Video,
  FileText,
  Grid3x3
} from 'lucide-react'
import { useThreadsAuth } from '@/hooks/use-threads-auth'
import { useThreadsProfile } from '@/hooks/use-threads-api'
import { useThreadsMedia } from '@/hooks/use-threads-api'
import { useThreadsAnalytics } from '@/hooks/use-threads-api'

export function ThreadsConnect() {
  const { user, isAuthenticated, handleAuthWithThreads, logout } = useThreadsAuth()
  const { profile, loading: profileLoading } = useThreadsProfile()
  const { media, loading: mediaLoading } = useThreadsMedia()
  const { analytics, loading: analyticsLoading } = useThreadsAnalytics()

  const getInitials = (name?: string, username?: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }
    if (username) {
      return username.slice(0, 2).toUpperCase()
    }
    return 'TH'
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black">
              <ThreadsIcon className="h-6 w-6 text-white" />
            </div>
            <CardTitle>Connect to Threads</CardTitle>
            <CardDescription>
              Authenticate with your Threads account to access analytics and publishing tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleAuthWithThreads}
              className="w-full"
              size="lg"
            >
              <ThreadsIcon className="mr-2 h-4 w-4" />
              Connect with Threads
            </Button>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Post and schedule content</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>View detailed analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Manage replies and engagement</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile?.threads_profile_picture_url || user?.picUrl || undefined} />
            <AvatarFallback className="bg-black text-white text-lg">
              {getInitials(profile?.username, user?.username)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ThreadsIcon className="h-6 w-6" />
              {profile?.username || user?.username}
              {profile?.is_verified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              {profile?.threads_biography || user?.bio || 'Threads Account Connected'}
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={logout}>
          Disconnect
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalPosts || 0}</div>
                <p className="text-xs text-muted-foreground">Published content</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalLikes?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">Engagement received</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalReplies?.toLocaleString() || 0}</div>
                <p className="text-xs text-muted-foreground">Conversation started</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.averageEngagement || 0}</div>
                <p className="text-xs text-muted-foreground">Per post average</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Type</label>
                  <p className="font-semibold">{profile?.account_type || 'Personal'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Threads ID</label>
                  <p className="font-semibold">{profile?.id || user?.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <p className="font-semibold">@{profile?.username || user?.username}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest Threads content</CardDescription>
            </CardHeader>
            <CardContent>
              {mediaLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : media.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">Start creating content to see it here</p>
                  <Button>Create Your First Post</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {media.map((post) => (
                    <div key={post.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {post.media_type === 'TEXT' && <FileText className="h-3 w-3 mr-1" />}
                            {post.media_type === 'IMAGE' && <Image className="h-3 w-3 mr-1" />}
                            {post.media_type === 'VIDEO' && <Video className="h-3 w-3 mr-1" />}
                            {post.media_type === 'CAROUSEL' && <Grid3x3 className="h-3 w-3 mr-1" />}
                            {post.media_type.toLowerCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(post.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{post.caption || 'No caption'}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.like_count || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {post.reply_count || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {post.repost_count || 0}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                          <Link className="h-3 w-3 mr-1" />
                          View
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your Threads performance overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Engagement</span>
                    <span className="text-sm font-bold">{analytics?.totalLikes + analytics?.totalReplies + analytics?.totalReposts + analytics?.totalShares || 0}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likes</span>
                    <span>{analytics?.totalLikes?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Replies</span>
                    <span>{analytics?.totalReplies?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reposts</span>
                    <span>{analytics?.totalReposts?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shares</span>
                    <span>{analytics?.totalShares?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
                <CardDescription>How your audience interacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Likes</span>
                        <span className="text-sm text-muted-foreground">{analytics?.totalLikes || 0}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Replies</span>
                        <span className="text-sm text-muted-foreground">{analytics?.totalReplies || 0}</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Share2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Reposts</span>
                        <span className="text-sm text-muted-foreground">{analytics?.totalReposts || 0}</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Pro Tip</AlertTitle>
            <AlertDescription>
              Posts with images and videos typically receive 2-3x more engagement than text-only posts.
              Try mixing different content types to maximize your reach.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Publish Tab */}
        <TabsContent value="publish" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Publish</CardTitle>
              <CardDescription>Create and publish content directly to Threads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Button className="h-24 flex-col gap-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span>Text Post</span>
                </Button>
                <Button className="h-24 flex-col gap-2" variant="outline">
                  <Image className="h-6 w-6" />
                  <span>Image Post</span>
                </Button>
                <Button className="h-24 flex-col gap-2" variant="outline">
                  <Grid3x3 className="h-6 w-6" />
                  <span>Carousel</span>
                </Button>
              </div>
              <Separator />
              <div className="text-center text-sm text-muted-foreground">
                Advanced publishing features coming soon, including scheduling and analytics integration
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}