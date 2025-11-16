/**
 * Tests for Threads OAuth callback API route
 */

import { NextRequest } from 'next/server'
import { GET } from '@/app/api/auth/threads/callback/route'

// Mock the OAuth functions
jest.mock('@/lib/threads-oauth', () => ({
  exchangeCodeForToken: jest.fn(),
  exchangeForLongLivedToken: jest.fn(),
  getThreadsUser: jest.fn(),
}))

// Mock the database functions
jest.mock('@/lib/threads-db', () => ({
  createOrUpdateUser: jest.fn(),
  storeThreadsTokens: jest.fn(),
}))

import { exchangeCodeForToken, exchangeForLongLivedToken, getThreadsUser } from '@/lib/threads-oauth'
import { createOrUpdateUser, storeThreadsTokens } from '@/lib/threads-db'

const mockExchangeCodeForToken = exchangeCodeForToken as jest.MockedFunction<typeof exchangeCodeForToken>
const mockExchangeForLongLivedToken = exchangeForLongLivedToken as jest.MockedFunction<typeof exchangeForLongLivedToken>
const mockGetThreadsUser = getThreadsUser as jest.MockedFunction<typeof getThreadsUser>
const mockCreateOrUpdateUser = createOrUpdateUser as jest.MockedFunction<typeof createOrUpdateUser>
const mockStoreThreadsTokens = storeThreadsTokens as jest.MockedFunction<typeof storeThreadsTokens>

describe('/api/auth/threads/callback', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock environment variables
    process.env.NEXTAUTH_URL = 'http://localhost:3000'
  })

  it('should handle successful OAuth callback', async () => {
    // Mock successful token exchange
    mockExchangeCodeForToken.mockResolvedValueOnce({
      access_token: 'short_lived_token_123',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'refresh_token_123',
      scope: 'threads_basic threads_content_publish',
    })

    mockGetThreadsUser.mockResolvedValueOnce({
      id: '123456789',
      username: 'test_user',
      account_type: 'CREATOR',
      threads_profile_picture_url: 'https://example.com/avatar.jpg',
      threads_biography: 'Test user biography',
    })

    mockExchangeForLongLivedToken.mockResolvedValueOnce({
      access_token: 'long_lived_token_123',
      token_type: 'bearer',
      expires_in: 5184000,
    })

    mockCreateOrUpdateUser.mockResolvedValueOnce({
      id: 'user_db_id_123',
      threadsUserId: '123456789',
      threadsUsername: 'test_user',
    })

    mockStoreThreadsTokens.mockResolvedValueOnce({} as any)

    // Create mock request with authorization code and state
    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302) // Redirect status
    expect(response.headers.get('location')).toBe('http://localhost:3000/dashboard?auth=success')

    // Verify all OAuth functions were called
    expect(mockExchangeCodeForToken).toHaveBeenCalledWith('test_auth_code')
    expect(mockGetThreadsUser).toHaveBeenCalledWith('short_lived_token_123')
    expect(mockExchangeForLongLivedToken).toHaveBeenCalledWith('short_lived_token_123')
    expect(mockCreateOrUpdateUser).toHaveBeenCalledWith({
      id: '123456789',
      username: 'test_user',
      account_type: 'CREATOR',
      threads_profile_picture_url: 'https://example.com/avatar.jpg',
      threads_biography: 'Test user biography',
    })
  })

  it('should reject callback with invalid state parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code&state=invalid_state', {
      headers: {
        'Cookie': 'threads_oauth_state=valid_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=invalid_state')
  })

  it('should reject callback with missing state parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code')

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=invalid_state')
  })

  it('should reject callback with missing authorization code', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=no_code')
  })

  it('should handle OAuth error response', async () => {
    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?error=access_denied&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=access_denied')
  })

  it('should handle token exchange failure', async () => {
    mockExchangeCodeForToken.mockRejectedValueOnce(new Error('Invalid authorization code'))

    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=invalid_code&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=oauth_failed')
  })

  it('should handle user info fetch failure', async () => {
    mockExchangeCodeForToken.mockResolvedValueOnce({
      access_token: 'short_lived_token_123',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'refresh_token_123',
    })

    mockGetThreadsUser.mockRejectedValueOnce(new Error('Failed to fetch user info'))

    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=oauth_failed')
  })

  it('should handle long-lived token exchange failure', async () => {
    mockExchangeCodeForToken.mockResolvedValueOnce({
      access_token: 'short_lived_token_123',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'refresh_token_123',
    })

    mockGetThreadsUser.mockResolvedValueOnce({
      id: '123456789',
      username: 'test_user',
      account_type: 'CREATOR',
    })

    mockExchangeForLongLivedToken.mockRejectedValueOnce(new Error('Failed to exchange for long-lived token'))

    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=oauth_failed')
  })

  it('should handle database operation failures', async () => {
    mockExchangeCodeForToken.mockResolvedValueOnce({
      access_token: 'short_lived_token_123',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'refresh_token_123',
    })

    mockGetThreadsUser.mockResolvedValueOnce({
      id: '123456789',
      username: 'test_user',
      account_type: 'CREATOR',
    })

    mockExchangeForLongLivedToken.mockResolvedValueOnce({
      access_token: 'long_lived_token_123',
      token_type: 'bearer',
      expires_in: 5184000,
    })

    mockCreateOrUpdateUser.mockRejectedValueOnce(new Error('Database error'))

    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('http://localhost:3000?error=oauth_failed')
  })

  it('should set appropriate cookies on successful callback', async () => {
    mockExchangeCodeForToken.mockResolvedValueOnce({
      access_token: 'short_lived_token_123',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'refresh_token_123',
      scope: 'threads_basic threads_content_publish',
    })

    mockGetThreadsUser.mockResolvedValueOnce({
      id: '123456789',
      username: 'test_user',
      account_type: 'CREATOR',
      threads_profile_picture_url: 'https://example.com/avatar.jpg',
    })

    mockExchangeForLongLivedToken.mockResolvedValueOnce({
      access_token: 'long_lived_token_123',
      token_type: 'bearer',
      expires_in: 5184000,
    })

    mockCreateOrUpdateUser.mockResolvedValueOnce({
      id: 'user_db_id_123',
      threadsUserId: '123456789',
      threadsUsername: 'test_user',
    })

    mockStoreThreadsTokens.mockResolvedValueOnce({} as any)

    const request = new NextRequest('http://localhost:3000/api/auth/threads/callback?code=test_auth_code&state=test_state_123', {
      headers: {
        'Cookie': 'threads_oauth_state=test_state_123',
      },
    })

    const response = await GET(request)

    // Check that user session cookies are set
    const cookies = response.headers.getSetCookie()
    expect(cookies.some(cookie => cookie.includes('threads_user_id='))).toBe(true)
    expect(cookies.some(cookie => cookie.includes('threads_user='))).toBe(true)
    expect(cookies.some(cookie => cookie.includes('threads_oauth_state=;'))).toBe(true) // Should be cleared
  })
})