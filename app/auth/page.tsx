'use client';

import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThreads } from '@fortawesome/free-brands-svg-icons';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Check for OAuth errors in URL parameters
    const oauthError = searchParams.get('error');
    if (oauthError) {
      let errorMessage = 'An error occurred during authentication. Please try again.';

      switch (oauthError) {
        case 'oauth_failed':
          errorMessage = 'Authentication failed. Please try again.';
          break;
        case 'access_denied':
          errorMessage = 'Access was denied. Please grant permission to continue.';
          break;
        case 'invalid_state':
          errorMessage = 'Security validation failed. Please try again.';
          break;
        default:
          errorMessage = 'Authentication error. Please try again.';
      }

      toast({
        title: 'Authentication Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }

    // Check for successful authentication
    const success = searchParams.get('success');
    if (success === 'true') {
      toast({
        title: 'Welcome!',
        description: 'Successfully authenticated with Threads.',
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  }, [searchParams, toast, router]);

  const handleContinueWithThreads = async () => {
    setIsLoading(true);
    setIsRedirecting(true);

    try {
      // Call the OAuth start endpoint to get redirect URL
      const response = await fetch('/api/auth/threads/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.redirect_url) {
        // Show brief loading state before redirect
        await new Promise(resolve => setTimeout(resolve, 800));
        window.location.href = data.redirect_url;
      } else {
        throw new Error(data.error || 'Failed to initiate authentication flow');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to Threads. Please try again.';

      toast({
        title: 'Connection Error',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  // Skeleton loader state while redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none">
            <CardContent className="p-8 text-center space-y-6">
              {/* Skeleton logo */}
              <div className="flex justify-center">
                <Skeleton className="h-16 w-16 rounded-2xl" />
              </div>

              {/* Skeleton title */}
              <div className="space-y-3">
                <Skeleton className="h-8 w-48 mx-auto rounded-lg" />
                <Skeleton className="h-4 w-64 mx-auto rounded-md" />
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
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Main auth card */}
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faThreads} className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
                <p className="text-muted-foreground text-lg">
                  Sign in or sign up with Threads
                </p>
              </div>
            </div>

            {/* Primary action button */}
            <Button
              onClick={handleContinueWithThreads}
              disabled={isLoading}
              className="w-full h-14 text-base font-medium bg-black hover:bg-gray-800 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-3" />
                  Connecting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faThreads} className="h-6 w-6 mr-3" />
                  Continue with Threads
                </>
              )}
            </Button>

            {/* Legal text */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed">
                By continuing you agree to our{' '}
                <Link
                  href="/terms"
                  className="text-foreground hover:text-primary transition-colors underline-offset-4 underline"
                >
                  Terms & Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}