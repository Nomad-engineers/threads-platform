import { NextResponse } from 'next/server';

// A/B Test configuration for CTA strategy
const ctaStrategyTest = {
  id: 'cta-strategy-test',
  name: 'CTA Strategy Optimization',
  description: 'Testing different CTA approaches and messaging',
  status: 'running' as const,
  variants: [
    {
      id: 'control',
      name: 'Original CTAs',
      traffic: 25,
      config: {
        primary: 'Start Free Trial',
        secondary: 'Watch Demo',
        tertiary: null
      }
    },
    {
      id: 'multi-cta',
      name: 'Multi-CTA with Emojis',
      traffic: 50,
      config: {
        primary: '🚀 Start Growing Free (No Card Required)',
        secondary: '📊 See Live Analytics Demo',
        tertiary: '📈 Calculate Your Growth Potential'
      }
    },
    {
      id: 'urgency-focused',
      name: 'Urgency-Focused CTAs',
      traffic: 25,
      config: {
        primary: '🔥 Get 50% Off - Limited Time',
        secondary: 'Start Free Trial',
        tertiary: null
      }
    }
  ],
  startDate: new Date(),
  targetMetrics: ['conversion_rate', 'click_through_rate', 'time_to_conversion'],
  minimumSampleSize: 1000,
  confidenceLevel: 95
};

export async function GET() {
  return NextResponse.json(ctaStrategyTest);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Update test configuration if needed
    if (body.status) {
      ctaStrategyTest.status = body.status;
    }

    return NextResponse.json(ctaStrategyTest);
  } catch (error) {
    console.error('Error updating CTA test:', error);
    return NextResponse.json(
      { error: 'Failed to update CTA test configuration' },
      { status: 500 }
    );
  }
}