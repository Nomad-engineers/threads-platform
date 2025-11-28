/**
 * Authentication Storage Utilities
 * LocalStorage helpers for auth state and tokens
 */

import { AUTH_CONFIG } from './config'
import type { AuthState, User } from '@/types/auth'

/**
 * Storage utilities with error handling
 */
export const authStorage = {
  /**
   * Store access token
   */
  setAccessToken(token: string): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(AUTH_CONFIG.storage.accessTokenKey, token)
    } catch (error) {
      console.error('Failed to store access token:', error)
    }
  },

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem(AUTH_CONFIG.storage.accessTokenKey)
    } catch (error) {
      console.error('Failed to get access token:', error)
      return null
    }
  },

  /**
   * Remove access token
   */
  removeAccessToken(): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(AUTH_CONFIG.storage.accessTokenKey)
    } catch (error) {
      console.error('Failed to remove access token:', error)
    }
  },

  /**
   * Store user data
   */
  setUser(user: User | null | undefined): void {
    if (typeof window === 'undefined') return
    try {
      if (user) {
        localStorage.setItem(AUTH_CONFIG.storage.userKey, JSON.stringify(user))
      } else {
        localStorage.removeItem(AUTH_CONFIG.storage.userKey)
      }
    } catch (error) {
      console.error('Failed to store user data:', error)
    }
  },

  /**
   * Get user data
   */
  getUser(): User | null {
    if (typeof window === 'undefined') return null
    try {
      const userData = localStorage.getItem(AUTH_CONFIG.storage.userKey)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error('Failed to get user data:', error)
      return null
    }
  },

  /**
   * Store auth state
   */
  setAuthState(state: Partial<AuthState>): void {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(AUTH_CONFIG.storage.authStateKey, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to store auth state:', error)
    }
  },

  /**
   * Get auth state
   */
  getAuthState(): Partial<AuthState> | null {
    if (typeof window === 'undefined') return null
    try {
      const stateData = localStorage.getItem(AUTH_CONFIG.storage.authStateKey)
      return stateData ? JSON.parse(stateData) : null
    } catch (error) {
      console.error('Failed to get auth state:', error)
      return null
    }
  },

  /**
   * Clear all auth data
   */
  clearAuthData(): void {
    if (typeof window === 'undefined') return
    try {
      Object.values(AUTH_CONFIG.storage).forEach(key => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error('Failed to clear auth data:', error)
    }
  },
}
