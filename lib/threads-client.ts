import {
  ThreadsUser,
  exchangeForLongLivedToken,
  refreshAccessToken,
  THREADS_API_BASE_URL
} from './threads-oauth';
import { getThreadsTokens, updateTokenLastUsed, isAccessTokenExpired } from './threads-db';
import { prisma } from './db';

// Enhanced TypeScript types for Threads API responses
export interface ThreadsMediaObject {
  id: string;
  media_type: 'CAROUSEL_ALBUM' | 'IMAGE' | 'TEXT' | 'VIDEO';
  media_url?: string;
  permalink: string;
  owner: { id: string; username: string };
  username: string;
  text?: string;
  timestamp: string;
  thumbnail_url?: string;
  children?: { id: string; media_type: string; media_url?: string }[];
  is_quote_post: boolean;
  quote_post?: {
    id: string;
    text?: string;
    media_url?: string;
    permalink: string;
    owner: { id: string; username: string };
  };
}

export interface ThreadsInsights {
  id: string;
  name: string;
  period: string;
  title?: string;
  description?: string;
  values: Array<{
    value: number | string;
    end_time: string;
  }>;
}

export interface ThreadsReplies {
  data: Array<{
    id: string;
    text: string;
    timestamp: string;
    username: string;
    like_count: number;
    hidden: boolean;
    media_url?: string;
    media_type?: string;
    permalink: string;
  }>;
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
    previous?: string;
  };
}

export interface ThreadsPublishResponse {
  id: string;
  media_type: string;
  media_status: 'EXPIRED' | 'PUBLISHED' | 'PUBLISHED_BUT_NOT_REPLIED' | 'FAILED' | 'NOT_PUBLISHED';
  share_url?: string;
}

export interface ThreadsPublishLimit {
  config: {
    quota_total: number;
    quota_duration: number;
  };
  quota_usage: number;
}

export interface ThreadsApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    type: string;
    code: number;
  };
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
    previous?: string;
  };
}

export interface ThreadsApiClientConfig {
  userId: string;
  autoRefresh?: boolean;
  logLevel?: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
  onTokenRefresh?: (newToken: string) => void;
  onTokenError?: (error: Error) => void;
}

export class ThreadsApiClient {
  private config: ThreadsApiClientConfig;
  private logger: (level: string, message: string, data?: any) => void;

  constructor(config: ThreadsApiClientConfig) {
    this.config = {
      autoRefresh: true,
      logLevel: 'ERROR',
      ...config
    };

    this.logger = (level: string, message: string, data?: any) => {
      const levels: Record<string, number> = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
      const currentLevel = levels[this.config.logLevel!] || 0;
      const messageLevel = levels[level] || 0;

      if (messageLevel <= currentLevel) {
        console.log(`[ThreadsApiClient:${level}] ${message}`, data || '');
      }
    };
  }

  /**
   * Check if the current token is expired or about to expire
   */
  private async isTokenExpired(): Promise<boolean> {
    try {
      return await isAccessTokenExpired(this.config.userId);
    } catch (error) {
      this.logger('ERROR', 'Failed to check token expiration', error);
      return true; // Assume expired if we can't check
    }
  }

  /**
   * Refresh the long-lived token
   */
  private async refreshToken(): Promise<string> {
    try {
      this.logger('INFO', 'Attempting to refresh token');

      // Get current tokens from database
      const tokens = await getThreadsTokens(this.config.userId);
      if (!tokens?.refreshToken) {
        throw new Error('No refresh token available');
      }

      // Use refresh token to get new short-lived token
      const refreshResponse = await refreshAccessToken(tokens.refreshToken);

      // Exchange new short-lived token for long-lived token
      const longLivedResponse = await exchangeForLongLivedToken(refreshResponse.access_token);

      // Update tokens in database
      const updateData: any = {
        shortLivedToken: refreshResponse.access_token,
        longLivedToken: longLivedResponse.access_token,
        tokenType: longLivedResponse.token_type,
        shortLivedExpiresAt: new Date(Date.now() + (refreshResponse.expires_in * 1000)),
        longLivedExpiresAt: new Date(Date.now() + (longLivedResponse.expires_in * 1000)),
        refreshToken: refreshResponse.refresh_token || tokens.refreshToken,
        lastUsedAt: new Date(),
      };

      // Only include scope if it exists
      if (refreshResponse.scope) {
        updateData.scope = refreshResponse.scope;
      }

      await prisma.threadsToken.update({
        where: { userId: this.config.userId },
        data: updateData
      });

      this.logger('INFO', 'Token refreshed successfully');

      // Call callback if provided
      if (this.config.onTokenRefresh) {
        this.config.onTokenRefresh(longLivedResponse.access_token);
      }

      return longLivedResponse.access_token;
    } catch (error) {
      this.logger('ERROR', 'Failed to refresh token', error);

      // Call error callback if provided
      if (this.config.onTokenError) {
        this.config.onTokenError(error as Error);
      }

      throw new Error(`Token refresh failed: ${error}`);
    }
  }

