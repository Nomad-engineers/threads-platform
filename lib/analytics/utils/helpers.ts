// Analytics utility helpers

import { EventProperties } from '../tracking/events'

// Generate unique user ID
export function generateUserId(): string {
  if (typeof window === 'undefined') return 'server-user'

  const storedId = localStorage.getItem('user_id')
  if (storedId) return storedId

  const userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  localStorage.setItem('user_id', userId)
  return userId
}

// Get session ID
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server-session'

  let sessionId = sessionStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
    sessionStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

// Get campaign parameters from URL
export function getCampaignParams(): EventProperties {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const campaign: EventProperties = {}

  const campaignParams = {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    gclid: params.get('gclid'),
    fbclid: params.get('fbclid'),
  }

  Object.entries(campaignParams).forEach(([key, value]) => {
    if (value) {
      campaign[key] = value
    }
  })

  return campaign
}

// Get device information
export function getDeviceInfo(): EventProperties {
  if (typeof window === 'undefined') return {}

  const userAgent = navigator.userAgent
  const device: EventProperties = {}

  // Detect device type
  if (/mobile/i.test(userAgent)) {
    device.deviceType = 'mobile'
  } else if (/tablet/i.test(userAgent)) {
    device.deviceType = 'tablet'
  } else {
    device.deviceType = 'desktop'
  }

  // Detect browser
  if (userAgent.includes('Chrome')) device.browser = 'Chrome'
  else if (userAgent.includes('Firefox')) device.browser = 'Firefox'
  else if (userAgent.includes('Safari')) device.browser = 'Safari'
  else if (userAgent.includes('Edge')) device.browser = 'Edge'

  // Detect OS
  if (userAgent.includes('Windows')) device.os = 'Windows'
  else if (userAgent.includes('Mac')) device.os = 'macOS'
  else if (userAgent.includes('Linux')) device.os = 'Linux'
  else if (userAgent.includes('Android')) device.os = 'Android'
  else if (userAgent.includes('iOS')) device.os = 'iOS'

  // Screen resolution
  device.screenWidth = window.screen.width
  device.screenHeight = window.screen.height
  device.viewportWidth = window.innerWidth
  device.viewportHeight = window.innerHeight

  // Connection type
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    device.connectionType = connection.effectiveType || 'unknown'
    device.downlink = connection.downlink
  }

  return device
}

// Get page context
export function getPageContext(): EventProperties {
  if (typeof window === 'undefined') return {}

  return {
    title: document.title,
    url: window.location.href,
    path: window.location.pathname,
    referrer: document.referrer || 'direct',
    timestamp: Date.now(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    userId: getUserId(),
    sessionId: getSessionId(),
  }
}

// Get user ID (stored or generated)
export function getUserId(): string {
  if (typeof window === 'undefined') return 'server-user'
  return generateUserId()
}

// Sanitize event properties for privacy
export function sanitizeEventProperties(properties: EventProperties, sensitiveFields: string[] = []): EventProperties {
  const sanitized = { ...properties }

  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '***' + typeof sanitized[field] === 'string' ? sanitized[field].slice(-4) : 'redacted'
    }
  })

  // Remove empty values
  Object.keys(sanitized).forEach(key => {
    if (sanitized[key] === undefined || sanitized[key] === null || sanitized[key] === '') {
      delete sanitized[key]
    }
  })

  return sanitized
}

// Debounce function for event tracking
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Throttle function for event tracking
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Format timestamp for analytics
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toISOString()
}

// Get elapsed time
export function getElapsedTime(startTime: number): number {
  return Date.now() - startTime
}

// Validate event properties
export function validateEventProperties(properties: EventProperties): boolean {
  if (!properties || typeof properties !== 'object') return false

  // Check for circular references
  try {
    JSON.stringify(properties)
  } catch {
    return false
  }

  // Check property size
  const size = JSON.stringify(properties).length
  if (size > 10000) { // 10KB limit
    console.warn('[Analytics] Event properties too large, truncating')
    return false
  }

  return true
}