/**
 * Threads Publish Page
 * Dedicated page for publishing content to Threads
 */

import { Suspense } from 'react'
import { ThreadsPublishForm } from '@/components/dashboard/threads-publish-form'
import { PageLoader } from '@/components/ui/page-loader'

export default function ThreadsPublishPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Publish to Threads</h1>
        <p className="text-muted-foreground">
          Create and publish content directly to your Threads account
        </p>
      </div>

      <Suspense fallback={<PageLoader />}>
        <ThreadsPublishForm />
      </Suspense>
    </div>
  )
}

export const metadata = {
  title: 'Publish to Threads | Threads Analytics Platform',
  description: 'Create and publish text and image posts to your Threads account.',
}