'use client'

import { Suspense } from 'react'
import { useThreadsAuth } from '@/hooks/use-threads-auth'
import { AuthForm } from './(components)/auth-form'
import { AuthSkeleton } from './(components)/auth-skeleton'

function AuthPageContent() {
  const { isLoading, isRedirecting, handleAuthWithThreads } = useThreadsAuth()

  // Show skeleton while redirecting
  if (isRedirecting) {
    return <AuthSkeleton />
  }

  // Show auth form
  return <AuthForm isLoading={isLoading} onAuthWithThreads={handleAuthWithThreads} />
}

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <AuthPageContent />
    </Suspense>
  )
}