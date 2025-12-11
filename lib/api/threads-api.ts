/**
 * Threads API Client
 * A comprehensive client for interacting with the Instagram Threads API
 */

// Threads API Types
export interface ThreadsUserProfile {
  id: string
  username: string
  account_type: string
  media_count: number
  threads_count: number
  followers_count: number
  following_count: number
  biography?: string
  profile_picture_url?: string
  website?: string
  verified?: boolean
  newly_created?: boolean
  rating?: string
  reply_audience?: string
}

export interface ThreadsMedia {
  id: string
  media_product_type: string
  media_type: string
  media_url: string
  permalink: string
  owner: {
    id: string
    username: string
  }
  username: string
  text?: string
  timestamp: string
  caption?: string
  is_quote_post?: boolean
  quote_post?: {
    id: string
    username: string
    text?: string
  }
  thumbnail_url?: string
  children?: {
    data: Array<{
      media_type: string
      media_url: string
      id: string
    }>
  }
  status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'DELETED'
  reply_count?: number
  like_count?: number
  repost_count?: number
  quote_count?: number
  share_count?: number
}

export interface ThreadsInsight {
  id: string
  name: string
  values: Array<{
    value: number
    end_time?: string
  }>
  period?: string
  description?: string
  title?: string
}

export interface TextPostOptions {
  text: string
  reply_to_id?: string
  reply_control?: 'everyone' | 'accounts_you_follow' | 'mentioned'
  link_attachment?: string
  quote_post_id?: string
  topic_tag?: string
  auto_publish_text?: boolean
}

export interface ImagePostOptions {
  image_url: string
  text?: string
  alt_text?: string
  reply_to_id?: string
  reply_control?: 'everyone' | 'accounts_you_follow' | 'mentioned'
  link_attachment?: string
}

export interface MediaContainerResponse {
  id: string
  media_type: string
  media_status: string
  status?: 'EXPIRED' | 'PUBLISHED' | 'FAILED' | 'PUBLISHED_BUT_RATE_LIMITED'
  error_message?: string
}

export interface MediaPublishResponse {
  id: string
  media_type: string
  media_status: string
  permalink?: string
}

export interface MediaListResponse {
  data: ThreadsMedia[]
  paging?: {
    cursors?: {
      before?: string
      after?: string
    }
    next?: string
    previous?: string
  }
}

// Threads API Client Class
export class ThreadsApiClient {
  private baseUrl: string
  private accessToken: string | null = null

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001'

