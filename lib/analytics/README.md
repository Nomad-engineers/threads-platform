# Analytics & Monitoring Documentation

## Overview

This comprehensive analytics and monitoring system provides:

- **Multi-platform analytics** (Google Analytics 4, Vercel Analytics, Sentry)
- **Core Web Vitals tracking** with real-user monitoring
- **Privacy-compliant tracking** (GDPR/CCPA compliance)
- **Custom event tracking** and user behavior analysis
- **Performance monitoring** and optimization insights
- **Conversion funnel tracking**
- **Error tracking and alerting**

## Installation

1. Install dependencies:
```bash
pnpm add @vercel/analytics @sentry/nextjs recharts
```

2. Configure environment variables in `.env.local`:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
VERCEL_ANALYTICS_ENABLED=true
```

3. Add the AnalyticsProvider to your root layout:
```tsx
// app/layout.tsx
import { AnalyticsProvider } from '@/components/analytics/analytics-provider'
import { ConsentBanner } from '@/components/analytics/consent-banner'

<AnalyticsProvider>
  {children}
  <ConsentBanner />
</AnalyticsProvider>
```

## Usage

### Basic Event Tracking

```tsx
import { useAnalytics } from '@/lib/analytics/hooks/use-analytics'

function MyComponent() {
  const { trackEvent, trackPageView, trackConversion, trackForm } = useAnalytics()

  // Track custom events
  const handleButtonClick = () => {
    trackEvent('button_click', {
      button_name: 'subscribe',
      location: 'hero_section',
    })
  }

  // Track conversions
  const handleSignup = () => {
    trackConversion('signup', {
      plan: 'free',
      source: 'landing_page',
    })
  }

  // Track form interactions
  const handleFormStart = () => {
    trackForm('signup_form', 'start')
  }

  return (
    <button onClick={handleButtonClick}>
      Click me
    </button>
  )
}
```

### Performance Monitoring

```tsx
import { usePerformanceMonitoring } from '@/lib/analytics/hooks/use-performance-monitoring'

function PerformanceComponent() {
  const { metrics, getMetricsSummary, getPerformanceScore } = usePerformanceMonitoring({
    enableCoreWebVitals: true,
    enableResourceTiming: true,
    reportThreshold: 100,
  })

  const performanceScore = getPerformanceScore()

  return (
    <div>
      <p>Performance Score: {performanceScore}</p>
      <p>LCP: {metrics.LCP}ms</p>
      <p>FID: {metrics.FID}ms</p>
      <p>CLS: {metrics.CLS}</p>
    </div>
  )
}
```

### Using the Monitoring Dashboard

```tsx
import { MonitoringDashboard } from '@/components/analytics/monitoring-dashboard'

function DashboardPage() {
  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <MonitoringDashboard showDetails={true} />
    </div>
  )
}
```

### Consent Management

```tsx
import { consentManager } from '@/lib/analytics/utils/consent'

// Update consent
consentManager.updateConsent({
  analytics: true,
  marketing: true,
  preferences: true,
})

// Check consent
const hasConsent = consentManager.hasConsent('analytics')
```

## Components

### AnalyticsProvider
Root provider that initializes all analytics services.

**Props:**
- `children: React.ReactNode`

### ConsentBanner
GDPR/CCPA compliant consent banner.

**Props:**
- `onAccept?: () => void`
- `onDecline?: () => void`

### PerformanceMonitor
Displays Core Web Vitals and performance metrics.

**Props:**
- `showDetails?: boolean`

### MonitoringDashboard
Comprehensive analytics dashboard with multiple views.

**Props:**
- `showDetails?: boolean`
- `compact?: boolean`

## Hooks

### useAnalytics
Main hook for tracking events and managing consent.

```tsx
const {
  trackEvent,
  trackPageView,
  trackConversion,
  trackForm,
  trackClick,
  updateConsent,
  hasConsent,
} = useAnalytics()
```

### usePerformanceMonitoring
Hook for monitoring performance metrics.

```tsx
const {
  metrics,
  isMonitoring,
  getMetricsSummary,
  getPerformanceScore,
  getPerformanceGrade,
} = usePerformanceMonitoring({
  enableCoreWebVitals: true,
  enableResourceTiming: true,
  reportThreshold: 100,
})
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | - |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for error tracking | - |
| `VERCEL_ANALYTICS_ENABLED` | Enable Vercel Analytics | false |
| `NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING` | Enable performance monitoring | true |
| `NEXT_PUBLIC_PERFORMANCE_REPORT_THRESHOLD` | Report threshold (ms) | 100 |
| `NEXT_PUBLIC_ENABLE_CONSENT_BANNER` | Show consent banner | true |
| `NEXT_PUBLIC_ENABLE_GDPR_COMPLIANCE` | Enable GDPR compliance | true |
| `NEXT_PUBLIC_ENABLE_CCPA_COMPLIANCE` | Enable CCPA compliance | true |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Sentry sample rate | 0.1 |
| `NEXT_PUBLIC_SENTRY_ENVIRONMENT` | Sentry environment | development |

