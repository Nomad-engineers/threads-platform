// Custom tracking utilities and functions

import { EventProperties, PageViewEvent, ClickEvent, ConversionEvent } from './events'

// User journey tracking
export function trackUserJourney(event: 'page_view' | 'scroll' | 'click', properties: EventProperties): void {
  // Implementation for user journey tracking
  console.log('[Analytics] User Journey:', { event, properties, timestamp: Date.now() })
}

// Funnel tracking
export function trackFunnel(step: ConversionEvent['step'], properties?: EventProperties): void {
  const eventData = {
    step,
    timestamp: Date.now(),
    ...properties,
  }

  // Track funnel progression
  console.log('[Analytics] Funnel:', eventData)

  // Store in localStorage for funnel analysis
  const funnelData = getFunnelData()
  funnelData.push(eventData)
  localStorage.setItem('funnel_data', JSON.stringify(funnelData))
}

// Get stored funnel data
export function getFunnelData(): Array<{step: string; timestamp: number; [key: string]: any}> {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('funnel_data')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Clear funnel data
export function clearFunnelData(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('funnel_data')
}

// Heatmap data collection
export function trackHeatmapInteraction(event: MouseEvent, element: HTMLElement): void {
  const rect = element.getBoundingClientRect()
  const data = {
    x: event.clientX,
    y: event.clientY,
    element: element.tagName.toLowerCase(),
    width: rect.width,
    height: rect.height,
    timestamp: Date.now(),
    pageUrl: window.location.href,
    scrollPercentage: getScrollPercentage(),
  }

  // Store heatmap data
  const heatmapData = getHeatmapData()
  heatmapData.push(data)

  // Keep only last 1000 interactions per page
  if (heatmapData.length > 1000) {
    heatmapData.splice(0, heatmapData.length - 1000)
  }

  localStorage.setItem('heatmap_data', JSON.stringify(heatmapData))
}

// Get stored heatmap data
export function getHeatmapData(): Array<any> {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('heatmap_data')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Calculate scroll percentage
export function getScrollPercentage(): number {
  if (typeof window === 'undefined') return 0

  const scrollY = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const totalScroll = documentHeight - windowHeight
  const scrollPercent = totalScroll > 0 ? (scrollY / totalScroll) * 100 : 0

  return Math.round(scrollPercent)
}

// Track A/B test exposure
export function trackABTest(experimentId: string, variant: string): void {
  const testData = {
    experimentId,
    variant,
    timestamp: Date.now(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
  }

  const abData = getABTestData()
  abData.push(testData)
  localStorage.setItem('ab_test_data', JSON.stringify(abData))
}

// Get A/B test data
export function getABTestData(): Array<any> {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('ab_test_data')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Track form abandonment
export function trackFormAbandonment(formId: string, step: string): void {
  const abandonmentData = {
    formId,
    step,
    timestamp: Date.now(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
  }

  const formAbandonment = getFormAbandonmentData()
  formAbandonment.push(abandonmentData)
  localStorage.setItem('form_abandonment', JSON.stringify(formAbandonment))
}

// Get form abandonment data
export function getFormAbandonmentData(): Array<any> {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('form_abandonment')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Track user behavior flow
export function trackUserBehavior(action: 'scroll' | 'click' | 'hover', element?: string): void {
  const behaviorData = {
    action,
    element,
    timestamp: Date.now(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    scrollPercentage: getScrollPercentage(),
  }

  const behaviorFlow = getUserBehaviorFlow()
  behaviorFlow.push(behaviorData)

  // Keep only last 500 events per session
  if (behaviorFlow.length > 500) {
    behaviorFlow.splice(0, behaviorFlow.length - 500)
  }

  localStorage.setItem('user_behavior', JSON.stringify(behaviorFlow))
}

// Get user behavior flow data
export function getUserBehaviorFlow(): Array<any> {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem('user_behavior')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}