'use client'

import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThreads } from '@fortawesome/free-brands-svg-icons'
import { DevLogin } from '@/components/auth/dev-login'

interface AuthFormProps {
  isLoading: boolean
  onAuthWithThreads: () => void
}

export function AuthForm({ isLoading, onAuthWithThreads }: AuthFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Main auth card */}
        <Card className="border-0 bg-card/50 shadow-xl backdrop-blur-sm">
          <CardContent className="space-y-8 p-8">
            {/* Header */}
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-black to-gray-800 shadow-lg">
                  <FontAwesomeIcon icon={faThreads} className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
                <p className="text-lg text-muted-foreground">Sign in or sign up with Threads</p>
              </div>
            </div>

            {/* Primary action button */}
            <Button
              onClick={onAuthWithThreads}
              disabled={isLoading}
              className="h-14 w-full rounded-xl bg-black text-base font-medium text-white shadow-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-xl"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faThreads} className="mr-3 h-6 w-6" />
                  Continue with Threads
                </>
              )}
            </Button>

            {/* Legal text */}
            <div className="border-t border-border/50 pt-4 text-center">
              <p className="text-xs leading-relaxed text-muted-foreground">
                By continuing you agree to our{' '}
                <Link
                  href="/terms"
                  className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Terms & Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Development login - only visible in dev mode */}
        {process.env.NODE_ENV === 'development' && <DevLogin />}
      </div>
    </div>
  )
}