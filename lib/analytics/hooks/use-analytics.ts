// React hook for analytics tracking

import { useEffect, useRef } from 'react'
import { EventProperties, PageViewEvent } from '../tracking/events'
import { consentManager } from '../utils/consent'
import { getPageContext, getDeviceInfo, getCampaignParams } from '../utils/helpers'

interface UseAnalyticsOptions {
  enablePageViews?: boolean
  enableAutoTracking?: boolean
  enableConsentCheck?: boolean
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    enablePageViews = true,
    enableAutoTracking = true,
    enableConsentCheck = true,
  } = options

  const consentRef = useRef(consentManager.getConsent())

  // Track page views
  const trackPageView = (event: Partial<PageViewEvent> = {}) => {
    if (!enableConsentCheck || consentRef.current.analytics) {
      const context = getPageContext()
      const device = getDeviceInfo()
      const campaign = getCampaignParams()

      const pageViewEvent: PageViewEvent = {
        path: context.path,
        title: context.title,
        location: context.url,
        referrer: context.referrer,
        ...event,
      }

      console.log('[Analytics] Page View:', {
        ...pageViewEvent,
        context,
        device,
        campaign,
        userId: context.userId,
        sessionId: context.sessionId,
      })

      // Send to analytics providers
      // This would be implemented in the provider-specific modules
    }
  }

  // Track custom events
  const trackEvent = (eventName: string, properties?: EventProperties) => {
    if (!enableConsentCheck || consentRef.current.analytics) {
      const context = getPageContext()
      const device = getDeviceInfo()
      const campaign = getCampaignParams()

      const event = {
        event: eventName,
        timestamp: Date.now(),
        ...properties,
        context,
        device,
        campaign,
        userId: context.userId,
        sessionId: context.sessionId,
      }

      console.log('[Analytics] Event:', event)

      // Send to analytics providers
    }
  }

  // Track conversions
  const trackConversion = (step: 'visit' | 'signup' | 'activation' | 'purchase', properties?: EventProperties) => {
    trackEvent('conversion', {
      step,
      ...properties,
    })
  }

  // Track form interactions
  const trackForm = (formId: string, action: 'start' | 'progress' | 'completion' | 'abandonment', properties?: EventProperties) => {
    trackEvent('form_interaction', {
      formId,
      action,
      ...properties,
    })
  }

  // Track clicks
  const trackClick = (element: string, properties?: EventProperties) => {
    trackEvent('click', {
      element,
      ...properties,
    })
  }

  // Update consent status
  const updateConsent = (preferences: Partial<consentManager['preferences']>) => {
    consentManager.updateConsent(preferences)
    consentRef.current = consentManager.getConsent()
  }

  // Auto-track page views
  useEffect(() => {
    if (enablePageViews && enableAutoTracking) {
      trackPageView()

      // Track on route change (Next.js)
      const handleRouteChange = (url: string) => {
        trackPageView({
          path: url,
          title: document.title,
        })
      }

      // Listen for route changes
      window.addEventListener('routeChange', handleRouteChange)

      return () => {
        window.removeEventListener('routeChange', handleRouteChange)
      }
    }
  }, [enablePageViews, enableAutoTracking])

  // Update consent on changes
  useEffect(() => {
    const handleConsentChange = () => {
      consentRef.current = consentManager.getConsent()
    }

    window.addEventListener('consent-changed', handleConsentChange)
    return () => {
      window.removeEventListener('consent-changed', handleConsentChange)
    }
  }, [])

  return {
    trackPageView,
    trackEvent,
    trackConversion,
    trackForm,
    trackClick,
    updateConsent,
    hasConsent: (type: keyof typeof consentManager['preferences']) => consentRef.current[type],
  }
}