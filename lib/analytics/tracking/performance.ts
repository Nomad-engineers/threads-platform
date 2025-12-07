// Core Web Vitals and performance tracking

export interface PerformanceMetrics {
  LCP: number | null
  FID: number | null
  CLS: number | null
  FCP: number | null
  TTFB: number | null
  INP: number | null
}

export interface ResourceTiming {
  name: string
  type: 'document' | 'stylesheet' | 'script' | 'image' | 'font' | 'other'
  startTime: number
  duration: number
  size: number
  transferSize: number
}

export interface NavigationTiming {
  dnsLookup: number
  tcpConnection: number
  serverResponse: number
  domInteractive: number
  domComplete: number
  loadComplete: number
  firstPaint: number
  firstContentfulPaint: number
}

export interface CustomPerformanceMetric {
  name: string
  value: number
  category: 'custom' | 'business' | 'ux'
  tags: string[]
}

// Performance threshold constants
export const PERFORMANCE_THRESHOLDS = {
  LCP: {
    GOOD: 2500,
    NEEDS_IMPROVEMENT: 4000,
    POOR: Infinity,
  },
  FID: {
    GOOD: 100,
    NEEDS_IMPROVEMENT: 300,
    POOR: Infinity,
  },
  CLS: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
    POOR: Infinity,
  },
  FCP: {
    GOOD: 1800,
    NEEDS_IMPROVEMENT: 3000,
    POOR: Infinity,
  },
  TTFB: {
    GOOD: 800,
    NEEDS_IMPROVEMENT: 1800,
    POOR: Infinity,
  },
  INP: {
    GOOD: 200,
    NEEDS_IMPROVEMENT: 500,
    POOR: Infinity,
  },
} as const

// Calculate performance score
export function calculatePerformanceScore(metrics: Partial<PerformanceMetrics>): number {
  const weights = {
    LCP: 0.25,
    FID: 0.15,
    CLS: 0.15,
    FCP: 0.15,
    TTFB: 0.15,
    INP: 0.15,
  }

  let totalScore = 0
  let totalWeight = 0

  Object.entries(weights).forEach(([metric, weight]) => {
    const value = metrics[metric as keyof PerformanceMetrics]
    if (value !== null) {
      const threshold = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS]
      let score = 0

      if (value <= threshold.GOOD) {
        score = 100
      } else if (value <= threshold.NEEDS_IMPROVEMENT) {
        score = 50
      } else {
        score = 0
      }

      totalScore += score * weight
      totalWeight += weight
    }
  })

  return totalWeight > 0 ? totalScore / totalWeight : 0
}

// Get performance grade
export function getPerformanceGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'E' | 'F' {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  if (score >= 50) return 'E'
  return 'F'
}

// Format performance value for display
export function formatPerformanceValue(value: number | null, unit: string): string {
  if (value === null) return 'N/A'
  return `${value.toFixed(2)} ${unit}`
}