/**
 * Threads API Client
 * Comprehensive client for interacting with the Instagram Threads API
 * Based on the official Threads API documentation
 */

import { authStorage } from '@/lib/auth'
import { AUTH_CONFIG } from '@/lib/auth/config'

export interface ThreadsUserProfile {
  id: string
  username: string
  threads_profile_picture_url?: string
  threads_biography?: string
  account_type?: string
  follower_count?: number
  following_count?: number
  is_verified?: boolean
}

export interface ThreadsMediaContainer {
  id: string
  status: 'PENDING' | 'PUBLISHED' | 'FAILED' | 'EXPIRED'
  error_message?: string
}

export interface ThreadsMedia {
  id: string
  media_type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL'
  media_url?: string
  permalink: string
  caption?: string
  thumbnail_url?: string
  timestamp: string
  like_count?: number
  reply_count?: number
  repost_count?: number
  quote_count?: number
  share_count?: number
  insights?: ThreadsInsight[]
}

export interface ThreadsInsight {
  name: string
  period: string
  values: Array<{ value: number }>
  title: string
  description: string
  id: string
}

export interface CreateTextPostParams {
  text: string
  reply_to_id?: string
  reply_control?: 'everyone' | 'accounts_you_follow' | 'mentioned_only' | 'parent_post_author_only' | 'followers_only'
  allowlisted_country_codes?: string[]
  link_attachment?: string
  quote_post_id?: string
  auto_publish_text?: boolean
  topic_tag?: string
  is_spoiler_media?: boolean
}

export interface CreateImagePostParams {
  text?: string
  image_url: string
  alt_text?: string
  reply_to_id?: string
  reply_control?: 'everyone' | 'accounts_you_follow' | 'mentioned_only' | 'parent_post_author_only' | 'followers_only'
  allowlisted_country_codes?: string[]
  link_attachment?: string
  quote_post_id?: string
  is_spoiler_media?: boolean
}

export interface CreateVideoPostParams {
  text?: string
  video_url: string
  alt_text?: string
  reply_to_id?: string
  reply_control?: 'everyone' | 'accounts_you_follow' | 'mentioned_only' | 'parent_post_author_only' | 'followers_only'
  allowlisted_country_codes?: string[]
  link_attachment?: string
  quote_post_id?: string
  is_spoiler_media?: boolean
}

export interface CreateCarouselPostParams {
  children: Array<{
    media_type: 'IMAGE' | 'VIDEO'
    media_url: string
    alt_text?: string
  }>
  text?: string
  reply_to_id?: string
  reply_control?: 'everyone' | 'accounts_you_follow' | 'mentioned_only' | 'parent_post_author_only' | 'followers_only'
  allowlisted_country_codes?: string[]
  link_attachment?: string
  quote_post_id?: string
  is_spoiler_media?: boolean
}

/**
 * Threads API Client Class
 */
export class ThreadsApiClient {
  private baseUrl = 'https://graph.threads.net/v1.0'
  private getAccessToken(): string {
    const token = authStorage.getAccessToken()
    if (!token) {
      throw new Error('No access token available. Please authenticate first.')
    }
    return token
  }

