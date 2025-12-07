'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, AlertCircle } from 'lucide-react'
import { useThreadsAuth } from '@/hooks/use-threads-auth'

export function DevLogin() {
  const { handleDevLogin, isLoading, error, setError } = useThreadsAuth()
  const [userId, setUserId] = useState('')

  const handleDevLoginClick = async () => {
    if (!userId.trim()) {
      setError('Please enter a user ID')
      return
    }

    await handleDevLogin(userId)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDevLoginClick()
    }
  }

  return (
    <Card className="mt-8 border-0 bg-card/50 shadow-xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          Development Login
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="dev-userId" className="text-sm font-medium">
            User ID
          </label>
          <Input
            id="dev-userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter user ID for dev login"
            className="w-full"
          />
        </div>

        <Button
          onClick={handleDevLoginClick}
          disabled={isLoading || !userId.trim()}
          className="h-12 w-full rounded-xl bg-black text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Logging in...
            </>
          ) : (
            'Dev Login by ID'
          )}
        </Button>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            Error: {error}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          GET {process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login/:id
        </div>
      </CardContent>
    </Card>
  )
}