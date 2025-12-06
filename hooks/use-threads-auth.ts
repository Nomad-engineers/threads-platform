'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { CONSOLE_MESSAGES } from '@/lib/constants'
import {
  AUTH_CONFIG,
  authStorage,
  authApi,
  generateThreadsOAuthUrl,
  hasAuthCode,
  parseAuthCode,
  clearAuthCodeFromUrl,
} from '@/lib/auth'
import type { AuthState, AuthResponse } from '@/types/auth'

export function useThreadsAuth() {
  const router = useRouter()
  const { toast } = useToast()
  const isProcessed = useRef(false)

  const [state, setState] = useState<AuthState>({
    isLoading: false,
    isRedirecting: false,
    isAuthenticated: false,
    user: null,
    error: null,
  })

  // State setters
  const setLoading = (isLoading: boolean) => setState(prev => ({ ...prev, isLoading }))
  const setRedirecting = (isRedirecting: boolean) => setState(prev => ({ ...prev, isRedirecting }))
  const setError = (error: string | null) => setState(prev => ({ ...prev, error }))
  const setUser = (user: any) => setState(prev => ({ ...prev, user, isAuthenticated: !!user }))

  // Send auth code to backend
  const sendAuthCode = useCallback(
    async (code: string): Promise<void> => {
      try {
        setLoading(true)

        const data: AuthResponse = await authApi.sendAuthCode(code)
        console.log(CONSOLE_MESSAGES.AUTH_SUCCESSFUL, data)

        // Store tokens and user data
        const { accessToken, user } = data
        authStorage.setAccessToken(accessToken)
        authStorage.setUser(user)

        // Update state
        setUser(user)

        toast({
          title: user?.name ? `Welcome ${user.name}!` : 'Welcome!',
          description: 'Successfully authenticated with Threads.',
        })

        console.log(CONSOLE_MESSAGES.REDIRECTING)
        router.push(AUTH_CONFIG.ui.defaultRedirect)
      } catch (error) {
        console.error(CONSOLE_MESSAGES.AUTH_FAILED, error)
        const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
        setError(errorMessage)

        toast({
          title: 'Authentication Error',
          description: errorMessage,
          variant: 'destructive',
        })

        setRedirecting(false)
      } finally {
        setLoading(false)
      }
    },
    [router, toast]
  )

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const accessToken = authStorage.getAccessToken()
        const storedUser = authStorage.getUser()

        if (accessToken && storedUser) {
          setUser(storedUser)
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error)
        authStorage.clearAuthData()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Handle OAuth callback
  useEffect(() => {
    if (hasAuthCode() && !isProcessed.current) {
      const code = parseAuthCode(window.location.search)
      if (code) {
        isProcessed.current = true
        clearAuthCodeFromUrl()
        sendAuthCode(code)
      }
    }
  }, [sendAuthCode])

  // Login with Threads
  const handleAuthWithThreads = useCallback(() => {
    try {
      setRedirecting(true)
      const oauthUrl = generateThreadsOAuthUrl()
      window.location.href = oauthUrl
    } catch (error) {
      console.error('Failed to generate OAuth URL:', error)
      setError('Failed to start authentication')
      setRedirecting(false)
    }
  }, [])

  // Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await authApi.logout()
    } catch (error) {
      console.warn('Logout API call failed:', error)
    } finally {
      authStorage.clearAuthData()
      setUser(null)
      setError(null)
      setLoading(false)
      router.push(AUTH_CONFIG.ui.authPage)
    }
  }, [router])

  // Development login by user ID
  const handleDevLogin = useCallback(
    async (userId: string): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
        if (!backendUrl) {
          throw new Error('Backend API URL not configured')
        }

        const response = await fetch(`${backendUrl}/users/login/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('Dev login response:', data)

        // Store auth data like in OAuth flow
        if (data.accessToken) {
          authStorage.setAccessToken(data.accessToken)
        }

        if (data.user) {
          authStorage.setUser(data.user)
          setUser(data.user)

          toast({
            title: data.user?.name ? `Welcome ${data.user.name}!` : 'Dev Login Successful',
            description: `Logged in as user ID: ${userId}`,
          })

          // Redirect to dashboard
          router.push(AUTH_CONFIG.ui.defaultRedirect)
        }

      } catch (error) {
        console.error('Dev login error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Dev login failed'
        setError(errorMessage)

        toast({
          title: 'Dev Login Error',
          description: errorMessage,
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    },
    [router, toast]
  )

  // Refresh user data
  const refreshUserData = useCallback(async () => {
    try {
      const userData = await authApi.getUserProfile()
      authStorage.setUser(userData)
      setUser(userData)
    } catch (error) {
      console.error('Failed to refresh user data:', error)
      setError('Failed to refresh user data')
    }
  }, [])

  return {
    ...state,
    handleAuthWithThreads,
    logout,
    refreshUserData,
    handleDevLogin,
  }
}