  /**
   * Get valid access token, refreshing if necessary
   */
  private async getValidAccessToken(): Promise<string> {
    try {
      const tokens = await getThreadsTokens(this.config.userId);

      if (!tokens?.longLivedToken) {
        throw new Error('No access token available');
      }

      // Check if token needs refresh
      if (this.config.autoRefresh && await this.isTokenExpired()) {
        this.logger('INFO', 'Token expired, refreshing...');
        return await this.refreshToken();
      }

      // Update last used timestamp
      await updateTokenLastUsed(this.config.userId);

      return tokens.longLivedToken;
    } catch (error) {
      this.logger('ERROR', 'Failed to get valid access token', error);
      throw error;
    }
  }

  /**
   * Make authenticated API request with automatic token refresh
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const accessToken = await this.getValidAccessToken();
      const url = endpoint.startsWith('http')
        ? endpoint
        : `${THREADS_API_BASE_URL}${endpoint}`;

      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle token errors specifically
        if (response.status === 401) {
          this.logger('WARN', 'Received 401, attempting token refresh');

          if (this.config.autoRefresh) {
            try {
              const newToken = await this.refreshToken();

              // Retry request with new token
              const retryResponse = await fetch(url, {
                ...options,
                headers: {
                  'Authorization': `Bearer ${newToken}`,
                  'Content-Type': 'application/json',
                  ...options.headers,
                },
              });

              if (!retryResponse.ok) {
                throw new Error(`API request failed after refresh: ${retryResponse.status} ${retryResponse.statusText}`);
              }

              return await retryResponse.json();
            } catch (refreshError) {
              this.logger('ERROR', 'Token refresh failed during retry', refreshError);
              throw new Error('Authentication failed and token refresh unsuccessful');
            }
          }
        }

        throw new Error(`API request failed: ${response.status} ${responseData.error?.message || response.statusText}`);
      }

      return responseData;
    } catch (error) {
      this.logger('ERROR', 'API request failed', { endpoint, error });
      throw error;
    }
  }

  /**
   * GET user profile information
   */
  async getUserProfile(fields?: string[]): Promise<ThreadsUser> {
    const defaultFields = 'id,username,account_type,threads_profile_picture_url,threads_biography';
    const selectedFields = fields?.join(',') || defaultFields;

    this.logger('INFO', 'Fetching user profile');

    const response = await this.makeRequest<{ data: ThreadsUser[] }>(`/me?fields=${selectedFields}`);

    if (!response.data || response.data.length === 0) {
      throw new Error('No user data returned');
    }

    const user = response.data[0];
    if (!user) {
      throw new Error('Invalid user data returned');
    }

    return user;
  }

  /**
   * GET insights for user or specific media
   */
  async getInsights(
    mediaId?: string,
    metrics?: string[],
    period?: string
  ): Promise<ThreadsInsights[]> {
    const defaultMetrics = [
      'views',
      'likes',
      'comments',
      'shares',
      'saves',
      'replies',
      'quote_posts'
    ];
    const selectedMetrics = metrics || defaultMetrics;
    const selectedPeriod = period || 'day';

    let endpoint = `/me/insights?metric=${selectedMetrics.join(',')}&period=${selectedPeriod}`;

    if (mediaId) {
      endpoint = `/${mediaId}/insights?metric=${selectedMetrics.join(',')}&period=${selectedPeriod}`;
    }

    this.logger('INFO', 'Fetching insights', { mediaId, metrics: selectedMetrics });

    const response = await this.makeRequest<{ data: ThreadsInsights[] }>(endpoint);
    return response.data || [];
  }

