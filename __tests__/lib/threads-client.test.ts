/**
 * Tests for Threads API client token refresh functionality
 */

import { ThreadsApiClient } from '@/lib/threads-client'
import { getThreadsTokens, isLongLivedTokenExpired, updateTokenLastUsed } from '@/lib/threads-db'
import { exchangeForLongLivedToken, refreshAccessToken } from '@/lib/threads-oauth'
import { prisma } from '@/lib/db'

// Mock the dependencies
jest.mock('@/lib/threads-db')
jest.mock('@/lib/threads-oauth')
jest.mock('@/lib/db')

const mockGetThreadsTokens = getThreadsTokens as jest.MockedFunction<typeof getThreadsTokens>
const mockIsLongLivedTokenExpired = isLongLivedTokenExpired as jest.MockedFunction<typeof isLongLivedTokenExpired>
const mockUpdateTokenLastUsed = updateTokenLastUsed as jest.MockedFunction<typeof updateTokenLastUsed>
const mockRefreshAccessToken = refreshAccessToken as jest.MockedFunction<typeof refreshAccessToken>
const mockExchangeForLongLivedToken = exchangeForLongLivedToken as jest.MockedFunction<typeof exchangeForLongLivedToken>
const mockPrisma = prisma as jest.Mocked<typeof prisma>

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>

