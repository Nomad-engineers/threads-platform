// Privacy and consent management

export interface ConsentPreferences {
  analytics: boolean
  marketing: boolean
  preferences: boolean
  necessary: boolean
}

export class ConsentManager {
  private static instance: ConsentManager
  private consentKey = 'user_consent'
  private preferences: ConsentPreferences

  private constructor() {
    this.preferences = this.getStoredConsent() || {
      analytics: false,
      marketing: false,
      preferences: false,
      necessary: true, // Necessary cookies are always allowed
    }
  }

  static getInstance(): ConsentManager {
    if (!ConsentManager.instance) {
      ConsentManager.instance = new ConsentManager()
    }
    return ConsentManager.instance
  }

  private getStoredConsent(): ConsentPreferences | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(this.consentKey)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  updateConsent(preferences: Partial<ConsentPreferences>): void {
    this.preferences = {
      ...this.preferences,
      ...preferences,
      necessary: true, // Always true
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.consentKey, JSON.stringify(this.preferences))
      this.consentChanged(this.preferences)
    }
  }

  getConsent(): ConsentPreferences {
    return { ...this.preferences }
  }

  hasConsent(type: keyof ConsentPreferences): boolean {
    return this.preferences[type]
  }

  private consentChanged(preferences: ConsentPreferences): void {
    // Dispatch custom event for consent changes
    window.dispatchEvent(new CustomEvent('consent-changed', {
      detail: preferences,
    }))
  }

  // GDPR compliance helpers
  getGdprComplianceStatus(): {
    isCompliant: boolean
    requiresConsent: boolean
    hasConsent: boolean
    consentTypes: string[]
  } {
    const requiresConsent = typeof navigator !== 'undefined' && navigator.permissions && navigator.permissions.query
    const hasConsent = this.hasConsent('analytics')

    return {
      isCompliant: true, // Assuming compliant implementation
      requiresConsent,
      hasConsent,
      consentTypes: Object.keys(this.preferences).filter(key => this.hasConsent(key as keyof ConsentPreferences)),
    }
  }

  // CCPA compliance helpers
  getCCPAComplianceStatus(): {
    isSaleOfPersonalInformation: boolean
    optedOut: boolean
    hasOptOut: boolean
  } {
    // CCPA implementation specifics
    const optedOut = this.hasConsent('marketing') === false
    const hasOptOut = localStorage.getItem('ccpa_opt_out') === 'true'

    return {
      isSaleOfPersonalInformation: false,
      optedOut,
      hasOptOut,
    }
  }

  // Reset all non-necessary consent
  resetNonEssentialConsent(): void {
    this.updateConsent({
      analytics: false,
      marketing: false,
      preferences: false,
    })
  }

  // Get consent cookie string for GDPR
  getConsentCookieString(): string {
    const { analytics, marketing, preferences } = this.preferences
    return [
      analytics ? 'analytics=1' : 'analytics=0',
      marketing ? 'marketing=1' : 'marketing=0',
      preferences ? 'preferences=1' : 'preferences=0',
    ].join('; ')
  }
}

// Global consent manager instance
export const consentManager = ConsentManager.getInstance()