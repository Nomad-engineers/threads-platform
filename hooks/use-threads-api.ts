/**
 * Threads API React Hooks
 * Custom hooks for interacting with the Threads API in React components
 */

import { useState, useCallback, useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { threadsApi, type ThreadsUserProfile, type ThreadsMedia, type ThreadsInsight } from '@/lib/api/threads-api'
import { useThreadsAuth } from './use-threads-auth'

export function useThreadsProfile() {
  const { user, isAuthenticated } = useThreadsAuth()
  const { toast } = useToast()
  const [profile, setProfile] = useState<ThreadsUserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      const profileData = await threadsApi.getUserProfile()
      setProfile(profileData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile'
      setError(errorMessage)
      toast({
        title: 'Profile Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user?.id, toast])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile()
    }
  }, [isAuthenticated, fetchProfile])

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  }
}

export function useThreadsMedia() {
  const { user, isAuthenticated } = useThreadsAuth()
  const { toast } = useToast()
  const [media, setMedia] = useState<ThreadsMedia[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = useCallback(async (limit: number = 25, since?: string) => {
    if (!isAuthenticated || !user?.id) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await threadsApi.getUserMedia(user.id.toString(), ['id', 'media_type', 'media_url', 'permalink', 'caption', 'timestamp'], limit, since)
      setMedia(response.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch media'
      setError(errorMessage)
      toast({
        title: 'Media Error',
        description: errorMessage,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user?.id, toast])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMedia()
    }
  }, [isAuthenticated, fetchMedia])

  return {
    media,
    loading,
    error,
    refetch: fetchMedia,
  }
}

export function useThreadsInsights() {
  const { toast } = useToast()
  const [insights, setInsights] = useState<ThreadsInsight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMediaInsights = useCallback(async (mediaId: string, metrics?: string[]) => {
    try {
      setLoading(true)
      setError(null)
      const insightsData = await threadsApi.getMediaInsights(mediaId, metrics)
      setInsights(insightsData)
      return insightsData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch insights'
      setError(errorMessage)
      toast({
        title: 'Insights Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return []
    } finally {
      setLoading(false)
    }
  }, [toast])

  const fetchUserInsights = useCallback(async (userId: string, metrics?: string[], timeRange?: { since?: string; until?: string }) => {
    try {
      setLoading(true)
      setError(null)
      const insightsData = await threadsApi.getUserInsights(userId, metrics, timeRange?.since, timeRange?.until)
      setInsights(insightsData)
      return insightsData
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user insights'
      setError(errorMessage)
      toast({
        title: 'Insights Error',
        description: errorMessage,
        variant: 'destructive',
      })
      return []
    } finally {
      setLoading(false)
    }
  }, [toast])

  return {
    insights,
    loading,
    error,
    fetchMediaInsights,
    fetchUserInsights,
  }
}

export function useThreadsPublish() {
  const { user, isAuthenticated } = useThreadsAuth()
  const { toast } = useToast()
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const publishTextPost = useCallback(async (text: string, options?: {
    reply_to_id?: string
    reply_control?: string
    link_attachment?: string
    quote_post_id?: string
    topic_tag?: string
  }) => {
    if (!isAuthenticated || !user?.id) {
      throw new Error('User not authenticated')
    }

    try {
      setPublishing(true)
      setError(null)

      // Create media container
      const container = await threadsApi.createTextPostContainer(user.id.toString(), {
        text,
        ...options,
      })

      // For text posts, we can use auto_publish_text for immediate publishing
      if (options?.reply_to_id) {
        // For replies, wait and then publish
        await new Promise(resolve => setTimeout(resolve, 30000))
        const published = await threadsApi.publishMediaContainer(user.id.toString(), container.id)

        toast({
          title: 'Reply Published!',
          description: 'Your reply has been successfully published.',
        })

        return { id: published.id, containerId: container.id }
      } else {
        // For new posts, create with auto_publish_text
        const containerWithAutoPublish = await threadsApi.createTextPostContainer(user.id.toString(), {
          text,
          auto_publish_text: true,
          ...options,
        })

        toast({
          title: 'Post Published!',
          description: 'Your post has been successfully published.',
        })

        return { id: containerWithAutoPublish.id, containerId: containerWithAutoPublish.id }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish post'
      setError(errorMessage)
      toast({
        title: 'Publish Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    } finally {
      setPublishing(false)
    }
  }, [isAuthenticated, user?.id, toast])

  const publishImagePost = useCallback(async (imageUrl: string, caption?: string, options?: {
    alt_text?: string
    reply_to_id?: string
    reply_control?: string
    link_attachment?: string
  }) => {
    if (!isAuthenticated || !user?.id) {
      throw new Error('User not authenticated')
    }

    try {
      setPublishing(true)
      setError(null)

      // Create media container
      const container = await threadsApi.createImagePostContainer(user.id.toString(), {
        image_url: imageUrl,
        text: caption,
        ...options,
      })

      // Wait for processing (recommended by Threads API)
      toast({
        title: 'Processing Image',
        description: 'Your image is being processed. This may take a moment...',
      })

      await new Promise(resolve => setTimeout(resolve, 30000))

      // Check container status
      const status = await threadsApi.getMediaContainerStatus(container.id)
      if (status.status === 'FAILED') {
        throw new Error(status.error_message || 'Failed to process image')
      }

      // Publish the media
      const published = await threadsApi.publishMediaContainer(user.id.toString(), container.id)

      toast({
        title: 'Image Published!',
        description: 'Your image has been successfully published.',
      })

      return { id: published.id, containerId: container.id }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish image'
      setError(errorMessage)
      toast({
        title: 'Publish Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    } finally {
      setPublishing(false)
    }
  }, [isAuthenticated, user?.id, toast])

  const deletePost = useCallback(async (mediaId: string) => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated')
    }

    try {
      setPublishing(true)
      setError(null)

      await threadsApi.deleteMedia(mediaId)

      toast({
        title: 'Post Deleted',
        description: 'Your post has been successfully deleted.',
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post'
      setError(errorMessage)
      toast({
        title: 'Delete Error',
        description: errorMessage,
        variant: 'destructive',
      })
      throw err
    } finally {
      setPublishing(false)
    }
  }, [isAuthenticated, toast])

  return {
    publishing,
    error,
    publishTextPost,
    publishImagePost,
    deletePost,
  }
}

export function useThreadsAnalytics() {
  const { user, isAuthenticated } = useThreadsAuth()
  const [analytics, setAnalytics] = useState<{
    totalPosts: number
    totalLikes: number
    totalReplies: number
    totalReposts: number
    totalShares: number
    averageEngagement: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = useCallback(async (timeRange?: { since?: string; until?: string }) => {
    if (!isAuthenticated || !user?.id) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Fetch user's media and insights
      const mediaResponse = await threadsApi.getUserMedia(
        user.id.toString(),
        ['id', 'timestamp'],
        100, // Get more posts for better analytics
        timeRange?.since
      )

      if (!mediaResponse.data || mediaResponse.data.length === 0) {
        setAnalytics({
          totalPosts: 0,
          totalLikes: 0,
          totalReplies: 0,
          totalReposts: 0,
          totalShares: 0,
          averageEngagement: 0,
        })
        return
      }

      // Fetch insights for each post (in parallel for efficiency)
      const insightsPromises = mediaResponse.data.map(media =>
        threadsApi.getMediaInsights(media.id, ['likes', 'replies', 'reposts', 'shares', 'quotes'])
          .catch(() => []) // Handle individual post errors gracefully
      )

      const allInsights = await Promise.all(insightsPromises)

      // Aggregate metrics
      let totalLikes = 0
      let totalReplies = 0
      let totalReposts = 0
      let totalShares = 0

      allInsights.forEach(postInsights => {
        postInsights.forEach(insight => {
          switch (insight.name) {
            case 'likes':
              totalLikes += insight.values[0]?.value || 0
              break
            case 'replies':
              totalReplies += insight.values[0]?.value || 0
              break
            case 'reposts':
              totalReposts += insight.values[0]?.value || 0
              break
            case 'shares':
            case 'quotes':
              totalShares += insight.values[0]?.value || 0
              break
          }
        })
      })

      const totalPosts = mediaResponse.data.length
      const totalEngagement = totalLikes + totalReplies + totalReposts + totalShares
      const averageEngagement = totalPosts > 0 ? Math.round(totalEngagement / totalPosts) : 0

      setAnalytics({
        totalPosts,
        totalLikes,
        totalReplies,
        totalReposts,
        totalShares,
        averageEngagement,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics'
      setError(errorMessage)
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, user?.id])

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics()
    }
  }, [isAuthenticated, fetchAnalytics])

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics,
  }
}