describe('ThreadsApiClient Token Refresh', () => {
  let client: ThreadsApiClient
  const mockUserId = 'user_123'

  beforeEach(() => {
    jest.clearAllMocks()
    client = new ThreadsApiClient({
      userId: mockUserId,
      autoRefresh: true,
      logLevel: 'ERROR', // Minimize logging noise in tests
    })

    // Default successful responses
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response)
  })

  describe('getValidAccessToken', () => {
    it('should return existing token when valid', async () => {
      const mockTokens = {
        longLivedToken: 'valid_long_lived_token_123',
        refreshToken: 'refresh_token_123',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(false)
      mockUpdateTokenLastUsed.mockResolvedValueOnce({} as any)

      const token = await (client as any).getValidAccessToken()

      expect(token).toBe('valid_long_lived_token_123')
      expect(mockGetThreadsTokens).toHaveBeenCalledWith(mockUserId)
      expect(mockIsLongLivedTokenExpired).toHaveBeenCalledWith(mockUserId)
      expect(mockUpdateTokenLastUsed).toHaveBeenCalledWith(mockUserId)
      expect(mockRefreshAccessToken).not.toHaveBeenCalled()
    })

    it('should refresh token when expired', async () => {
      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: 'refresh_token_123',
      }

      const mockRefreshResponse = {
        access_token: 'new_short_lived_token_456',
        expires_in: 3600,
        refresh_token: 'new_refresh_token_456',
      }

      const mockLongLivedResponse = {
        access_token: 'new_long_lived_token_456',
        expires_in: 5184000,
        token_type: 'bearer',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true) // Token is expired
      mockRefreshAccessToken.mockResolvedValueOnce(mockRefreshResponse as any)
      mockExchangeForLongLivedToken.mockResolvedValueOnce(mockLongLivedResponse as any)
      mockPrisma.threadsToken.update.mockResolvedValueOnce({} as any)

      const token = await (client as any).getValidAccessToken()

      expect(token).toBe('new_long_lived_token_456')
      expect(mockRefreshAccessToken).toHaveBeenCalledWith('refresh_token_123')
      expect(mockExchangeForLongLivedToken).toHaveBeenCalledWith('new_short_lived_token_456')
      expect(mockPrisma.threadsToken.update).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        data: expect.objectContaining({
          shortLivedToken: 'new_short_lived_token_456',
          longLivedToken: 'new_long_lived_token_456',
          refreshToken: 'new_refresh_token_456',
        }),
      })
    })

    it('should handle missing refresh token', async () => {
      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: null, // No refresh token available
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)

      await expect((client as any).getValidAccessToken()).rejects.toThrow('Token refresh failed: Error: No refresh token available')
    })

    it('should handle refresh token API failure', async () => {
      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: 'invalid_refresh_token_123',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockRejectedValueOnce(new Error('Invalid refresh token'))

      await expect((client as any).getValidAccessToken()).rejects.toThrow('Token refresh failed: Error: Invalid refresh token')
    })

    it('should handle long-lived token exchange failure', async () => {
      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: 'refresh_token_123',
      }

      const mockRefreshResponse = {
        access_token: 'new_short_lived_token_456',
        expires_in: 3600,
        refresh_token: 'new_refresh_token_456',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockResolvedValueOnce(mockRefreshResponse as any)
      mockExchangeForLongLivedToken.mockRejectedValueOnce(new Error('Failed to exchange for long-lived token'))

      await expect((client as any).getValidAccessToken()).rejects.toThrow('Token refresh failed: Error: Failed to exchange for long-lived token')
    })

    it('should handle missing tokens', async () => {
      mockGetThreadsTokens.mockResolvedValueOnce(null)

      await expect((client as any).getValidAccessToken()).rejects.toThrow('No access token available')
    })

    it('should handle autoRefresh disabled', async () => {
      const clientNoRefresh = new ThreadsApiClient({
        userId: mockUserId,
        autoRefresh: false, // Auto-refresh disabled
      })

      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: 'refresh_token_123',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockUpdateTokenLastUsed.mockResolvedValueOnce({} as any)

      const token = await (clientNoRefresh as any).getValidAccessToken()

      expect(token).toBe('expired_long_lived_token_123')
      expect(mockRefreshAccessToken).not.toHaveBeenCalled()
      expect(mockExchangeForLongLivedToken).not.toHaveBeenCalled()
    })
  })

  describe('makeRequest with automatic retry', () => {
    const mockTokens = {
      longLivedToken: 'expired_long_lived_token_123',
      refreshToken: 'refresh_token_123',
    }

    const mockRefreshResponse = {
      access_token: 'new_short_lived_token_456',
      expires_in: 3600,
      refresh_token: 'new_refresh_token_456',
    }

    const mockLongLivedResponse = {
      access_token: 'new_long_lived_token_456',
      expires_in: 5184000,
      token_type: 'bearer',
    }

    it('should automatically retry on 401 with token refresh', async () => {
      // Setup expired token scenario
      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockResolvedValueOnce(mockRefreshResponse as any)
      mockExchangeForLongLivedToken.mockResolvedValueOnce(mockLongLivedResponse as any)
      mockPrisma.threadsToken.update.mockResolvedValueOnce({} as any)

      // Mock fetch responses
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => ({ error: { message: 'Invalid OAuth token' } }),
        } as Response) // First call fails with 401
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: [{ id: '123', username: 'test_user' }] }),
        } as Response) // Second call succeeds

      await client.getUserProfile()

      // Should have made 2 API calls
      expect(mockFetch).toHaveBeenCalledTimes(2)

      // First call should use expired token
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer expired_long_lived_token_123',
          }),
        })
      )

      // Second call should use new token
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer new_long_lived_token_456',
          }),
        })
      )
    })

    it('should fail if retry after refresh still fails', async () => {
      // Setup expired token scenario
      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockResolvedValueOnce(mockRefreshResponse as any)
      mockExchangeForLongLivedToken.mockResolvedValueOnce(mockLongLivedResponse as any)
      mockPrisma.threadsToken.update.mockResolvedValueOnce({} as any)

      // Mock fetch responses - both calls fail
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => ({ error: { message: 'Invalid OAuth token' } }),
        } as Response) // First call fails with 401
        .mockResolvedValueOnce({
          ok: false,
          status: 401,
          json: async () => ({ error: { message: 'Invalid OAuth token' } }),
        } as Response) // Second call also fails with 401

      await expect(client.getUserProfile()).rejects.toThrow('API request failed: 401 Invalid OAuth token')

      expect(mockFetch).toHaveBeenCalledTimes(2)
    })

    it('should handle non-401 errors without retry', async () => {
      const mockTokens = {
        longLivedToken: 'valid_long_lived_token_123',
        refreshToken: 'refresh_token_123',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(false)
      mockUpdateTokenLastUsed.mockResolvedValueOnce({} as any)

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: { message: 'Rate limit exceeded' } }),
      } as Response)

      await expect(client.getUserProfile()).rejects.toThrow('API request failed: 429 Rate limit exceeded')

      // Should only make one call for non-401 errors
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockRefreshAccessToken).not.toHaveBeenCalled()
    })

    it('should handle refresh failure during retry', async () => {
      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockRejectedValueOnce(new Error('Refresh failed'))

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: { message: 'Invalid OAuth token' } }),
      } as Response)

      await expect(client.getUserProfile()).rejects.toThrow('Authentication failed and token refresh unsuccessful')

      // Should not retry if refresh fails
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('token refresh callbacks', () => {
    it('should call onTokenRefresh callback on successful refresh', async () => {
      const onTokenRefresh = jest.fn()

      const clientWithCallback = new ThreadsApiClient({
        userId: mockUserId,
        autoRefresh: true,
        onTokenRefresh,
      })

      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: 'refresh_token_123',
      }

      const mockRefreshResponse = {
        access_token: 'new_short_lived_token_456',
        expires_in: 3600,
      }

      const mockLongLivedResponse = {
        access_token: 'new_long_lived_token_456',
        expires_in: 5184000,
        token_type: 'bearer',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockResolvedValueOnce(mockRefreshResponse as any)
      mockExchangeForLongLivedToken.mockResolvedValueOnce(mockLongLivedResponse as any)
      mockPrisma.threadsToken.update.mockResolvedValueOnce({} as any)

      await (clientWithCallback as any).getValidAccessToken()

      expect(onTokenRefresh).toHaveBeenCalledWith('new_long_lived_token_456')
    })

    it('should call onTokenError callback on refresh failure', async () => {
      const onTokenError = jest.fn()

      const clientWithErrorCallback = new ThreadsApiClient({
        userId: mockUserId,
        autoRefresh: true,
        onTokenError,
      })

      const mockTokens = {
        longLivedToken: 'expired_long_lived_token_123',
        refreshToken: 'invalid_refresh_token_123',
      }

      mockGetThreadsTokens.mockResolvedValueOnce(mockTokens as any)
      mockIsLongLivedTokenExpired.mockResolvedValueOnce(true)
      mockRefreshAccessToken.mockRejectedValueOnce(new Error('Refresh token invalid'))

      await expect((clientWithErrorCallback as any).getValidAccessToken()).rejects.toThrow()

      expect(onTokenError).toHaveBeenCalledWith(expect.any(Error))
      expect(onTokenError).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Refresh token invalid',
      }))
    })
  })
})