'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      icon: BarChart3,
      title: 'Dashboard',
      description: 'View analytics',
      href: '/dashboard',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Search,
      title: 'Search',
      description: 'Find content',
      href: '/search',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Home,
      title: 'Home',
      description: 'Back to start',
      href: '/',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* 404 Display */}
          <div className="mb-12">
            <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                Go Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}