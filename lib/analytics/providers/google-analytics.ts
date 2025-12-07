// Google Analytics 4 integration with Enhanced Ecommerce

import { EventProperties, ConversionEvent } from '../tracking/events'
import { getPageContext, getDeviceInfo, getCampaignParams } from '../utils/helpers'
import { consentManager } from '../utils/consent'

class GoogleAnalyticsProvider {
  private initialized = false
  private measurementId: string

  constructor(measurementId: string) {
    this.measurementId = measurementId
  }

  async initialize(): Promise<void> {
    if (this.initialized) return

    if (!consentManager.hasConsent('analytics')) return

    // Load Google Analytics script
    this.loadGoogleAnalytics()

    this.initialized = true
  }

  // Load Google Analytics script
  private loadGoogleAnalytics(): void {
    if (typeof window === 'undefined') return

    // Check if already loaded
    if (window.gtag) return

    // Create script element
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag() {
      // @ts-ignore
      window.dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', this.measurementId, {
      send_page_view: true,
      send_to: this.measurementId,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      anonymize_ip: true,
      link_attribution: true,
      page_load_timing: true,
      send_page_view: true,
      custom_map: {
        dimension1: 'user_id',
        dimension2: 'session_id',
        dimension3: 'device_type',
        dimension4: 'browser',
        dimension5: 'os',
        dimension6: 'utm_source',
        dimension7: 'utm_medium',
        dimension8: 'utm_campaign',
      },
    })

    // Store gtag function reference
    window.gtag = gtag
  }

  // Track page view
  async trackPageView(path?: string): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()
    const device = getDeviceInfo()
    const campaign = getCampaignParams()

    // Set custom dimensions
    this.setCustomDimensions({
      user_id: context.userId,
      session_id: context.sessionId,
      device_type: device.deviceType,
      browser: device.browser,
      os: device.os,
      utm_source: campaign.utm_source,
      utm_medium: campaign.utm_medium,
      utm_campaign: campaign.utm_campaign,
    })

    // Send page view
    window.gtag('event', 'page_view', {
      page_title: context.title,
      page_location: context.url,
      page_path: path || context.path,
      send_to: this.measurementId,
    })
  }

  // Track custom event
  async trackEvent(event: string, properties?: EventProperties): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()
    const device = getDeviceInfo()
    const campaign = getCampaignParams()

    const eventProperties = {
      event_category: 'engagement',
      event_label: context.path,
      ...properties,
      user_id: context.userId,
      session_id: context.sessionId,
      timestamp: Date.now(),
    }

    window.gtag('event', event, {
      ...eventProperties,
      send_to: this.measurementId,
    })
  }

  // Track conversion event
  async trackConversion(event: ConversionEvent, properties?: EventProperties): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()
    const device = getDeviceInfo()
    const campaign = getCampaignParams()

    const conversionData = {
      step: event.step,
      currency: 'USD',
      value: properties?.price || 0,
      ...properties,
      user_id: context.userId,
      session_id: context.sessionId,
    }

    window.gtag('event', 'conversion', {
      ...conversionData,
      send_to: this.measurementId,
    })
  }

  // Track ecommerce event
  async trackEcommerceEvent(event: string, ecommerceData: any): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()

    window.gtag('event', event, {
      ecommerce: ecommerceData,
      user_id: context.userId,
      session_id: context.sessionId,
      send_to: this.measurementId,
    })
  }

  // Add product to cart
  async addToCart(product: any, quantity: number = 1): Promise<void> {
    await this.trackEcommerceEvent('add_to_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          quantity: quantity,
          price: product.price,
          currency: 'USD',
        },
      ],
    })
  }

  // Remove from cart
  async removeFromCart(product: any, quantity: number = 1): Promise<void> {
    await this.trackEcommerceEvent('remove_from_cart', {
      currency: 'USD',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          quantity: quantity,
          price: product.price,
          currency: 'USD',
        },
      ],
    })
  }

  // Begin checkout
  async beginCheckout(cart: any): Promise<void> {
    await this.trackEcommerceEvent('begin_checkout', {
      currency: 'USD',
      value: cart.total,
      items: cart.items,
    })
  }

  // Track purchase
  async trackPurchase(transaction: any): Promise<void> {
    await this.trackEcommerceEvent('purchase', {
      currency: 'USD',
      value: transaction.value,
      transaction_id: transaction.id,
      affiliation: transaction.affiliation,
      tax: transaction.tax,
      shipping: transaction.shipping,
      items: transaction.items,
    })
  }

  // Set custom dimensions
  async setCustomDimensions(dimensions: Record<string, any>): Promise<void> {
    if (!this.initialized || !window.gtag) return

    Object.entries(dimensions).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        window.gtag('set', { [key]: value })
      }
    })
  }

  // Set user properties
  async setUserProperties(properties: Record<string, any>): Promise<void> {
    if (!this.initialized || !window.gtag) return

    window.gtag('set', 'user_properties', properties)
  }

  // Identify user
  async identifyUser(userId: string, properties?: Record<string, any>): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const userProperties = {
      user_id: userId,
      ...properties,
    }

    await this.setUserProperties(userProperties)
    await this.setCustomDimensions({
      user_id: userId,
    })
  }

  // Track search
  async trackSearch(query: string, properties?: EventProperties): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()

    window.gtag('event', 'search', {
      search_term: query,
      event_category: 'engagement',
      event_label: context.path,
      user_id: context.userId,
      session_id: context.sessionId,
      send_to: this.measurementId,
      ...properties,
    })
  }

  // Track social interaction
  async trackSocialInteraction(network: string, action: string, target: string): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()

    window.gtag('event', 'social_interaction', {
      social_network: network,
      social_action: action,
      social_target: target,
      event_category: 'social',
      event_label: context.path,
      user_id: context.userId,
      session_id: context.sessionId,
      send_to: this.measurementId,
    })
  }

  // Track form submission
  async trackFormSubmit(formId: string, properties?: EventProperties): Promise<void> {
    if (!this.initialized || !window.gtag) return

    const context = getPageContext()

    window.gtag('event', 'generate_lead', {
      form_id: formId,
      event_category: 'engagement',
      event_label: context.path,
      user_id: context.userId,
      session_id: context.sessionId,
      send_to: this.measurementId,
      ...properties,
    })
  }

  // Get provider status
  getStatus(): {
    initialized: boolean
    available: boolean
    measurementId: string
  } {
    return {
      initialized: this.initialized,
      available: typeof window !== 'undefined' && 'gtag' in window,
      measurementId: this.measurementId,
    }
  }
}

// Singleton instance
export const googleAnalytics = new GoogleAnalyticsProvider(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '')

// Initialize Google Analytics
export async function initializeGoogleAnalytics(): Promise<void> {
  await googleAnalytics.initialize()
}