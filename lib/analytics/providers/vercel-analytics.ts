// Vercel Analytics integration

import { EventProperties } from '../tracking/events'
import { getPageContext, getDeviceInfo, getCampaignParams } from '../utils/helpers'

class VercelAnalyticsProvider {
  private initialized = false

  async initialize(): Promise<void> {
    if (this.initialized) return

    // Vercel Analytics will be loaded automatically via script
    this.initialized = true
  }

  // Track page view
  async trackPageView(path?: string): Promise<void> {
    if (!this.initialized) return

    // Vercel Analytics automatically tracks page views
    // We can manually track if needed
    if (typeof window !== 'undefined' && 'va' in window) {
      // @ts-ignore
      if (typeof window.va.track === 'function') {
        // @ts-ignore
        window.va.track('page_view', {
          path: path || window.location.pathname,
          title: document.title,
        })
      }
    }
  }

  // Track custom event
  async trackEvent(event: string, properties?: EventProperties): Promise<void> {
    if (!this.initialized) return

    if (typeof window !== 'undefined' && 'va' in window) {
      // @ts-ignore
      if (typeof window.va.track === 'function') {
        // @ts-ignore
        window.va.track(event, properties)
      }
    }
  }

  // Identify user
  async identifyUser(userId: string, properties?: EventProperties): Promise<void> {
    if (!this.initialized) return

    if (typeof window !== 'undefined' && 'va' in window) {
      // @ts-ignore
      if (typeof window.va.identify === 'function') {
        // @ts-ignore
        window.va.identify(userId, properties)
      }
    }
  }

  // Track conversion
  async trackConversion(step: string, properties?: EventProperties): Promise<void> {
    await this.trackEvent('conversion', {
      step,
      ...properties,
    })
  }

  // Track form interaction
  async trackForm(formId: string, action: string, properties?: EventProperties): Promise<void> {
    await this.trackEvent('form_interaction', {
      formId,
      action,
      ...properties,
    })
  }

  // Track click
  async trackClick(element: string, properties?: EventProperties): Promise<void> {
    await this.trackEvent('click', {
      element,
      ...properties,
    })
  }

  // Flush pending events
  async flush(): Promise<void> {
    if (!this.initialized) return

    if (typeof window !== 'undefined' && 'va' in window) {
      // @ts-ignore
      if (typeof window.va.flush === 'function') {
        // @ts-ignore
        window.va.flush()
      }
    }
  }

  // Get provider status
  getStatus(): {
    initialized: boolean
    available: boolean
  } {
    return {
      initialized: this.initialized,
      available: typeof window !== 'undefined' && 'va' in window,
    }
  }
}

// Singleton instance
export const vercelAnalytics = new VercelAnalyticsProvider()

// Script loader for Vercel Analytics
export function loadVercelAnalytics(): void {
  if (typeof window !== 'undefined') {
    // Check if already loaded
    if ('va' in window) return

    // Create script element
    const script = document.createElement('script')
    script.src = '/_vercel/insights/script.js'
    script.defer = true
    script.async = true

    // Load script
    document.head.appendChild(script)

    // Handle load
    script.onload = () => {
      console.log('[Analytics] Vercel Analytics loaded')
    }

    script.onerror = () => {
      console.error('[Analytics] Failed to load Vercel Analytics')
    }
  }
}