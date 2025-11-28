'use client'

import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function AuthSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-6 p-8 text-center">
            {/* Skeleton logo */}
            <div className="flex justify-center">
              <Skeleton className="h-16 w-16 rounded-2xl" />
            </div>

            {/* Skeleton title */}
            <div className="space-y-3">
              <Skeleton className="mx-auto h-8 w-48 rounded-lg" />
              <Skeleton className="mx-auto h-4 w-64 rounded-md" />
            </div>

            {/* Skeleton button */}
            <div className="pt-4">
              <Skeleton className="h-14 w-full rounded-xl" />
            </div>

            {/* Loading text */}
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Connecting to Threads...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}