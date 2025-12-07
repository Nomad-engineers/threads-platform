// Analytics providers component for the entire app

'use client'

import { useEffect, useState } from 'react'
import { googleAnalytics } from '@/lib/analytics/providers/google-analytics'
import { vercelAnalytics } from '@/lib/analytics/providers/vercel-analytics'
import { sentryProvider } from '@/lib/analytics/providers/sentry'
import { consentManager } from '@/lib/analytics/utils/consent'
import { DEFAULT_ANALYTICS_CONFIG } from '@/lib/analytics/config'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [initialized, setInitialized] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  // Initialize analytics providers
  useEffect(() => {
    const initializeAnalytics = async () => {
      // Check initial consent
      const initialConsent = consentManager.getConsent()
      setConsentGiven(initialConsent.analytics)

      // Initialize providers based on consent
      if (initialConsent.analytics) {
        try {
          // Initialize Google Analytics
          if (DEFAULT_ANALYTICS_CONFIG.googleAnalytics?.measurementId) {
            await googleAnalytics.initialize()
          }

          // Initialize Vercel Analytics
          if (DEFAULT_ANALYTICS_CONFIG.vercelAnalytics?.enabled) {
            await vercelAnalytics.initialize()
          }

          // Initialize Sentry
          if (DEFAULT_ANALYTICS_CONFIG.sentry?.dsn) {
            await sentryProvider.initialize(DEFAULT_ANALYTICS_CONFIG.sentry)
          }

          setInitialized(true)
        } catch (error) {
          console.error('[Analytics] Failed to initialize providers:', error)
        }
      }
    }

    initializeAnalytics()
  }, [])

  // Handle consent changes
  useEffect(() => {
    const handleConsentChange = () => {
      const newConsent = consentManager.getConsent()
      setConsentGiven(newConsent.analytics)

      if (newConsent.analytics) {
        // Initialize providers if consent is given
        initializeAnalytics()
      } else {
        // Clear analytics data if consent is removed
        clearAnalyticsData()
      }
    }

    window.addEventListener('consent-changed', handleConsentChange)
    return () => {
      window.removeEventListener('consent-changed', handleConsentChange)
    }
  }, [])

  const clearAnalyticsData = () => {
    // Clear Google Analytics data
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
      })
    }

    // Clear Vercel Analytics data
    if (typeof window !== 'undefined' && 'va' in window) {
      // @ts-ignore
      if (typeof window.va.clear === 'function') {
        // @ts-ignore
        window.va.clear()
      }
    }

    // Clear localStorage data
    const analyticsKeys = ['user_id', 'session_id', 'funnel_data', 'heatmap_data', 'ab_test_data', 'form_abandonment', 'user_behavior']
    analyticsKeys.forEach(key => {
      localStorage.removeItem(key)
    })
  }

  // Track page view on mount
  useEffect(() => {
    if (initialized && consentGiven) {
      googleAnalytics.trackPageView()
      vercelAnalytics.trackPageView()
    }
  }, [initialized, consentGiven])

  return (
    <>
      {/* Load Vercel Analytics script */}
      {DEFAULT_ANALYTICS_CONFIG.vercelAnalytics?.enabled && (
        <script
          src="/_vercel/insights/script.js"
          defer
          data-config='{"dnt":false," telemetry":{"enabled":true,"sampleRate":0.01}}'
        />
      )}

      {children}
    </>
  )
}