  /**
   * Get the current user's Threads profile
   */
  async getUserProfile(fields: string[] = ['id', 'username', 'threads_profile_picture_url', 'threads_biography', 'account_type']): Promise<ThreadsUserProfile> {
    const accessToken = this.getAccessToken()
    const fieldsParam = fields.join(',')

    const response = await fetch(`${this.baseUrl}/me?fields=${fieldsParam}&access_token=${accessToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Create a media container for a text post
   */
  async createTextPostContainer(userId: string, params: CreateTextPostParams): Promise<ThreadsMediaContainer> {
    const accessToken = this.getAccessToken()

    const body: any = {
      media_type: 'TEXT',
      text: params.text,
      ...params.reply_to_id && { reply_to_id: params.reply_to_id },
      ...params.reply_control && { reply_control: params.reply_control },
      ...params.allowlisted_country_codes && { allowlisted_country_codes: params.allowlisted_country_codes },
      ...params.link_attachment && { link_attachment: params.link_attachment },
      ...params.quote_post_id && { quote_post_id: params.quote_post_id },
      ...params.auto_publish_text !== undefined && { auto_publish_text: params.auto_publish_text },
      ...params.topic_tag && { topic_tag: params.topic_tag },
      ...params.is_spoiler_media !== undefined && { is_spoiler_media: params.is_spoiler_media },
    }

    const response = await fetch(`${this.baseUrl}/${userId}/threads?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create text post container: ${response.status} ${response.statusText}. ${errorText}`)
    }

    return await response.json()
  }

  /**
   * Create a media container for an image post
   */
  async createImagePostContainer(userId: string, params: CreateImagePostParams): Promise<ThreadsMediaContainer> {
    const accessToken = this.getAccessToken()

    const body: any = {
      media_type: 'IMAGE',
      image_url: params.image_url,
      ...params.text && { text: params.text },
      ...params.alt_text && { alt_text: params.alt_text },
      ...params.reply_to_id && { reply_to_id: params.reply_to_id },
      ...params.reply_control && { reply_control: params.reply_control },
      ...params.allowlisted_country_codes && { allowlisted_country_codes: params.allowlisted_country_codes },
      ...params.link_attachment && { link_attachment: params.link_attachment },
      ...params.quote_post_id && { quote_post_id: params.quote_post_id },
      ...params.is_spoiler_media !== undefined && { is_spoiler_media: params.is_spoiler_media },
    }

    const response = await fetch(`${this.baseUrl}/${userId}/threads?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create image post container: ${response.status} ${response.statusText}. ${errorText}`)
    }

    return await response.json()
  }

  /**
   * Create a media container for a video post
   */
  async createVideoPostContainer(userId: string, params: CreateVideoPostParams): Promise<ThreadsMediaContainer> {
    const accessToken = this.getAccessToken()

    const body: any = {
      media_type: 'VIDEO',
      video_url: params.video_url,
      ...params.text && { text: params.text },
      ...params.alt_text && { alt_text: params.alt_text },
      ...params.reply_to_id && { reply_to_id: params.reply_to_id },
      ...params.reply_control && { reply_control: params.reply_control },
      ...params.allowlisted_country_codes && { allowlisted_country_codes: params.allowlisted_country_codes },
      ...params.link_attachment && { link_attachment: params.link_attachment },
      ...params.quote_post_id && { quote_post_id: params.quote_post_id },
      ...params.is_spoiler_media !== undefined && { is_spoiler_media: params.is_spoiler_media },
    }

    const response = await fetch(`${this.baseUrl}/${userId}/threads?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create video post container: ${response.status} ${response.statusText}. ${errorText}`)
    }

    return await response.json()
  }

  /**
   * Create a media container for a carousel post
   */
  async createCarouselPostContainer(userId: string, params: CreateCarouselPostParams): Promise<ThreadsMediaContainer> {
    const accessToken = this.getAccessToken()

    const body: any = {
      media_type: 'CAROUSEL',
      children: params.children,
      ...params.text && { text: params.text },
      ...params.reply_to_id && { reply_to_id: params.reply_to_id },
      ...params.reply_control && { reply_control: params.reply_control },
      ...params.allowlisted_country_codes && { allowlisted_country_codes: params.allowlisted_country_codes },
      ...params.link_attachment && { link_attachment: params.link_attachment },
      ...params.quote_post_id && { quote_post_id: params.quote_post_id },
      ...params.is_spoiler_media !== undefined && { is_spoiler_media: params.is_spoiler_media },
    }

    const response = await fetch(`${this.baseUrl}/${userId}/threads?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create carousel post container: ${response.status} ${response.statusText}. ${errorText}`)
    }

    return await response.json()
  }

  /**
   * Publish a media container
   */
  async publishMediaContainer(userId: string, creationId: string): Promise<{ id: string }> {
    const accessToken = this.getAccessToken()

    const response = await fetch(`${this.baseUrl}/${userId}/threads_publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creation_id: creationId,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to publish media container: ${response.status} ${response.statusText}. ${errorText}`)
    }

    return await response.json()
  }

  /**
   * Get the status of a media container
   */
  async getMediaContainerStatus(containerId: string): Promise<ThreadsMediaContainer> {
    const accessToken = this.getAccessToken()

    const response = await fetch(`${this.baseUrl}/${containerId}?fields=status,error_message&access_token=${accessToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get media container status: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Get user's media posts
   */
  async getUserMedia(userId: string, fields: string[] = ['id', 'media_type', 'media_url', 'permalink', 'caption', 'timestamp'], limit: number = 25, since?: string): Promise<{ data: ThreadsMedia[], paging?: any }> {
    const accessToken = this.getAccessToken()
    const fieldsParam = fields.join(',')

    let url = `${this.baseUrl}/${userId}/threads?fields=${fieldsParam}&limit=${limit}&access_token=${accessToken}`
    if (since) {
      url += `&since=${since}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get user media: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Get media insights
   */
  async getMediaInsights(mediaId: string, metrics: string[] = ['views', 'likes', 'replies', 'reposts', 'quotes', 'shares']): Promise<ThreadsInsight[]> {
    const accessToken = this.getAccessToken()
    const metricsParam = metrics.join(',')

    const response = await fetch(`${this.baseUrl}/${mediaId}/insights?metric=${metricsParam}&access_token=${accessToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get media insights: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || []
  }

  /**
   * Get user insights (account-level metrics)
   */
  async getUserInsights(userId: string, metrics: string[] = ['views', 'likes', 'replies', 'reposts', 'quotes', 'shares'], since?: string, until?: string): Promise<ThreadsInsight[]> {
    const accessToken = this.getAccessToken()
    const metricsParam = metrics.join(',')

    let url = `${this.baseUrl}/${userId}/threads_insights?metric=${metricsParam}&access_token=${accessToken}`
    if (since) {
      url += `&since=${since}`
    }
    if (until) {
      url += `&until=${until}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get user insights: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.data || []
  }

  /**
   * Delete a media post
   */
  async deleteMedia(mediaId: string): Promise<{ success: boolean }> {
    const accessToken = this.getAccessToken()

    const response = await fetch(`${this.baseUrl}/${mediaId}?access_token=${accessToken}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmation: 'I understand this action is irreversible.'
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to delete media: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Repost a media post
   */
  async repostMedia(mediaId: string, message?: string): Promise<{ id: string }> {
    const accessToken = this.getAccessToken()

    const body: any = {}
    if (message) {
      body.message = message
    }

    const response = await fetch(`${this.baseUrl}/${mediaId}/repost?access_token=${accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Failed to repost media: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  }
}

// Export singleton instance
export const threadsApi = new ThreadsApiClient()

/**
 * React hook for using the Threads API
 */
export function useThreadsApi() {
  return {
    api: threadsApi,
    // Helper methods for common operations
    createTextPost: async (userId: string, text: string, options?: Partial<CreateTextPostParams>) => {
      const container = await threadsApi.createTextPostContainer(userId, { text, ...options })

      // For text posts with auto_publish_text: true, the container is already published
      if (options?.auto_publish_text) {
        return { id: container.id, status: 'PUBLISHED' }
      }

      // Wait a short period for processing (recommended by Threads API)
      await new Promise(resolve => setTimeout(resolve, 30000))

      const published = await threadsApi.publishMediaContainer(userId, container.id)
      return { id: published.id, status: 'PUBLISHED', containerId: container.id }
    },

    createImagePost: async (userId: string, imageUrl: string, options?: Partial<CreateImagePostParams>) => {
      const container = await threadsApi.createImagePostContainer(userId, { image_url: imageUrl, ...options })

      // Wait for processing (recommended by Threads API)
      await new Promise(resolve => setTimeout(resolve, 30000))

      const published = await threadsApi.publishMediaContainer(userId, container.id)
      return { id: published.id, status: 'PUBLISHED', containerId: container.id }
    },

    createVideoPost: async (userId: string, videoUrl: string, options?: Partial<CreateVideoPostParams>) => {
      const container = await threadsApi.createVideoPostContainer(userId, { video_url: videoUrl, ...options })

      // Wait for processing (recommended by Threads API)
      await new Promise(resolve => setTimeout(resolve, 30000))

      const published = await threadsApi.publishMediaContainer(userId, container.id)
      return { id: published.id, status: 'PUBLISHED', containerId: container.id }
    },

    getPostAnalytics: async (mediaId: string) => {
      return await threadsApi.getMediaInsights(mediaId)
    },

    getAccountAnalytics: async (userId: string, timeRange?: { since?: string; until?: string }) => {
      return await threadsApi.getUserInsights(userId, undefined, timeRange?.since, timeRange?.until)
    },
  }
}