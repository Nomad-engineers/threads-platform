'use client';

import { useState, useCallback, useEffect } from 'react';
import { ThreadsApiClient, ThreadsApiResponse, ThreadsUser, ThreadsMediaObject, ThreadsInsights, ThreadsPublishResponse, ThreadsReplies } from '@/lib/threads-client';
import { getThreadsAuthStatus } from '@/lib/threads-auth';
import { useThreadsAuth } from '@/lib/threads-auth';

interface UseThreadsClientOptions {
  autoRefresh?: boolean;
  logLevel?: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
}

interface ThreadsClientState {
  client: ThreadsApiClient | null;
  loading: boolean;
  error: string | null;
  user: ThreadsUser | null;
}

export function useThreadsClient(options: UseThreadsClientOptions = {}) {
  const { isAuthenticated, user: authUser } = useThreadsAuth();
  const [state, setState] = useState<ThreadsClientState>({
    client: null,
    loading: true,
    error: null,
    user: null,
  });

  // Initialize client when user is authenticated
  useEffect(() => {
    if (isAuthenticated && authUser) {
      // In a real implementation, you'd need to get the database user ID
      // This might come from your own auth system or a separate API call
      const initializeClient = async () => {
        try {
          setState(prev => ({ ...prev, loading: true, error: null }));

          // Get user profile to establish client
          const authStatus = getThreadsAuthStatus();
          if (authStatus.accessToken) {
            // Create a temporary client to get user info
            const tempClient = new ThreadsApiClient({
              userId: 'temp', // This would be replaced with actual user ID
              autoRefresh: options.autoRefresh ?? true,
              logLevel: options.logLevel ?? 'ERROR',
            });

            setState(prev => ({
              ...prev,
              client: tempClient,
              user: authUser,
              loading: false
            }));
          }
        } catch (error) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to initialize client'
          }));
        }
      };

      initializeClient();
    } else {
      setState(prev => ({
        ...prev,
        client: null,
        user: null,
        loading: false
      }));
    }
  }, [isAuthenticated, authUser, options.autoRefresh, options.logLevel]);

  // API wrapper functions
  const getUserProfile = useCallback(async (fields?: string[]): Promise<ThreadsUser | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.getUserProfile(fields);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user profile';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const getUserThreads = useCallback(async (
    fields?: string[],
    limit?: number,
    before?: string,
    after?: string
  ): Promise<{ data: ThreadsMediaObject[]; paging?: any } | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.getUserThreads(fields, limit, before, after);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user threads';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const getInsights = useCallback(async (
    mediaId?: string,
    metrics?: string[],
    period?: string
  ): Promise<ThreadsInsights[] | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.getInsights(mediaId, metrics, period);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get insights';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const createThreadsContainer = useCallback(async (params: {
    text?: string;
    image_url?: string;
    video_url?: string;
    media_type?: 'TEXT' | 'IMAGE' | 'VIDEO';
    reply_to_id?: string;
    quote_post_id?: string;
    allow_reply_tier?: 'everyone' | 'mentioned_only' | 'accounts_you_follow';
  }): Promise<{ id: string } | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.createThreadsContainer(params);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create thread';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const publishThreadsContainer = useCallback(async (containerId: string): Promise<ThreadsPublishResponse | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.publishThreadsContainer(containerId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to publish thread';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const getReplies = useCallback(async (
    threadsId: string,
    fields?: string[],
    limit?: number
  ): Promise<ThreadsReplies | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.getReplies(threadsId, fields, limit);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get replies';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const getPublishQuota = useCallback(async (): Promise<any | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.getPublishQuota();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get publish quota';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const manageReply = useCallback(async (
    replyId: string,
    action: 'hide' | 'unhide'
  ): Promise<{ success: boolean } | null> => {
    if (!state.client) return null;

    try {
      setState(prev => ({ ...prev, error: null }));
      return await state.client.manageReply(replyId, action);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to manage reply';
      setState(prev => ({ ...prev, error: errorMessage }));
      throw error;
    }
  }, [state.client]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    client: state.client,
    loading: state.loading,
    error: state.error,
    user: state.user,
    isAuthenticated,

    // API methods
    getUserProfile,
    getUserThreads,
    getInsights,
    createThreadsContainer,
    publishThreadsContainer,
    getReplies,
    getPublishQuota,
    manageReply,

    // Utilities
    clearError,
  };
}

// Example of a more specific hook for user data
export function useThreadsUserData() {
  const { getUserProfile, getUserThreads, getInsights, loading, error } = useThreadsClient();
  const [userData, setUserData] = useState<{
    profile: ThreadsUser | null;
    threads: ThreadsMediaObject[];
    insights: ThreadsInsights[];
  }>({
    profile: null,
    threads: [],
    insights: []
  });

  const fetchUserData = useCallback(async () => {
    try {
      const [profile, threads, insights] = await Promise.all([
        getUserProfile(),
        getUserThreads(undefined, 10),
        getInsights()
      ]);

      setUserData({
        profile: profile || null,
        threads: threads?.data || [],
        insights: insights || []
      });
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, [getUserProfile, getUserThreads, getInsights]);

  useEffect(() => {
    if (!loading && !error) {
      fetchUserData();
    }
  }, [loading, error, fetchUserData]);

  return {
    ...userData,
    loading,
    error,
    refetch: fetchUserData
  };
}

// Example hook for publishing threads
export function useThreadsPublish() {
  const { createThreadsContainer, publishThreadsContainer, getPublishQuota, loading, error } = useThreadsClient();
  const [publishing, setPublishing] = useState(false);

  const publishThread = useCallback(async (params: {
    text: string;
    image_url?: string;
    video_url?: string;
    media_type?: 'TEXT' | 'IMAGE' | 'VIDEO';
    reply_to_id?: string;
    quote_post_id?: string;
    allow_reply_tier?: 'everyone' | 'mentioned_only' | 'accounts_you_follow';
  }) => {
    setPublishing(true);

    try {
      // Check quota first
      const quota = await getPublishQuota();
      if (quota && quota.quota_usage >= quota.config.quota_total) {
        throw new Error('Publish quota exceeded');
      }

      // Create container
      const container = await createThreadsContainer(params);
      if (!container) {
        throw new Error('Failed to create thread container');
      }

      // Publish
      const result = await publishThreadsContainer(container.id);

      return result;
    } finally {
      setPublishing(false);
    }
  }, [createThreadsContainer, publishThreadsContainer, getPublishQuota]);

  return {
    publishThread,
    publishing,
    loading,
    error
  };
}