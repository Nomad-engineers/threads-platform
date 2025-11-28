'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useThreadsAuth } from '@/hooks/use-threads-auth'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
}

export function AuthGuard({
  children,
  fallback = null,
  redirectTo = '/auth'
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useThreadsAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  }

  if (!isAuthenticated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}