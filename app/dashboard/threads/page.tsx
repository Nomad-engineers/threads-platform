/**
 * Threads Dashboard Page
 * Main dashboard page for Threads API integration
 */

import { Suspense } from 'react'
import { ThreadsConnect } from '@/components/dashboard/threads-connect'
import { PageLoader } from '@/components/ui/page-loader'

export default function ThreadsDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<PageLoader />}>
        <ThreadsConnect />
      </Suspense>
    </div>
  )
}

export const metadata = {
  title: 'Threads Dashboard | Threads Analytics Platform',
  description: 'Connect and manage your Threads account, view analytics, and publish content.',
}