  /**
   * POST new Threads content (create media container)
   */
  async createThreadsContainer(params: {
    text?: string;
    image_url?: string;
    video_url?: string;
    media_type?: 'TEXT' | 'IMAGE' | 'VIDEO';
    reply_to_id?: string;
    quote_post_id?: string;
    allow_reply_tier?: 'everyone' | 'mentioned_only' | 'accounts_you_follow';
    restricted_reply_settings?: string;
  }): Promise<{ id: string }> {
    this.logger('INFO', 'Creating Threads container', params);

    const formData = new URLSearchParams();

    // Only add non-empty parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Set default media_type if not specified
    if (!params.media_type) {
      formData.append('media_type', params.text && !params.image_url && !params.video_url ? 'TEXT' : 'IMAGE');
    }

    const response = await this.makeRequest<{ id: string }>(`/me/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    return response;
  }

  /**
   * POST publish Threads container (publish previously created container)
   */
  async publishThreadsContainer(containerId: string): Promise<ThreadsPublishResponse> {
    this.logger('INFO', 'Publishing Threads container', { containerId });

    const response = await this.makeRequest<{ data: ThreadsPublishResponse[] }>(`/me/threads_publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        creation_id: containerId,
      }).toString(),
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('No publish data returned');
    }

    const publishResult = response.data[0];
    if (!publishResult) {
      throw new Error('Invalid publish data returned');
    }

    return publishResult;
  }

  /**
   * GET replies for a specific Thread
   */
  async getReplies(
    threadsId: string,
    fields?: string[],
    limit?: number
  ): Promise<ThreadsReplies> {
    const defaultFields = 'id,text,timestamp,username,like_count,hidden,media_url,media_type,permalink';
    const selectedFields = fields?.join(',') || defaultFields;

    let endpoint = `/${threadsId}/replies?fields=${selectedFields}`;

    if (limit) {
      endpoint += `&limit=${limit}`;
    }

    this.logger('INFO', 'Fetching replies', { threadsId, limit });

    const response = await this.makeRequest<ThreadsReplies>(endpoint);
    return response;
  }

  /**
   * GET user's published Threads
   */
  async getUserThreads(
    fields?: string[],
    limit?: number,
    before?: string,
    after?: string
  ): Promise<{ data: ThreadsMediaObject[]; paging?: any }> {
    const defaultFields = 'id,media_type,media_url,permalink,owner,username,text,timestamp,thumbnail_url,is_quote_post';
    const selectedFields = fields?.join(',') || defaultFields;

    let endpoint = `/me/threads?fields=${selectedFields}`;

    if (limit) endpoint += `&limit=${limit}`;
    if (before) endpoint += `&before=${before}`;
    if (after) endpoint += `&after=${after}`;

    this.logger('INFO', 'Fetching user threads', { limit, before, after });

    const response = await this.makeRequest<{ data: ThreadsMediaObject[]; paging?: any }>(endpoint);
    return response;
  }

  /**
   * GET media object details
   */
  async getMediaObject(mediaId: string, fields?: string[]): Promise<ThreadsMediaObject> {
    const defaultFields = 'id,media_type,media_url,permalink,owner,username,text,timestamp,thumbnail_url,children,is_quote_post,quote_post';
    const selectedFields = fields?.join(',') || defaultFields;

    this.logger('INFO', 'Fetching media object', { mediaId });

    const response = await this.makeRequest<{ data: ThreadsMediaObject[] }>(`/${mediaId}?fields=${selectedFields}`);

    if (!response.data || response.data.length === 0) {
      throw new Error('No media data returned');
    }

    const media = response.data[0];
    if (!media) {
      throw new Error('Invalid media data returned');
    }

    return media;
  }

  /**
   * GET publish quota/limits
   */
  async getPublishQuota(): Promise<ThreadsPublishLimit> {
    this.logger('INFO', 'Fetching publish quota');

    const response = await this.makeRequest<{ data: ThreadsPublishLimit[] }>(`/me/threads_publishing_limit`);

    if (!response.data || response.data.length === 0) {
      throw new Error('No quota data returned');
    }

    const quota = response.data[0];
    if (!quota) {
      throw new Error('Invalid quota data returned');
    }

    return quota;
  }

  /**
   * Manage replies (hide, unhide)
   */
  async manageReply(replyId: string, action: 'hide' | 'unhide'): Promise<{ success: boolean }> {
    this.logger('INFO', 'Managing reply', { replyId, action });

    const response = await this.makeRequest<{ success: boolean }>(`/${replyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        hide: action === 'hide' ? 'true' : 'false',
      }).toString(),
    });

    return response;
  }
}

/**
 * Factory function to create Threads API client
 */
export function createThreadsClient(config: ThreadsApiClientConfig): ThreadsApiClient {
  return new ThreadsApiClient(config);
}

/**
 * Default client for current user
 */
export function getDefaultThreadsClient(userId: string): ThreadsApiClient {
  return new ThreadsApiClient({
    userId,
    autoRefresh: true,
    logLevel: process.env.NODE_ENV === 'development' ? 'INFO' : 'ERROR'
  });
}