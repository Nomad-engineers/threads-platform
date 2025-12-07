'use client';

import { useState, useEffect } from 'react';
import { EnhancedCTAButton } from './enhanced-cta-button';

// A/B Test variant configurations for CTA optimization
export interface CTAVariant {
  id: string;
  name: string;
  description: string;
  primary: {
    text: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    urgency?: boolean;
    badge?: string;
  };
  secondary?: {
    text: string;
    variant: 'primary' | 'secondary' | 'tertiary';
  };
  tertiary?: {
    text: string;
    variant: 'primary' | 'secondary' | 'tertiary';
  };
}

export const ctaVariants: CTAVariant[] = [
  {
    id: 'control',
    name: 'Current Control',
    description: 'Existing implementation',
    primary: {
      text: '🚀 Start Growing Free (No Card Required)',
      variant: 'primary',
      urgency: false
    },
    secondary: {
      text: '📊 See Live Analytics Demo',
      variant: 'secondary'
    },
    tertiary: {
      text: '📈 Calculate Your Growth Potential',
      variant: 'tertiary'
    }
  },
  {
    id: 'benefit-driven',
    name: 'Benefit-Driven CTAs',
    description: 'Focus on specific outcomes',
    primary: {
      text: '⚡ Double My Engagement in 7 Days',
      variant: 'primary',
      urgency: false,
      badge: 'PROVEN'
    },
    secondary: {
      text: '📈 See My Growth Projection',
      variant: 'secondary'
    },
    tertiary: {
      text: '🎯 Get Personalized Strategy',
      variant: 'tertiary'
    }
  },
  {
    id: 'urgency-focused',
    name: 'Urgency & Scarcity',
    description: 'Emphasize limited-time offers',
    primary: {
      text: '🔥 Lock In 50% Off - Offer Ends Tonight',
      variant: 'primary',
      urgency: true,
      badge: '50% OFF'
    },
    secondary: {
      text: '⏰ Claim My Free Trial Now',
      variant: 'secondary'
    },
    tertiary: {
      text: '💬 Chat With Growth Expert',
      variant: 'tertiary'
    }
  },
  {
    id: 'value-first',
    name: 'Value-First Approach',
    description: 'Show value before asking',
    primary: {
      text: '📊 Get Free Threads Audit',
      variant: 'primary',
      urgency: false,
      badge: 'INSTANT'
    },
    secondary: {
      text: '🎯 Find My Best Posting Times',
      variant: 'secondary'
    },
    tertiary: {
      text: '💡 Generate AI Content Ideas',
      variant: 'tertiary'
    }
  },
  {
    id: 'social-proof',
    name: 'Social Proof Integration',
    description: 'Leverage community success',
    primary: {
      text: '👥 Join 50,000+ Successful Creators',
      variant: 'primary',
      urgency: false,
      badge: '#1 TOOL'
    },
    secondary: {
      text: '⭐ See 4.9★ Rated Results',
      variant: 'secondary'
    },
    tertiary: {
      text: '🚀 Start Like Top Creators',
      variant: 'tertiary'
    }
  },
  {
    id: 'micro-commitment',
    name: 'Micro-Commitment Path',
    description: 'Small steps, big value',
    primary: {
      text: '✅ Analyze 1 Thread Free',
      variant: 'primary',
      urgency: false,
      badge: 'FREE'
    },
    secondary: {
      text: '📋 Get Quick Checkup',
      variant: 'secondary'
    },
    tertiary: {
      text: '🎯 Find Top 5 Opportunities',
      variant: 'tertiary'
    }
  }
];

// A/B Test tracking component
export function CTATestTracker({
  variantId,
  placement,
  onConversion
}: {
  variantId: string;
  placement: string;
  onConversion?: (data: any) => void;
}) {
  useEffect(() => {
    // Track test variant exposure
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_test_exposure', {
        variant_id: variantId,
        placement: placement,
        timestamp: Date.now()
      });
    }
  }, [variantId, placement]);

  const handleClick = (ctaIndex: number) => {
    const trackingData = {
      variant_id: variantId,
      placement: placement,
      cta_index: ctaIndex,
      timestamp: Date.now()
    };

    // Track click event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', trackingData);
    }

    // Optional: Track to analytics endpoint
    fetch('/api/analytics/cta-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackingData)
    }).catch(console.error);
  };

  return { handleClick };
}

// CTA Group component that renders variant
export function CTAVariantGroup({
  variant,
  placement = 'hero'
}: {
  variant: CTAVariant;
  placement?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const tracker = CTATestTracker({ variantId: variant.id, placement });

  const handleCTAClick = async (index: number, href?: string) => {
    setIsLoading(true);
    tracker.handleClick(index);

    // Simulate loading/delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (href) {
      window.location.href = href;
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Primary CTA */}
      <EnhancedCTAButton
        variant={variant.primary.variant}
        urgency={variant.primary.urgency}
        badge={variant.primary.badge}
        loading={isLoading}
        onClick={() => handleCTAClick(0, '/auth')}
        className="w-full"
      >
        {variant.primary.text}
      </EnhancedCTAButton>

      {/* Secondary and Tertiary CTAs */}
      {(variant.secondary || variant.tertiary) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {variant.secondary && (
            <EnhancedCTAButton
              variant={variant.secondary.variant}
              onClick={() => handleCTAClick(1, '#demo')}
              className="w-full"
            >
              {variant.secondary.text}
            </EnhancedCTAButton>
          )}
          {variant.tertiary && (
            <EnhancedCTAButton
              variant={variant.tertiary.variant}
              onClick={() => handleCTAClick(2, '#calculator')}
              className="w-full"
            >
              {variant.tertiary.text}
            </EnhancedCTAButton>
          )}
        </div>
      )}

      {/* Trust indicators for variants */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <span>🔒 Secure connection</span>
        <span>•</span>
        <span>⭐ 4.9/5 rating</span>
        <span>•</span>
        <span>50,000+ users</span>
      </div>
    </div>
  );
}

// Random variant selector for A/B testing
export function useCTAVariant(testId: string) {
  const [variant, setVariant] = useState<CTAVariant>(ctaVariants[0]);

  useEffect(() => {
    // Get or assign variant from localStorage/user profile
    const stored = localStorage.getItem(`cta_variant_${testId}`);

    if (stored) {
      const found = ctaVariants.find(v => v.id === stored);
      if (found) {
        setVariant(found);
        return;
      }
    }

    // Assign random variant (33% control, 13.4% each variant)
    const random = Math.random();
    let selected: CTAVariant;

    if (random < 0.33) {
      selected = ctaVariants[0]; // Control
    } else {
      const testVariants = ctaVariants.slice(1);
      const index = Math.floor((random - 0.33) / 0.67 * testVariants.length);
      selected = testVariants[index];
    }

    setVariant(selected);
    localStorage.setItem(`cta_variant_${testId}`, selected.id);

    // Track test assignment
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_test_assigned', {
        test_id: testId,
        variant_id: selected.id,
        timestamp: Date.now()
      });
    }
  }, [testId]);

  return variant;
}

// Add TypeScript interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}