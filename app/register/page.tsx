'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThreadsSignInButton } from '@/components/auth';
import { BarChart3 } from 'lucide-react';

export default function RegisterPage() {
  const features = [
    '10 scheduled posts per week',
    'Basic analytics dashboard',
    '30 days data history',
    'Content calendar view',
    'Community support',
    'No credit card required'
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl">
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

          <div className="mb-8">
            <Badge className="mb-4 bg-black text-white border-0">
              Start Free Forever
            </Badge>
            <h1 className="text-3xl font-bold text-black mb-4">
              Get started with Threadlytics
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of creators growing their audience with advanced analytics and scheduling tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sign up form */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create your account</CardTitle>
              <CardDescription>
                Start your free trial today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Threads sign up */}
              <ThreadsSignInButton className="w-full" />

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-black hover:text-gray-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features list */}
          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-black mb-6">What you'll get:</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  <strong>No credit card required</strong><br />
                  Upgrade anytime to unlock advanced features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}