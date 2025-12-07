// Performance monitoring hook

import { useEffect, useRef, useState } from 'react'
import { PerformanceMetrics, PERFORMANCE_THRESHOLDS } from '../tracking/performance'
import { consentManager } from '../utils/consent'

interface UsePerformanceMonitoringOptions {
  enableCoreWebVitals?: boolean
  enableResourceTiming?: boolean
  enableUserTiming?: boolean
  reportThreshold?: number
}

export function usePerformanceMonitoring(options: UsePerformanceMonitoringOptions = {}) {
  const {
    enableCoreWebVitals = true,
    enableResourceTiming = true,
    enableUserTiming = true,
    reportThreshold = 100, // Report metrics slower than this (ms)
  } = options

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    LCP: null,
    FID: null,
    CLS: null,
    FCP: null,
    TTFB: null,
    INP: null,
  })

  const [isMonitoring, setIsMonitoring] = useState(false)
  const consentRef = useRef(consentManager.getConsent())

  // Track Core Web Vitals
  useEffect(() => {
    if (!enableCoreWebVitals || !consentRef.current.analytics) return

    // PerformanceObserver for Longest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]

      if (lastEntry.startTime > reportThreshold) {
        setMetrics(prev => ({
          ...prev,
          LCP: lastEntry.startTime,
        }))

        // Report LCP
        reportMetric('LCP', lastEntry.startTime)
      }
    })

    // PerformanceObserver for First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()

      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime
        if (fid > reportThreshold) {
          setMetrics(prev => ({
            ...prev,
            FID: fid,
          }))

          reportMetric('FID', fid)
        }
      })
    })

    // PerformanceObserver for Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0

      entryList.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })

      if (clsValue > 0 && clsValue > PERFORMANCE_THRESHOLDS.CLS.GOOD) {
        setMetrics(prev => ({
          ...prev,
          CLS: clsValue,
        }))

        reportMetric('CLS', clsValue)
      }
    })

    // PerformanceObserver for First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const firstEntry = entries[0]

      if (firstEntry.startTime > reportThreshold) {
        setMetrics(prev => ({
          ...prev,
          FCP: firstEntry.startTime,
        }))

        reportMetric('FCP', firstEntry.startTime)
      }
    })

    // PerformanceObserver for Interaction to Next Paint
    const inpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      let maxINP = 0

      entries.forEach((entry) => {
        const inp = entry.duration
        if (inp > maxINP) {
          maxINP = inp
        }
      })

      if (maxINP > reportThreshold) {
        setMetrics(prev => ({
          ...prev,
          INP: maxINP,
        }))

        reportMetric('INP', maxINP)
      }
    })

    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      fidObserver.observe({ type: 'first-input', buffered: true })
      clsObserver.observe({ type: 'layout-shift', buffered: true })
      fcpObserver.observe({ type: 'paint', buffered: true })
      inpObserver.observe({ type: 'interaction', buffered: true })
      setIsMonitoring(true)
    } catch (error) {
      console.warn('[Analytics] Performance monitoring error:', error)
    }

    return () => {
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
      fcpObserver.disconnect()
      inpObserver.disconnect()
      setIsMonitoring(false)
    }
  }, [enableCoreWebVitals, reportThreshold])

  // Track navigation timing (TTFB)
  useEffect(() => {
    if (!consentRef.current.analytics) return

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart
      if (ttfb > reportThreshold) {
        setMetrics(prev => ({
          ...prev,
          TTFB: ttfb,
        }))

        reportMetric('TTFB', ttfb)
      }
    }
  }, [])

  // Track resource timing
  useEffect(() => {
    if (!enableResourceTiming || !consentRef.current.analytics) return

    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()

      entries.forEach((entry) => {
        if (entry.duration > reportThreshold) {
          reportResourceTiming(entry)
        }
      })
    })

    try {
      resourceObserver.observe({ type: 'resource', buffered: true })
    } catch (error) {
      console.warn('[Analytics] Resource timing monitoring error:', error)
    }

    return () => {
      resourceObserver.disconnect()
    }
  }, [enableResourceTiming, reportThreshold])

  // Update consent on changes
  useEffect(() => {
    const handleConsentChange = () => {
      consentRef.current = consentManager.getConsent()
      // Restart monitoring if consent is given
      if (consentRef.current.analytics) {
        // Would need to re-initialize observers
        setIsMonitoring(false)
        setTimeout(() => setIsMonitoring(true), 100)
      }
    }

    window.addEventListener('consent-changed', handleConsentChange)
    return () => {
      window.removeEventListener('consent-changed', handleConsentChange)
    }
  }, [])

  // Report metric to analytics
  const reportMetric = (metric: keyof PerformanceMetrics, value: number) => {
    const context = {
      metric,
      value,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    }

    console.log('[Analytics] Performance Metric:', context)

    // Send to analytics providers
    // This would be implemented in the provider-specific modules
  }

  // Report resource timing
  const reportResourceTiming = (entry: PerformanceResourceTiming) => {
    const resource = {
      name: entry.name,
      type: getResourceType(entry.name),
      duration: entry.duration,
      size: entry.transferSize,
      url: window.location.href,
      timestamp: Date.now(),
    }

    console.log('[Analytics] Resource Timing:', resource)

    // Send to analytics providers
  }

  // Get resource type from URL
  const getResourceType = (url: string): 'document' | 'stylesheet' | 'script' | 'image' | 'font' | 'other' => {
    if (url.endsWith('.css')) return 'stylesheet'
    if (url.endsWith('.js')) return 'script'
    if (url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) return 'image'
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font'
    if (url.endsWith('.html') || url === window.location.href) return 'document'
    return 'other'
  }

  // Get performance score
  const getPerformanceScore = () => {
    // Calculate score based on metrics
    let score = 100
    let hasMetrics = false

    Object.entries(metrics).forEach(([metric, value]) => {
      if (value !== null) {
        hasMetrics = true
        const threshold = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS]

        if (value > threshold.POOR) {
          score = 0
        } else if (value > threshold.NEEDS_IMPROVEMENT) {
          score -= 25
        } else if (value > threshold.GOOD) {
          score -= 10
        }
      }
    })

    return hasMetrics ? Math.max(0, score) : null
  }

  // Get performance grade
  const getPerformanceGrade = () => {
    const score = getPerformanceScore()
    if (score === null) return 'N/A'

    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  // Get metrics summary
  const getMetricsSummary = () => {
    const summary = {
      ...metrics,
      score: getPerformanceScore(),
      grade: getPerformanceGrade(),
      isMonitoring,
    }

    return summary
  }

  return {
    metrics,
    isMonitoring,
    getMetricsSummary,
    getPerformanceScore,
    getPerformanceGrade,
  }
}