    // Try to get access token from localStorage if in browser
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('threads_access_token')
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    }

    // Add authorization if we have an access token
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Threads API Error: ${response.status} ${response.statusText}\n${errorText}`
      )
    }

    return response.json()
  }

  // Authentication methods
  setAccessToken(token: string): void {
    this.accessToken = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('threads_access_token', token)
    }
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  clearAccessToken(): void {
    this.accessToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('threads_access_token')
    }
  }

  // Profile methods
  async getUserProfile(): Promise<ThreadsUserProfile> {
    return this.makeRequest<ThreadsUserProfile>('/api/threads/profile')
  }

  // Media methods
  async getUserMedia(
    userId: string,
    fields: string[] = ['id', 'media_type', 'media_url', 'permalink', 'caption', 'timestamp'],
    limit: number = 25,
    since?: string
  ): Promise<MediaListResponse> {
    const params = new URLSearchParams({
      fields: fields.join(','),
      limit: limit.toString(),
    })

    if (since) {
      params.append('since', since)
    }

    return this.makeRequest<MediaListResponse>(`/api/threads/media?${params}`)
  }

  async getMediaById(mediaId: string): Promise<ThreadsMedia> {
    return this.makeRequest<ThreadsMedia>(`/api/threads/media/${mediaId}`)
  }

  async deleteMedia(mediaId: string): Promise<void> {
    return this.makeRequest<void>(`/api/threads/media/${mediaId}`, {
      method: 'DELETE',
    })
  }

  // Publishing methods
  async createTextPostContainer(
    userId: string,
    options: TextPostOptions
  ): Promise<MediaContainerResponse> {
    return this.makeRequest<MediaContainerResponse>('/api/threads/publish', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        media_type: 'TEXT_POST',
        text: options.text,
        reply_to_id: options.reply_to_id,
        reply_control: options.reply_control,
        link_attachment: options.link_attachment,
        quote_post_id: options.quote_post_id,
        topic_tag: options.topic_tag,
        auto_publish_text: options.auto_publish_text,
      }),
    })
  }

  async createImagePostContainer(
    userId: string,
    options: ImagePostOptions
  ): Promise<MediaContainerResponse> {
    return this.makeRequest<MediaContainerResponse>('/api/threads/publish', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        media_type: 'IMAGE_POST',
        image_url: options.image_url,
        text: options.text,
        alt_text: options.alt_text,
        reply_to_id: options.reply_to_id,
        reply_control: options.reply_control,
        link_attachment: options.link_attachment,
      }),
    })
  }

  async publishMediaContainer(
    userId: string,
    containerId: string
  ): Promise<MediaPublishResponse> {
    return this.makeRequest<MediaPublishResponse>('/api/threads/publish', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        container_id: containerId,
        action: 'publish',
      }),
    })
  }

  async getMediaContainerStatus(containerId: string): Promise<MediaContainerResponse> {
    return this.makeRequest<MediaContainerResponse>(`/api/threads/publish/status/${containerId}`)
  }

  // Insights methods
  async getMediaInsights(
    mediaId: string,
    metrics?: string[]
  ): Promise<ThreadsInsight[]> {
    const params = new URLSearchParams()
    if (metrics && metrics.length > 0) {
      params.append('metric', metrics.join(','))
    }

    const queryString = params.toString()
    return this.makeRequest<ThreadsInsight[]>(
      `/api/threads/insights/${mediaId}${queryString ? `?${queryString}` : ''}`
    )
  }

  async getUserInsights(
    userId: string,
    metrics?: string[],
    since?: string,
    until?: string
  ): Promise<ThreadsInsight[]> {
    const params = new URLSearchParams()
    if (metrics && metrics.length > 0) {
      params.append('metric', metrics.join(','))
    }
    if (since) {
      params.append('since', since)
    }
    if (until) {
      params.append('until', until)
    }

    const queryString = params.toString()
    return this.makeRequest<ThreadsInsight[]>(
      `/api/threads/insights/user/${userId}${queryString ? `?${queryString}` : ''}`
    )
  }

  // Analytics helper methods
  async getAccountAnalytics(
    userId: string,
    timeRange?: { since?: string; until?: string }
  ): Promise<{
    totalFollowers: number
    totalFollowing: number
    totalPosts: number
    totalThreads: number
  }> {
    const profile = await this.getUserProfile()

    return {
      totalFollowers: profile.followers_count,
      totalFollowing: profile.following_count,
      totalPosts: profile.media_count,
      totalThreads: profile.threads_count,
    }
  }

  async getContentAnalytics(
    userId: string,
    timeRange?: { since?: string; until?: string },
    limit: number = 100
  ): Promise<{
    totalPosts: number
    totalLikes: number
    totalReplies: number
    totalReposts: number
    totalShares: number
    averageEngagement: number
    topPosts: ThreadsMedia[]
  }> {
    // Get user's media
    const mediaResponse = await this.getUserMedia(
      userId,
      ['id', 'timestamp', 'like_count', 'reply_count', 'repost_count', 'quote_count', 'share_count'],
      limit,
      timeRange?.since
    )

    if (!mediaResponse.data || mediaResponse.data.length === 0) {
      return {
        totalPosts: 0,
        totalLikes: 0,
        totalReplies: 0,
        totalReposts: 0,
        totalShares: 0,
        averageEngagement: 0,
        topPosts: [],
      }
    }

    // Calculate aggregate metrics
    let totalLikes = 0
    let totalReplies = 0
    let totalReposts = 0
    let totalShares = 0

    mediaResponse.data.forEach(post => {
      totalLikes += post.like_count || 0
      totalReplies += post.reply_count || 0
      totalReposts += post.repost_count || 0
      totalShares += (post.share_count || 0) + (post.quote_count || 0)
    })

    const totalPosts = mediaResponse.data.length
    const totalEngagement = totalLikes + totalReplies + totalReposts + totalShares
    const averageEngagement = totalPosts > 0 ? Math.round(totalEngagement / totalPosts) : 0

    // Get top posts by engagement
    const postsWithEngagement = mediaResponse.data.map(post => ({
      ...post,
      engagement: (post.like_count || 0) + (post.reply_count || 0) +
                 (post.repost_count || 0) + (post.share_count || 0) + (post.quote_count || 0),
    }))

    const topPosts = postsWithEngagement
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10)

    return {
      totalPosts,
      totalLikes,
      totalReplies,
      totalReposts,
      totalShares,
      averageEngagement,
      topPosts,
    }
  }

  // Reply methods
  async getPostReplies(
    mediaId: string,
    fields: string[] = ['id', 'text', 'timestamp', 'username', 'like_count'],
    limit: number = 25
  ): Promise<MediaListResponse> {
    const params = new URLSearchParams({
      fields: fields.join(','),
      limit: limit.toString(),
    })

    return this.makeRequest<MediaListResponse>(`/api/threads/replies/${mediaId}?${params}`)
  }

  // Repost methods
  async createRepost(userId: string, mediaId: string, text?: string): Promise<MediaContainerResponse> {
    return this.makeRequest<MediaContainerResponse>('/api/threads/repost', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        media_id: mediaId,
        text,
      }),
    })
  }
}

// Create and export singleton instance
export const threadsApi = new ThreadsApiClient()