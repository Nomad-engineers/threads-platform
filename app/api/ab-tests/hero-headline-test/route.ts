import { NextResponse } from 'next/server';

// A/B Test configuration for hero headline
const heroHeadlineTest = {
  id: 'hero-headline-test',
  name: 'Hero Headline Optimization',
  description: 'Testing different value-driven headlines for better conversion',
  status: 'running' as const,
  variants: [
    {
      id: 'variant-a',
      name: '300% Faster Growth',
      traffic: 33.3,
      config: {
        headline: 'Grow Your Threads 300% Faster with AI Analytics',
        subheadline: 'Join 100+ creators who increased engagement by 214% on average'
      }
    },
    {
      id: 'variant-b',
      name: '10x Your Reach',
      traffic: 33.3,
      config: {
        headline: 'The #1 Analytics Tool That 10x\'s Your Threads Reach',
        subheadline: 'Stop guessing what works. Start with data-driven growth strategies'
      }
    },
    {
      id: 'variant-c',
      name: 'Data-Driven Success',
      traffic: 33.4,
      config: {
        headline: 'Stop Guessing, Start Growing: Data-Driven Threads Success',
        subheadline: 'Tracked 2.8M+ posts and identified the exact patterns for viral content'
      }
    }
  ],
  startDate: new Date(),
  targetMetrics: ['conversion_rate', 'time_on_page', 'bounce_rate'],
  minimumSampleSize: 1000,
  confidenceLevel: 95
};

export async function GET() {
  return NextResponse.json(heroHeadlineTest);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Update test configuration if needed
    if (body.status) {
      heroHeadlineTest.status = body.status;
    }

    return NextResponse.json(heroHeadlineTest);
  } catch (error) {
    console.error('Error updating A/B test:', error);
    return NextResponse.json(
      { error: 'Failed to update test configuration' },
      { status: 500 }
    );
  }
}