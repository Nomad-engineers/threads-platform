// Sentry integration for error tracking

import * as Sentry from '@sentry/nextjs'
import { EventProperties } from '../tracking/events'

class SentryProvider {
  private initialized = false

  async initialize(config: { dsn: string; environment: string; tracesSampleRate: number }): Promise<void> {
    if (this.initialized) return

    // Initialize Sentry regardless of consent - consent is handled in instrumentation
    Sentry.init({
      dsn: config.dsn,
      environment: config.environment,
      tracesSampleRate: config.tracesSampleRate,
      // Set sample rate for performance monitoring
      profilesSampleRate: 1.0,
    })

    this.initialized = true
  }

  // Capture error
  async captureError(error: Error | string, context?: EventProperties): Promise<void> {
    if (!this.initialized) return

    if (typeof error === 'string') {
      Sentry.captureMessage(error, 'error', context)
    } else {
      Sentry.captureException(error, context)
    }
  }

  // Capture exception
  async captureException(exception: any, context?: EventProperties): Promise<void> {
    if (!this.initialized) return

    Sentry.captureException(exception, context)
  }

  // Capture message
  async captureMessage(message: string, level: 'log' | 'info' | 'warn' | 'error' = 'error', context?: EventProperties): Promise<void> {
    if (!this.initialized) return

    Sentry.captureMessage(message, level, context)
  }

  // Set user context
  async setUser(user: { id?: string; email?: string; username?: string }): Promise<void> {
    if (!this.initialized) return

    Sentry.setUser(user)
  }

  // Clear user context
  async clearUser(): Promise<void> {
    if (!this.initialized) return

    Sentry.setUser(null)
  }

  // Set tags
  async setTags(tags: Record<string, string>): Promise<void> {
    if (!this.initialized) return

    Sentry.getCurrentScope().setTags(tags)
  }

  // Set extra context
  async setContext(key: string, context: any): Promise<void> {
    if (!this.initialized) return

    Sentry.getCurrentScope().setContext(key, context)
  }

  // Track performance transaction
  async startTransaction(name: string, options?: any): Promise<any> {
    if (!this.initialized) return null

    // Note: startTransaction is deprecated, use startSpan instead
    return Sentry.startSpan({ name, ...options }, () => {})
  }

  // Add breadcrumb
  async addBreadcrumb(breadcrumb: { message: string; level?: string; category?: string; data?: any }): Promise<void> {
    if (!this.initialized) return

    Sentry.addBreadcrumb(breadcrumb)
  }

  // Capture exception with context
  async captureErrorWithContext(error: Error | string, context?: EventProperties): Promise<void> {
    if (!this.initialized) return

    const scope = Sentry.getCurrentScope()

    // Add custom context
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value)
      })
    }

    // Add page context
    if (typeof window !== 'undefined') {
      scope.setExtra('url', window.location.href)
      scope.setExtra('path', window.location.pathname)
      scope.setExtra('referrer', document.referrer)
      scope.setExtra('userAgent', navigator.userAgent)
    }

    if (typeof error === 'string') {
      Sentry.captureMessage(error, 'error')
    } else {
      Sentry.captureException(error)
    }
  }

  // Track custom error
  async trackCustomError(errorType: string, message: string, context?: EventProperties): Promise<void> {
    await this.captureErrorWithContext(message, {
      type: errorType,
      ...context,
    })
  }

  // Track network errors
  async trackNetworkError(url: string, status: number, message?: string): Promise<void> {
    await this.captureErrorWithContext('Network Error', {
      url,
      status,
      message: message || `HTTP ${status}`,
      category: 'network',
    })
  }

  // Track performance errors
  async trackPerformanceError(metric: string, value: number, threshold: number): Promise<void> {
    await this.captureErrorWithContext('Performance Error', {
      metric,
      value,
      threshold,
      category: 'performance',
    })
  }

  // Get provider status
  getStatus(): {
    initialized: boolean
    available: boolean
    userId: string | null
  } {
    return {
      initialized: this.initialized,
      available: true,
      userId: Sentry.getCurrentScope().getUser()?.id || null,
    }
  }
}

// Singleton instance
export const sentryProvider = new SentryProvider()

// Initialize Sentry with environment variables
export async function initializeSentry(): Promise<void> {
  const config = {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  }

  await sentryProvider.initialize(config)
}