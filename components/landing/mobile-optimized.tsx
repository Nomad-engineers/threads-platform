'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ArrowRight, Star, Users, TrendingUp, BarChart3, ChevronRight, Phone, Tablet, Monitor, Eye, Keyboard, Volume2 } from 'lucide-react';

// Device detection hook
function useDeviceDetection() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0
  });

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height
      });
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return device;
}

// Sticky mobile CTA
function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 transition-transform duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto max-w-lg">
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-lg font-semibold text-base shadow-lg"
        >
          🚀 Start Growing Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <p className="text-xs text-center text-gray-500 mt-2">
          No credit card required • 30-second setup
        </p>
      </div>
    </div>
  );
}

// Mobile navigation
function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'About', href: '#about' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t py-4 space-y-2">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsOpen(false)}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Mobile-optimized stats
function MobileStats() {
  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users, color: 'blue' },
    { value: '342%', label: 'Avg Growth', icon: TrendingUp, color: 'green' },
    { value: '4.9/5', label: 'Rating', icon: Star, color: 'yellow' },
    { value: '2.8M', label: 'Posts Analyzed', icon: BarChart3, color: 'purple' }
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 border-blue-200',
              green: 'bg-green-50 text-green-600 border-green-200',
              yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
              purple: 'bg-purple-50 text-purple-600 border-purple-200'
            };

            return (
              <div key={index} className={`text-center p-4 rounded-lg border ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Touch-friendly testimonials carousel
function TouchFriendlyTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Content Creator',
      content: 'Incredible results! My engagement increased by 400% in just 2 months.',
      rating: 5,
      growth: '+450%',
      avatar: '/avatars/sarah.jpg'
    },
    {
      name: 'TechStartup',
      role: 'B2B Company',
      content: 'Best investment we made. Lead quality from Threads improved by 300%.',
      rating: 5,
      growth: '+320%',
      avatar: '/avatars/techstartup.jpg'
    },
    {
      name: 'Alex Chen',
      role: 'Travel Blogger',
      content: 'The AI suggestions are spot on. Saved me 15 hours per week.',
      rating: 5,
      growth: '+280%',
      avatar: '/avatars/alex.jpg'
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <div className="px-4">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    {testimonial.growth} growth
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Touch indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

// Accessibility components
function AccessibilityControls() {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Apply accessibility preferences to document
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
    document.documentElement.setAttribute('data-motion', reducedMotion ? 'reduced' : 'normal');
  }, [fontSize, highContrast, reducedMotion]);

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 space-y-2">
      <Card className="p-3 bg-white/90 backdrop-blur-sm shadow-lg">
        <div className="space-y-3">
          {/* Font size controls */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Text Size</label>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={fontSize === 'normal' ? 'default' : 'outline'}
                className="h-6 w-6 p-0 text-xs"
                onClick={() => setFontSize('normal')}
              >
                A
              </Button>
              <Button
                size="sm"
                variant={fontSize === 'large' ? 'default' : 'outline'}
                className="h-6 w-6 p-0 text-sm"
                onClick={() => setFontSize('large')}
              >
                A
              </Button>
              <Button
                size="sm"
                variant={fontSize === 'extra-large' ? 'default' : 'outline'}
                className="h-6 w-6 p-0 text-base"
                onClick={() => setFontSize('extra-large')}
              >
                A
              </Button>
            </div>
          </div>

          {/* High contrast toggle */}
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-600" />
            <button
              className={`text-xs font-medium ${highContrast ? 'text-blue-600' : 'text-gray-700'}`}
              onClick={() => setHighContrast(!highContrast)}
            >
              High Contrast
            </button>
          </div>

          {/* Reduced motion toggle */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 text-gray-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <button
              className={`text-xs font-medium ${reducedMotion ? 'text-blue-600' : 'text-gray-700'}`}
              onClick={() => setReducedMotion(!reducedMotion)}
            >
              Less Motion
            </button>
          </div>

          {/* Screen reader friendly text */}
          <div className="sr-only">
            <p>Accessibility controls for better user experience</p>
            <p>Current settings: Font size {fontSize}, Contrast {highContrast ? 'high' : 'normal'}, Motion {reducedMotion ? 'reduced' : 'normal'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Skip to main content link
function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}

// Focus indicator enhancer
function FocusEnhancer() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return null;
}

// ARIA live regions for dynamic content
function ARIALiveRegions() {
  return (
    <div className="sr-only">
      <div aria-live="polite" aria-atomic="true" id="status-polite"></div>
      <div aria-live="assertive" aria-atomic="true" id="status-assertive"></div>
      <div aria-live="polite" aria-atomic="true" id="form-status"></div>
    </div>
  );
}

// Announcement of page changes
function usePageAnnouncement() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const region = document.getElementById(priority === 'polite' ? 'status-polite' : 'status-assertive');
    if (region) {
      region.textContent = message;
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }
  };

  return { announce };
}

// Mobile-optimized hero section
export function MobileOptimizedHero() {
  const device = useDeviceDetection();
  const { announce } = usePageAnnouncement();

  return (
    <>
      <SkipToMain />
      <AccessibilityControls />
      <FocusEnhancer />
      <ARIALiveRegions />

      {/* Mobile navigation */}
      <div className="lg:hidden fixed top-4 right-4 z-30">
        <MobileNavigation />
      </div>

      {/* Main hero section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        role="banner"
      >
        {/* Urgency banner - mobile optimized */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                LIMITED TIME: 50% OFF
              </Badge>
              <span>Ends in 24:00:00</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8 pb-16">
          <div className="text-center space-y-6">
            {/* Authority badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                🚀 #1 Analytics Platform 2025
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                ✅ 4.9/5 Rating
              </Badge>
            </div>

            {/* Headline - mobile optimized */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Grow Your Threads
                <span className="block text-blue-600">300% Faster</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Join 100+ creators who increased engagement by 214% on average
              </p>
            </div>

            {/* Mobile-optimized CTAs */}
            <div className="space-y-3 max-w-sm mx-auto">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-lg font-semibold text-lg shadow-lg"
                onClick={() => announce('Starting free trial signup process', 'assertive')}
              >
                🚀 Start Growing Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 text-sm font-medium"
                >
                  📊 Live Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 py-3 text-sm font-medium"
                >
                  📈 Calculate
                </Button>
              </div>
            </div>

            {/* Mobile social proof */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold">4.9/5</span>
                </div>
                <span>•</span>
                <span>50,000+ users</span>
              </div>

              {/* Live activity */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mx-auto max-w-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm text-green-800">
                    🔥 <span className="font-semibold">12 creators</span> signed up in the last hour
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile dashboard preview */}
          <div className="mt-12 max-w-sm mx-auto">
            <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Live Analytics</span>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">LIVE</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-white text-center">
                      <div className="text-xl font-bold">+342%</div>
                      <div className="text-xs opacity-90">Growth</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-3 text-white text-center">
                      <div className="text-xl font-bold">12.5K</div>
                      <div className="text-xs opacity-90">Followers</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile stats section */}
      <MobileStats />

      {/* Sticky CTA for mobile */}
      {device.isMobile && <StickyMobileCTA />}

      {/* Mobile testimonials */}
      {device.isMobile && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Real Results</h2>
              <p className="text-gray-600">See what creators achieved</p>
            </div>
            <TouchFriendlyTestimonials />
          </div>
        </section>
      )}
    </>
  );
}

// CSS for accessibility features
export function AccessibilityStyles() {
  return (
    <style jsx global>{`
      /* Keyboard navigation focus styles */
      body.keyboard-navigation *:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
      }

      /* High contrast mode */
      [data-contrast="high"] {
        filter: contrast(1.5);
      }

      [data-contrast="high"] .text-gray-600 {
        color: #000 !important;
      }

      [data-contrast="high"] .text-gray-500 {
        color: #000 !important;
      }

      /* Font size adjustments */
      [data-font-size="large"] {
        font-size: 110%;
      }

      [data-font-size="extra-large"] {
        font-size: 125%;
      }

      /* Reduced motion */
      [data-motion="reduced"] *,
      [data-motion="reduced"] ::before,
      [data-motion="reduced"] ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }

      /* Touch-friendly tap targets */
      @media (pointer: coarse) {
        button, a, input, textarea, select {
          min-height: 44px;
          min-width: 44px;
        }
      }

      /* Screen reader only content */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .focus:not-sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        padding: revert;
        margin: revert;
        overflow: visible;
        clip: auto;
        white-space: revert;
      }

      /* Mobile optimizations */
      @media (max-width: 767px) {
        .text-4xl {
          font-size: 2rem;
          line-height: 1.2;
        }

        .text-5xl {
          font-size: 2.5rem;
          line-height: 1.1;
        }

        .container {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }
    `}</style>
  );
}