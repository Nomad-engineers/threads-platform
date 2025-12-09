'use client'

import { useState, useEffect, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { authApi } from '@/lib/auth'

export interface UserPost {
  id: string
  content: string
  timestamp: string
  media_type?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL'
  media_url?: string
  permalink?: string
  like_count?: number
  reply_count?: number
  repost_count?: number
  quote_count?: number
  share_count?: number
}

export interface PostsState {
  posts: UserPost[]
  isLoading: boolean
  error: string | null
  hasMore: boolean
  after?: string
}

export function useUserPosts() {
  const { toast } = useToast()

  const [state, setState] = useState<PostsState>({
    posts: [],
    isLoading: false,
    error: null,
    hasMore: true,
    after: undefined,
  })

  // State setters
  const setLoading = (isLoading: boolean) => setState(prev => ({ ...prev, isLoading }))
  const setError = (error: string | null) => setState(prev => ({ ...prev, error }))
  const setPosts = (posts: UserPost[]) => setState(prev => ({ ...prev, posts }))
  const setHasMore = (hasMore: boolean) => setState(prev => ({ ...prev, hasMore }))
  const setAfter = (after?: string) => setState(prev => ({ ...prev, after }))

  // Fetch posts
  const fetchPosts = useCallback(
    async (after?: string, append = false) => {
      try {
        setLoading(true)
        setError(null)

        const response = await authApi.getUserPosts(after)

        let newPosts: UserPost[] = []
        let newAfter: string | undefined

        if (response.success && response.data) {
          newPosts = response.data.map((post: any) => ({
            id: post.id,
            content: post.content || post.caption || '',
            timestamp: post.timestamp || post.created_at || new Date().toISOString(),
            media_type: post.media_type,
            media_url: post.media_url,
            permalink: post.permalink,
            like_count: post.like_count,
            reply_count: post.reply_count,
            repost_count: post.repost_count,
            quote_count: post.quote_count,
            share_count: post.share_count,
          }))

          newAfter = response.paging?.cursors?.after
        }

        setState(prev => ({
          ...prev,
          posts: append ? [...prev.posts, ...newPosts] : newPosts,
          after: newAfter,
          hasMore: !!newAfter,
          isLoading: false,
        }))

        return newPosts
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts'
        setError(errorMessage)

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })

        return []
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  // Load more posts (pagination)
  const loadMore = useCallback(() => {
    if (state.hasMore && !state.isLoading) {
      fetchPosts(state.after, true)
    }
  }, [state.hasMore, state.isLoading, state.after, fetchPosts])

  // Delete a post
  const deletePost = useCallback(
    async (postId: string) => {
      try {
        setLoading(true)
        setError(null)

        await authApi.deletePost(postId)

        setState(prev => ({
          ...prev,
          posts: prev.posts.filter(post => post.id !== postId),
        }))

        toast({
          title: 'Success',
          description: 'Post deleted successfully',
        })

        return true
      } catch (error) {
        console.error('Failed to delete post:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete post'
        setError(errorMessage)

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })

        return false
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  // Refresh posts (reset and fetch from start)
  const refresh = useCallback(() => {
    setState(prev => ({
      ...prev,
      posts: [],
      after: undefined,
      hasMore: true,
    }))
    fetchPosts(undefined, false)
  }, [fetchPosts])

  // Initial fetch
  useEffect(() => {
    refresh()
  }, [])

  return {
    ...state,
    fetchPosts,
    loadMore,
    refresh,
    deletePost,
  }
}