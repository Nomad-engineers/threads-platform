/**
 * Tests for Threads OAuth functionality
 */

import {
  generateThreadsOAuthUrl,
  exchangeCodeForToken,
  exchangeForLongLivedToken,
  refreshAccessToken,
  getThreadsUser,
  THREADS_API_BASE_URL,
  FACEBOOK_OAUTH_URL,
} from '@/lib/threads-oauth'

// Mock environment variables
const originalEnv = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = {
    ...originalEnv,
    THREADS_CLIENT_ID: 'test_client_id',
    THREADS_CLIENT_SECRET: 'test_client_secret',
    THREADS_REDIRECT_URI: 'http://localhost:3000/api/auth/threads/callback',
  }
})

afterEach(() => {
  process.env = originalEnv
  jest.clearAllMocks()
})

describe('generateThreadsOAuthUrl', () => {
  it('should generate a valid OAuth URL with all required parameters', () => {
    const state = 'test_state_123'
    const url = generateThreadsOAuthUrl(state)

    expect(url).toContain('client_id=test_client_id')
    expect(url).toContain('redirect_uri=' + encodeURIComponent('http://localhost:3000/api/auth/threads/callback'))
    expect(url).toContain('response_type=code')
    expect(url).toContain('scope=' + encodeURIComponent('threads_basic,threads_content_publish,threads_manage_insights,threads_manage_replies,threads_profile_discovery,threads_read_replies'))
    expect(url).toContain('state=test_state_123')
  })

  it('should use the correct OAuth URL', () => {
    const state = 'test_state_123'
    const url = generateThreadsOAuthUrl(state)

    expect(url).toBe(FACEBOOK_OAUTH_URL + '?client_id=test_client_id&redirect_uri=' + encodeURIComponent('http://localhost:3000/api/auth/threads/callback') + '&scope=' + encodeURIComponent('threads_basic,threads_content_publish,threads_manage_insights,threads_manage_replies,threads_profile_discovery,threads_read_replies') + '&response_type=code&state=test_state_123')
  })

  it('should properly encode URL parameters', () => {
    const state = 'test_state_with_&special=characters'
    const url = generateThreadsOAuthUrl(state)

    expect(url).toContain('state=test_state_with_%26special%3Dcharacters')
  })

  it('should handle empty state parameter', () => {
    const url = generateThreadsOAuthUrl('')
    expect(url).toContain('state=')
  })
})

describe('exchangeCodeForToken', () => {
  const mockTokenResponse = {
    access_token: 'short_lived_token_123',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'refresh_token_123',
    scope: 'threads_basic threads_content_publish',
  }

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('should exchange authorization code for short-lived token', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTokenResponse,
    })

    const result = await exchangeCodeForToken('test_auth_code')

    expect(mockFetch).toHaveBeenCalledWith(
      `${THREADS_API_BASE_URL}/oauth/access_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: expect.any(URLSearchParams),
      }
    )

    expect(result).toEqual(mockTokenResponse)
  })

  it('should handle API errors properly', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'Invalid authorization code',
    })

    await expect(exchangeCodeForToken('invalid_code')).rejects.toThrow('Token exchange failed: Invalid authorization code')
  })

  it('should handle network errors', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(exchangeCodeForToken('test_code')).rejects.toThrow('Network error')
  })
})

describe('exchangeForLongLivedToken', () => {
  const mockLongLivedResponse = {
    access_token: 'long_lived_token_123',
    token_type: 'bearer',
    expires_in: 5184000, // 60 days in seconds
  }

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('should exchange short-lived token for long-lived token', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockLongLivedResponse,
    })

    const result = await exchangeForLongLivedToken('short_lived_token')

    expect(mockFetch).toHaveBeenCalledWith(
      `${THREADS_API_BASE_URL}/access_token?grant_type=th_exchange_token&client_secret=test_client_secret&access_token=short_lived_token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    expect(result).toEqual(mockLongLivedResponse)
  })

  it('should handle long-lived token exchange errors', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Invalid short-lived token',
    })

    await expect(exchangeForLongLivedToken('invalid_token')).rejects.toThrow('Long-lived token exchange failed: Invalid short-lived token')
  })
})

describe('refreshAccessToken', () => {
  const mockRefreshResponse = {
    access_token: 'new_short_lived_token_456',
    token_type: 'bearer',
    expires_in: 3600,
    refresh_token: 'new_refresh_token_456',
    scope: 'threads_basic threads_content_publish',
  }

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('should refresh access token using refresh token', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRefreshResponse,
    })

    const result = await refreshAccessToken('refresh_token_123')

    expect(mockFetch).toHaveBeenCalledWith(
      `${THREADS_API_BASE_URL}/oauth/access_token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: expect.any(URLSearchParams),
      }
    )

    expect(result).toEqual(mockRefreshResponse)
  })

  it('should handle refresh token errors', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Refresh token expired',
    })

    await expect(refreshAccessToken('expired_token')).rejects.toThrow('Token refresh failed: Refresh token expired')
  })
})

describe('getThreadsUser', () => {
  const mockUserResponse = {
    id: '123456789',
    username: 'test_user',
    account_type: 'CREATOR',
    threads_profile_picture_url: 'https://example.com/avatar.jpg',
    threads_biography: 'Test user biography',
  }

  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('should get user information with access token', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserResponse,
    })

    const result = await getThreadsUser('test_access_token')

    expect(mockFetch).toHaveBeenCalledWith(
      `${THREADS_API_BASE_URL}/me?fields=id,username,account_type,threads_profile_picture_url,threads_biography`,
      {
        headers: {
          'Authorization': 'Bearer test_access_token',
        },
      }
    )

    expect(result).toEqual(mockUserResponse)
  })

  it('should handle user data fetch errors', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Invalid OAuth access token',
    })

    await expect(getThreadsUser('invalid_token')).rejects.toThrow('Failed to fetch user: Invalid OAuth access token')
  })
})