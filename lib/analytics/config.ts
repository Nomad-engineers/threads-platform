// Analytics configuration and providers

export interface AnalyticsConfig {
  googleAnalytics?: {
    measurementId: string
    enableEcommerce: boolean
  }
  sentry?: {
    dsn: string
    environment: string
    tracesSampleRate: number
  }
  vercelAnalytics?: {
    enabled: boolean
  }
  performance?: {
    enableCoreWebVitals: boolean
    enableResourceTiming: boolean
    enableUserTiming: boolean
  }
  privacy?: {
    enableGdprCompliance: boolean
    enableCcpaCompliance: boolean
    anonymizeIp: boolean
  }
}

export const DEFAULT_ANALYTICS_CONFIG: AnalyticsConfig = {
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    enableEcommerce: true,
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: 0.1,
  },
  vercelAnalytics: {
    enabled: process.env.VERCEL_ANALYTICS_ENABLED === 'true',
  },
  performance: {
    enableCoreWebVitals: true,
    enableResourceTiming: true,
    enableUserTiming: true,
  },
  privacy: {
    enableGdprCompliance: true,
    enableCcpaCompliance: true,
    anonymizeIp: true,
  },
}