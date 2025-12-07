'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ArrowRight, Menu, X, Lock, Zap, Clock } from 'lucide-react';
import { EnhancedCTAButton } from './enhanced-cta-button';

interface MobileStickyCTAProps {
  isVisible?: boolean;
  primaryText?: string;
  primaryHref?: string;
  urgencyText?: string;
  timeLeft?: string;
}

export function MobileStickyCTA({
  isVisible = true,
  primaryText = "Start Free Trial",
  primaryHref = "/auth",
  urgencyText = "Limited Time: 50% Off",
  timeLeft = "24:00:00"
}: MobileStickyCTAProps) {
  const [scrollY, setScrollY] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      // Show sticky CTA after scrolling past hero
      setShowSticky(currentScrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible || !showSticky) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left side - Offer text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="destructive" className="text-xs px-2 py-1 animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                {timeLeft}
              </Badge>
            </div>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {urgencyText}
            </p>
          </div>

          {/* Right side - CTA buttons */}
          <div className="flex items-center gap-2">
            {/* Quick CTA */}
            <EnhancedCTAButton
              variant="primary"
              size="sm"
              href={primaryHref}
              badge="FREE"
            >
              Start
            </EnhancedCTAButton>

            {/* More options sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[50vh]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Quick Actions
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                  {/* Primary CTA */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">
                      🚀 Start Growing Your Threads
                    </h3>
                    <p className="text-sm text-green-700 mb-3">
                      Get instant analytics and AI-powered suggestions
                    </p>
                    <EnhancedCTAButton
                      variant="primary"
                      href={primaryHref}
                      className="w-full"
                    >
                      Start Free Trial (No Card Required)
                    </EnhancedCTAButton>
                  </div>

                  {/* Secondary options */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      📊 See Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      📈 Calculate Growth
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                    >
                      💬 Talk to Expert
                    </Button>
                  </div>

                  {/* Trust indicators */}
                  <div className="text-center space-y-2 pt-4 border-t">
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Lock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">Secure connection</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      50,000+ creators trust us ⭐ 4.9/5 rating
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

// Touch-friendly floating action button for mobile
export function MobileFloatingCTA({
  href = "/auth",
  text = "Start Free",
  show = true
}: {
  href?: string;
  text?: string;
  show?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show || !isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <a
        href={href}
        className="relative flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
      >
        <Zap className="h-5 w-5" />
        <span className="font-semibold">{text}</span>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping" />

        {/* Badge */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          FREE
        </span>
      </a>
    </div>
  );
}