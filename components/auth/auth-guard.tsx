'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useThreadsAuth } from '@/hooks/use-threads-auth'
import { createAuthGuard } from '@/lib/auth'
import { Skeleton } from '@/components/ui/skeleton'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  requireSubscription?: string
  showLoading?: boolean
}

export function AuthGuard({
  children,
  fallback = null,
  redirectTo,
  requireSubscription,
  showLoading = true,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useThreadsAuth()
  const router = useRouter()

  // Create auth guard with custom options
  const guard = createAuthGuard({
    redirectTo: redirectTo || '/auth',
    ...(requireSubscription && { requireSubscription }),
    ...(fallback && { fallback }),
  })

  useEffect(() => {
    if (!isLoading && !guard.isAllowed()) {
      router.push(guard.redirectTo)
    }
  }, [isLoading, guard, router])

  // Show loading state
  if (isLoading && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  // Show fallback if not authenticated
  if (!isAuthenticated && fallback) {
    return <>{fallback}</>
  }

  // Render children if authenticated
  if (guard.isAllowed()) {
    return <>{children}</>
  }

  // Default loading state
  if (showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return null
}

// Premium guard component
export function PremiumGuard({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard requireSubscription="CREATOR" fallback={fallback}>
      {children}
    </AuthGuard>
  )
}

// Professional guard component
export function ProfessionalGuard({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard requireSubscription="PROFESSIONAL" fallback={fallback}>
      {children}
    </AuthGuard>
  )
}

// Business guard component
export function BusinessGuard({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <AuthGuard requireSubscription="BUSINESS" fallback={fallback}>
      {children}
    </AuthGuard>
  )
}