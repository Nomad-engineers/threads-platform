'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ThreadsIcon } from '@/components/ui/threads-icon';
import { Flame, TrendingUp, Clock, Users, Star, ArrowRight, Calculator, Play, Shield, CheckCircle } from 'lucide-react';

interface HeroMetrics {
  activeUsers: number;
  recentSignups: number;
  avgGrowth: number;
}

// Countdown timer component for urgency
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4" />
      <span className="font-mono font-semibold">
        {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

// Live user counter
function LiveUserCounter() {
  const [count, setCount] = useState(127);
  const [recentSignups, setRecentSignups] = useState(12);

  useEffect(() => {
    const userInterval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    const signupInterval = setInterval(() => {
      setRecentSignups(prev => {
        const newCount = prev + Math.floor(Math.random() * 2);
        return newCount > 20 ? 8 : newCount;
      });
    }, 8000);

    return () => {
      clearInterval(userInterval);
      clearInterval(signupInterval);
    };
  }, []);

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1">
        <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
        <span className="font-semibold text-gray-700">
          {recentSignups} creators signed up in the last hour
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4 text-blue-500" />
        <span className="font-semibold text-gray-700">
          {count.toLocaleString()}+ active users
        </span>
      </div>
    </div>
  );
}

// Real-time activity notification
function ActivityNotification() {
  const activities = [
    { name: 'Sarah M.', action: 'just increased engagement by 45%', time: '2 min ago' },
    { name: 'TechStartup', action: 'reached 10K followers', time: '5 min ago' },
    { name: 'Alex Chen', action: 'doubled their thread reach', time: '8 min ago' },
  ];

  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentActivity];

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
      <div className="flex-shrink-0">
        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-green-800">
          <span className="font-semibold">{activity.name}</span> {activity.action}
        </p>
      </div>
      <span className="text-xs text-green-600">{activity.time}</span>
    </div>
  );
}

// Trust badges
function TrustBadges() {
  const badges = [
    { name: 'SOC 2 Compliant', icon: Shield },
    { name: 'GDPR Ready', icon: CheckCircle },
    { name: '4.9/5 Rating', icon: Star },
  ];

  return (
    <div className="flex items-center gap-6 text-sm text-gray-600">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div key={index} className="flex items-center gap-1">
            <Icon className="h-4 w-4 text-green-500" />
            <span>{badge.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function OptimizedHero() {
  const [headlineVariant, setHeadlineVariant] = useState(0);

  // A/B testing headlines
  const headlines = [
    {
      main: "Grow Your Threads 300% Faster with AI Analytics",
      sub: "Join 100+ creators who increased engagement by 214% on average"
    },
    {
      main: "The #1 Analytics Tool That 10x's Your Threads Reach",
      sub: "Stop guessing what works. Start with data-driven growth strategies"
    },
    {
      main: "Stop Guessing, Start Growing: Data-Driven Threads Success",
      sub: "Tracked 2.8M+ posts and identified the exact patterns for viral content"
    }
  ];

  // Set target date for countdown (24 hours from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);

  const currentHeadline = headlines[headlineVariant];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Urgency banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            LIMITED TIME: 50% OFF Annual Plans
          </Badge>
          <CountdownTimer targetDate={targetDate} />
          <span className="hidden sm:inline">Offer ends soon!</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh] py-8">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left space-y-6 py-8 lg:py-0">
              {/* Authority badge */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  🚀 #1 Threads Analytics Platform 2025
                </Badge>
                <TrustBadges />
              </div>

              {/* Dynamic headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {currentHeadline.main}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {currentHeadline.sub}
                </p>
              </div>

              {/* Multiple CTAs */}
              <div className="space-y-4">
                {/* Primary CTA */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg w-full sm:w-auto"
                  asChild
                >
                  <Link href="/auth">
                    🚀 Start Growing Free (No Card Required)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                {/* Secondary CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    📊 See Live Analytics Demo
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                  >
                    📈 Calculate Your Growth Potential
                    <Calculator className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Live social proof */}
              <div className="space-y-4">
                <LiveUserCounter />

                <ActivityNotification />

                {/* Reviews and trust indicators */}
                <div className="flex flex-col items-center lg:items-start space-y-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 font-semibold text-gray-700">4.9/5</span>
                      <span className="text-gray-500">(2,847 reviews)</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    ⚡ Featured in TechCrunch, Forbes, and Social Media Examiner
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Visual */}
            <div className="relative">
              <div className="relative z-10">
                <Card className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Dashboard header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <ThreadsIcon className="h-6 w-6" />
                          <h3 className="font-bold text-base">Live Analytics Demo</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs">LIVE</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced metrics */}
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
                          <div className="text-2xl font-bold">+342%</div>
                          <div className="text-sm opacity-90">Engagement Growth</div>
                          <div className="text-xs mt-1 opacity-75">↑ 23% this week</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
                          <div className="text-2xl font-bold">12.5K</div>
                          <div className="text-sm opacity-90">New Followers</div>
                          <div className="text-xs mt-1 opacity-75">↑ 18% this month</div>
                        </div>
                      </div>

                      {/* Interactive chart preview */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-700">Reach Analytics</span>
                          <Badge variant="outline" className="text-xs">Last 30 days</Badge>
                        </div>
                        <div className="flex items-end space-x-1 h-24">
                          {[65, 75, 60, 85, 90, 95, 88, 92, 98, 100, 95, 99].map((height, i) => (
                            <div
                              key={i}
                              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t flex-1 hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer"
                              style={{ height: `${height}%` }}
                              title={`Day ${i + 1}: ${height}% reach`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Action items */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-700">AI-powered content suggestions ready</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <span className="text-gray-700">Best posting time: 2:30 PM</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Floating elements with animations */}
                <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 animate-bounce shadow-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 rounded-lg p-3 animate-pulse shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}