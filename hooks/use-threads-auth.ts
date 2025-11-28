'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { AuthResponse, AuthState } from '@/types/auth'
import { CONSOLE_MESSAGES } from '@/lib/constants'

// Helper function to get API URL
function getLoginApiUrl(): string {
  const redirectUri =
    process.env.NEXT_PUBLIC_THREADS_REDIRECT_URI || 'https://0cf8138f070a.ngrok-free.app/auth'
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://threads-platform-cms.vercel.app/api'
  return `${apiBaseUrl}/users/login?redirect_uri=${redirectUri}`
}

// Helper function to get OAuth URL
function getThreadsOAuthUrl(): string {
  const clientId = process.env.NEXT_PUBLIC_THREADS_CLIENT_ID || '1165567432148744'
  const redirectUri =
    process.env.NEXT_PUBLIC_THREADS_REDIRECT_URI || 'https://0cf8138f070a.ngrok-free.app/auth'
  const scopes = [
    'threads_basic',
    'threads_content_publish',
    'threads_manage_insights',
    'threads_manage_replies',
    'threads_profile_discovery',
    'threads_read_replies',
  ]
  const scopeString = scopes.join(',')
  return `https://threads.net/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopeString}`
}

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

  const setLoading = (isLoading: boolean) => setState(prev => ({ ...prev, isLoading }))

  const setRedirecting = (isRedirecting: boolean) => setState(prev => ({ ...prev, isRedirecting }))

  const setError = (error: string | null) => setState(prev => ({ ...prev, error }))

  const sendAuthCode = useCallback(
    async (code: string): Promise<void> => {
      try {
        const response = await fetch(getLoginApiUrl(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Code: code,
          },
        })

        if (response.ok) {
          const data: AuthResponse = await response.json()
          console.log(CONSOLE_MESSAGES.AUTH_SUCCESSFUL, data)

          const { accessToken, user } = data
          localStorage.setItem('accessToken', accessToken)

          setState(prev => ({
            ...prev,
            isAuthenticated: true,
            user: user || null,
          }))

          toast({
            title: user?.name ? `Welcome ${user.name}!` : 'Welcome!',
            description: 'Successfully authenticated with Threads.',
          })

          console.log(CONSOLE_MESSAGES.REDIRECTING)
          router.push('/dashboard')
        } else {
          console.error(CONSOLE_MESSAGES.API_REQUEST_FAILED, response.status, response.statusText)
          throw Error('Authentication Error')
        }
      } catch (error) {
        console.error(CONSOLE_MESSAGES.AUTH_FAILED, error)
        setError(error instanceof Error ? error.message : 'Authentication failed')
        toast({
          title: 'Authentication Error',
          description: error instanceof Error ? error.message : 'Authentication failed',
          variant: 'destructive',
        })
        setRedirecting(false)
      }
    },
    [router, toast]
  )

  useEffect(() => {
    // Parse the URL to get the authorization code
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code && !isProcessed.current) {
      isProcessed.current = true
      setRedirecting(true)
      // Remove any #_ fragments and clean the code
      const cleanCode = code.replace(/#_.*$/, '')
      console.log(CONSOLE_MESSAGES.AUTH_CODE_EXTRACTED, cleanCode)
      sendAuthCode(cleanCode)
    }
  }, [sendAuthCode])

  const handleAuthWithThreads = useCallback(async (): Promise<void> => {
    setLoading(true)

    try {
      // Direct redirect to Threads OAuth
      window.location.href = getThreadsOAuthUrl()
    } catch (error) {
      console.error(CONSOLE_MESSAGES.AUTH_ERROR, error)
      setError('Failed to connect to Threads. Please try again.')
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to Threads. Please try again.',
        variant: 'destructive',
      })
      setLoading(false)
    }
  }, [toast])

  return {
    ...state,
    handleAuthWithThreads,
  }
}
