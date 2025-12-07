/**
 * Authentication API Utilities
 * API client functions for authentication endpoints
 */

import { AUTH_CONFIG } from './config'
import type { AuthResponse, User } from '@/types/auth'

/**
 * API client for authentication
 */
export const authApi = {
  /**
   * Get login URL
   */
  getLoginUrl(): string {
    return `${AUTH_CONFIG.api.baseUrl}${AUTH_CONFIG.api.endpoints.login}`
  },

  /**
   * Send authorization code to backend
   */
  async sendAuthCode(code: string): Promise<AuthResponse> {
    const redirectUri = AUTH_CONFIG.oauth.redirectUri
    let url = this.getLoginUrl()

    // Add redirectUri as query parameter if configured
    if (redirectUri) {
      const separator = url.includes('?') ? '&' : '?'
      url = `${url}${separator}redirect_uri=${encodeURIComponent(redirectUri)}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Code: code,
      },
    })

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    const accessToken = this.getStoredToken()
    if (!accessToken) return

    try {
      await fetch(`${AUTH_CONFIG.api.baseUrl}${AUTH_CONFIG.api.endpoints.logout}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch (error) {
      console.warn('Logout API call failed:', error)
      // Continue with local logout even if API call fails
    }
  },

  /**
   * Get stored access token
   */
  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(AUTH_CONFIG.storage.accessTokenKey)
    } catch (error) {
      console.error('Failed to get stored token:', error)
      return null
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<AuthResponse | null> {
    const refreshToken = this.getStoredRefreshToken()
    if (!refreshToken) return null

    try {
      const response = await fetch(`${AUTH_CONFIG.api.baseUrl}${AUTH_CONFIG.api.endpoints.refresh}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Token refresh failed:', error)
      return null
    }
  },

  /**
   * Get stored refresh token
   */
  getStoredRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(AUTH_CONFIG.storage.refreshTokenKey)
    } catch (error) {
      console.error('Failed to get stored refresh token:', error)
      return null
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile(): Promise<any> {
    const accessToken = this.getStoredToken()
    if (!accessToken) {
      throw new Error('No access token available')
    }

    const response = await fetch(`${AUTH_CONFIG.api.baseUrl}${AUTH_CONFIG.api.endpoints.profile}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get user profile: ${response.status}`)
    }

    return await response.json()
  },
}