'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Users, TrendingUp, MousePointer, Eye, ArrowUpRight, ArrowDownRight, TestTube, RotateCcw, Pause } from 'lucide-react';

// Analytics event types
export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'demo_request'
  | 'pricing_view'
  | 'testimonial_view'
  | 'social_proof_engagement'
  | 'headline_impression'
  | 'cta_impression';

// A/B test variants
export interface TestVariant {
  id: string;
  name: string;
  traffic: number; // percentage of traffic
  config: Record<string, any>;
}

// A/B test configuration
export interface ABTest {
  id: string;
  name: string;
  description: string;
  variants: TestVariant[];
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate?: Date;
  endDate?: Date;
  targetMetrics: string[];
  minimumSampleSize: number;
  confidenceLevel: number;
}

// Analytics data structure
export interface AnalyticsData {
  events: AnalyticsEvent[];
  userId?: string;
  sessionId: string;
  timestamp: Date;
  properties: Record<string, any>;
  variantId?: string;
  testId?: string;
}

// Conversion tracking hook
export function useConversionTracking() {
  const [events, setEvents] = useState<AnalyticsData[]>([]);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const trackEvent = useCallback((
    eventType: AnalyticsEvent,
    properties: Record<string, any> = {},
    variantId?: string,
    testId?: string
  ) => {
    const eventData: AnalyticsData = {
      events: [eventType],
      sessionId,
      timestamp: new Date(),
      properties,
      variantId,
      testId
    };

    setEvents(prev => [...prev, eventData]);

    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'engagement',
        event_label: JSON.stringify(properties),
        custom_parameter_1: variantId,
        custom_parameter_2: testId,
        session_id: sessionId
      });
    }

    // Send to our backend
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    }).catch(console.error);

    console.log('Analytics Event Tracked:', eventData);
  }, [sessionId]);

  const trackCTAClick = useCallback((ctaText: string, ctaPosition: string, variantId?: string, testId?: string) => {
    trackEvent('cta_click', {
      cta_text: ctaText,
      cta_position: ctaPosition,
      page_url: window.location.href
    }, variantId, testId);
  }, [trackEvent]);

  const trackFormSubmission = useCallback((formType: string, success: boolean, variantId?: string, testId?: string) => {
    trackEvent('form_submit', {
      form_type: formType,
      success: success,
      conversion_value: success ? 1 : 0
    }, variantId, testId);
  }, [trackEvent]);

  const trackPageView = useCallback((pageTitle: string, variantId?: string, testId?: string) => {
    trackEvent('page_view', {
      page_title: pageTitle,
      page_url: window.location.href,
      referrer: document.referrer
    }, variantId, testId);
  }, [trackEvent]);

  return {
    trackEvent,
    trackCTAClick,
    trackFormSubmission,
    trackPageView,
    events
  };
}

