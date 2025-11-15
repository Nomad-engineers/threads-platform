'use client';

import Link from 'next/link';
import { ArrowLeft, BarChart3, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThreads } from '@fortawesome/free-brands-svg-icons';


export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for OAuth errors in URL parameters
    const oauthError = searchParams.get('error');
    if (oauthError) {
      switch (oauthError) {
        case 'oauth_failed':
          setError('Authentication failed. Please try again.');
          break;
        case 'access_denied':
          setError('Access was denied. Please grant permission to continue.');
          break;
        default:
          setError('An error occurred during authentication. Please try again.');
      }
    }
  }, [searchParams]);

  const handleContinueWithThreads = async () => {
    setIsLoading(true);
    setError(null);

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
        // Redirect to Threads OAuth
        window.location.href = data.redirect_url;
      } else {
        throw new Error(data.error || 'Failed to initiate authentication flow');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to Threads. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo and back link */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center">
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-black">Threadlytics</span>
          </div>

          <h1 className="text-2xl font-bold text-black mb-2">
            Sign in or Sign up
          </h1>
          <p className="text-gray-600">
            Get started with Threads analytics in one click
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Authentication Card */}
        <Card className="border border-gray-200 bg-white">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Continue with Threads</CardTitle>
            <CardDescription>
              Sign in or create your account using your Threads profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Threads OAuth Button */}
            <Button
              onClick={handleContinueWithThreads}
              disabled={isLoading}
              className="w-full h-12 text-base bg-black hover:bg-gray-800 text-white border-0"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Connecting to Threads...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faThreads} className="h-6 w-6 mr-2" />
                  Continue with Threads
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 mb-2">
                By continuing, you agree to authenticate with Threads
              </p>
              <div className="flex flex-col gap-1 text-xs text-gray-500">
                <span>• No separate password needed</span>
                <span>• Instant account creation</span>
                <span>• Secure authentication</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            New to Threadlytics? Signing up is free and takes seconds.
          </p>
          <div className="mt-4 flex justify-center gap-6 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}