### Custom Configuration

```tsx
import { DEFAULT_ANALYTICS_CONFIG } from '@/lib/analytics/config'

// Override config
const customConfig = {
  ...DEFAULT_ANALYTICS_CONFIG,
  googleAnalytics: {
    ...DEFAULT_ANALYTICS_CONFIG.googleAnalytics,
    measurementId: 'your-custom-ga-id',
  },
}
```

## Events

### Standard Events

| Event | Description |
|-------|-------------|
| `page_view` | Page view tracking |
| `click` | Click tracking |
| `conversion` | Conversion tracking |
| `form_start` | Form interaction start |
| `form_submit` | Form submission |
| `form_abandon` | Form abandonment |

### Enhanced Ecommerce Events

| Event | Description |
|-------|-------------|
| `add_to_cart` | Add item to cart |
| `remove_from_cart` | Remove item from cart |
| `begin_checkout` | Start checkout process |
| `purchase` | Purchase completed |

### Custom Events

Define and track custom events:

```tsx
trackEvent('feature_usage', {
  feature_name: 'ai_assistant',
  action: 'used',
  user_id: currentUserId,
})
```

## Privacy & Compliance

The analytics system includes built-in privacy features:

- **Consent Management**: GDPR/CCPA compliant consent management
- **Anonymization**: IP address anonymization
- **Data Minimization**: Only collect necessary data
- **Local Storage**: User data stored locally with consent
- **Cookie Control**: Granular cookie preferences

### Consent Categories

1. **Analytics**: Track visits and usage patterns
2. **Marketing**: Personalized ads and content
3. **Preferences**: Remember user preferences
4. **Necessary**: Required for basic functionality

## Monitoring & Alerting

### Performance Metrics

- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity
- **CLS (Cumulative Layout Shift)**: Visual stability
- **FCP (First Contentful Paint)**: Initial render
- **TTFB (Time to First Byte)**: Server response time
- **INP (Interaction to Next Paint)**: Responsiveness

### Error Tracking

- JavaScript errors
- Network errors
- Performance errors
- Custom error tracking

### Custom Alerts

```tsx
// Track custom errors
trackErrorWithContext('Custom Error', {
  type: 'validation',
  field: 'email',
  message: 'Invalid email format',
})

// Track performance issues
trackPerformanceError('LCP', 5000, 2500)
```

## Best Practices

### Performance

- Monitor Core Web Vitals
- Optimize bundle size
- Use lazy loading
- Implement caching strategies

### Privacy

- Always respect user consent
- Minimize data collection
- Use anonymization
- Provide clear privacy policies

### Implementation

- Use proper event naming conventions
- Include relevant context in events
- Set up conversion tracking
- Monitor user behavior patterns

## Troubleshooting

### Common Issues

1. **Analytics not loading**: Check environment variables
2. **Consent banner not showing**: Verify consent configuration
3. **Performance metrics missing**: Check browser compatibility
4. **Error tracking issues**: Verify Sentry DSN

### Debug Mode

Enable debug logging:

```tsx
// In your analytics provider
const debug = process.env.NODE_ENV === 'development'
```

## Support

For support and questions:

1. Check the troubleshooting section
2. Review environment variables
3. Test in development mode
4. Check browser console for errors

## License

This analytics system is part of the Threads-Boost project and is subject to the same license terms.