// A/B testing hook
export function useABTesting(testId: string) {
  const [currentTest, setCurrentTest] = useState<ABTest | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<TestVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { trackEvent } = useConversionTracking();

  useEffect(() => {
    // Load test configuration
    fetch(`/api/ab-tests/${testId}`)
      .then(res => res.json())
      .then((test: ABTest) => {
        setCurrentTest(test);

        // Determine variant based on traffic allocation
        const random = Math.random() * 100;
        let accumulated = 0;

        for (const variant of test.variants) {
          accumulated += variant.traffic;
          if (random <= accumulated) {
            setSelectedVariant(variant);

            // Track variant assignment
            trackEvent('headline_impression', {
              test_id: testId,
              variant_id: variant.id,
              test_name: test.name
            }, variant.id, testId);

            break;
          }
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [testId, trackEvent]);

  const recordConversion = useCallback((eventType: AnalyticsEvent, properties: Record<string, any> = {}) => {
    if (selectedVariant && currentTest) {
      trackEvent(eventType, {
        ...properties,
        test_id: currentTest.id,
        variant_id: selectedVariant.id
      }, selectedVariant.id, currentTest.id);
    }
  }, [selectedVariant, currentTest, trackEvent]);

  return {
    test: currentTest,
    variant: selectedVariant,
    isLoading,
    recordConversion
  };
}

// Headline testing component
export function HeadlineTest({ onHeadlineChange }: { onHeadlineChange: (headline: string) => void }) {
  const { variant, isLoading } = useABTesting('hero-headline-test');

  const headlines = {
    'variant-a': 'Grow Your Threads 300% Faster with AI Analytics',
    'variant-b': 'The #1 Analytics Tool That 10x\'s Your Threads Reach',
    'variant-c': 'Stop Guessing, Start Growing: Data-Driven Threads Success',
    'control': 'Grow Your Threads Audience with AI-Powered Insights'
  };

  useEffect(() => {
    if (variant && !isLoading) {
      const headline = headlines[variant.id as keyof typeof headlines] || headlines.control;
      onHeadlineChange(headline);
    }
  }, [variant, isLoading, onHeadlineChange]);

  return null; // This component doesn't render anything, just manages the test
}

// CTA testing component
export function CTATest({
  primaryCTA,
  secondaryCTA,
  tertiaryCTA,
  onCTAClick
}: {
  primaryCTA: string;
  secondaryCTA: string;
  tertiaryCTA: string;
  onCTAClick: (ctaType: 'primary' | 'secondary' | 'tertiary', text: string) => void;
}) {
  const { variant, recordConversion } = useABTesting('cta-strategy-test');
  const { trackCTAClick } = useConversionTracking();

  const handleCTAClick = (ctaType: 'primary' | 'secondary' | 'tertiary', text: string) => {
    recordConversion('cta_click', { cta_type: ctaType, cta_text: text });
    trackCTAClick(text, `hero-${ctaType}`, variant?.id, 'cta-strategy-test');
    onCTAClick(ctaType, text);
  };

  const ctaVariants = {
    'control': {
      primary: 'Start Free Trial',
      secondary: 'Watch Demo',
      tertiary: null
    },
    'multi-cta': {
      primary: '🚀 Start Growing Free (No Card Required)',
      secondary: '📊 See Live Analytics Demo',
      tertiary: '📈 Calculate Your Growth Potential'
    },
    'urgency-focused': {
      primary: '🔥 Get 50% Off - Limited Time',
      secondary: 'Start Free Trial',
      tertiary: null
    }
  };

  const currentCTAs = variant?.id ? ctaVariants[variant.id as keyof typeof ctaVariants] : ctaVariants.control;

  return (
    <div className="space-y-3">
      <Button
        size="lg"
        className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
        onClick={() => handleCTAClick('primary', currentCTAs.primary)}
      >
        {currentCTAs.primary}
      </Button>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold"
          onClick={() => handleCTAClick('secondary', currentCTAs.secondary)}
        >
          {currentCTAs.secondary}
        </Button>

        {currentCTAs.tertiary && (
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-semibold"
            onClick={() => handleCTAClick('tertiary', currentCTAs.tertiary)}
          >
            {currentCTAs.tertiary}
          </Button>
        )}
      </div>
    </div>
  );
}

// Analytics dashboard for testing
export function ABTestDashboard() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load all A/B tests
    fetch('/api/ab-tests')
      .then(res => res.json())
      .then(setTests)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedTest) {
      // Load test results
      fetch(`/api/ab-tests/${selectedTest}/results`)
        .then(res => res.json())
        .then(setTestResults)
        .catch(console.error);
    }
  }, [selectedTest]);

  const currentTest = tests.find(t => t.id === selectedTest);

  if (!currentTest) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Select a test to view results</h3>
        <div className="grid gap-4">
          {tests.map(test => (
            <Card key={test.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{test.name}</span>
                  <Badge variant={test.status === 'running' ? 'default' : 'secondary'}>
                    {test.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTest(test.id)}
                >
                  View Results
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{currentTest.name}</h3>
          <p className="text-sm text-gray-600">{currentTest.description}</p>
        </div>
        <Badge variant={currentTest.status === 'running' ? 'default' : 'secondary'}>
          {currentTest.status}
        </Badge>
      </div>

      {/* Variant performance */}
      <div className="space-y-4">
        <h4 className="font-medium">Variant Performance</h4>
        <div className="grid gap-4">
          {currentTest.variants.map(variant => {
            const results = testResults[variant.id] || {};
            const conversionRate = results.conversions && results.visitors
              ? (results.conversions / results.visitors * 100).toFixed(2)
              : '0.00';

            return (
              <Card key={variant.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h5 className="font-medium">{variant.name}</h5>
                      <p className="text-sm text-gray-600">{variant.traffic}% traffic allocation</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{conversionRate}%</div>
                      <div className="text-sm text-gray-600">Conversion rate</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{results.visitors || 0}</div>
                      <div className="text-gray-600">Visitors</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{results.conversions || 0}</div>
                      <div className="text-gray-600">Conversions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{results.bounceRate || 0}%</div>
                      <div className="text-gray-600">Bounce Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Statistical significance */}
      <Card>
        <CardHeader>
          <CardTitle>Statistical Significance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Confidence Level:</span>
              <span className="font-medium">{currentTest.confidenceLevel}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Sample Size Reached:</span>
              <span className="font-medium">
                {testResults.totalVisitors >= currentTest.minimumSampleSize ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Winning Variant:</span>
              <span className="font-medium">{testResults.winningVariant || 'TBD'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Heatmap and click tracking
export function ClickHeatmap() {
  const [clicks, setClicks] = useState<Array<{ x: number; y: number; element: string; timestamp: Date }>>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickData = {
        x: e.clientX,
        y: e.clientY,
        element: target.tagName + (target.className ? '.' + target.className : ''),
        timestamp: new Date()
      };

      setClicks(prev => [...prev, clickData]);

      // Send to analytics
      fetch('/api/analytics/clicks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clickData)
      }).catch(console.error);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {clicks.map((click, index) => (
        <div
          key={index}
          className="absolute w-4 h-4 bg-red-500 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: click.x,
            top: click.y,
            animation: 'pulse 2s ease-out'
          }}
        />
      ))}
    </div>
  );
}

// Scroll depth tracking
export function ScrollDepthTracker() {
  const { trackEvent } = useConversionTracking();
  const [trackedDepths, setTrackedDepths] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      const milestones = [25, 50, 75, 90, 100];

      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedDepths.has(milestone)) {
          setTrackedDepths(prev => new Set([...prev, milestone]));
          trackEvent('page_view', {
            scroll_depth: milestone,
            page_url: window.location.href
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackedDepths, trackEvent]);

  return null;
}

// Performance monitoring
export function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('Page load time:', loadTime, 'ms');
    });
  }, []);

  return null;
}

// Global analytics provider
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { trackPageView } = useConversionTracking();

  useEffect(() => {
    // Track initial page view
    trackPageView(document.title);
  }, [trackPageView]);

  return (
    <>
      {children}
      <ScrollDepthTracker />
      {process.env.NODE_ENV === 'development' && <ClickHeatmap />}
      <PerformanceMonitor />
    </>
  );
}