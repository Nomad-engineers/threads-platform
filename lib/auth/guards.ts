/**
 * Authentication Guards
 * Reusable guard functions for different auth scenarios
 */

import { authStorage } from './storage'
import type { User } from '@/types/auth'

/**
 * Check if user is authenticated
 */
export function isUserAuthenticated(): boolean {
  const accessToken = authStorage.getAccessToken()
  const user = authStorage.getUser()
  return !!(accessToken && user)
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return authStorage.getUser()
}

/**
 * Check if user has specific subscription tier
 */
export function hasSubscriptionTier(requiredTier: string): boolean {
  const user = getCurrentUser()
  if (!user) return false

  const tiers = ['FREE', 'CREATOR', 'PROFESSIONAL', 'BUSINESS']
  const userTierIndex = tiers.indexOf(user.subscriptionTier)
  const requiredTierIndex = tiers.indexOf(requiredTier)

  return userTierIndex >= requiredTierIndex
}

/**
 * Check if user can access premium features
 */
export function canAccessPremiumFeatures(): boolean {
  return hasSubscriptionTier('CREATOR')
}

/**
 * Check if user can access professional features
 */
export function canAccessProfessionalFeatures(): boolean {
  return hasSubscriptionTier('PROFESSIONAL')
}

/**
 * Check if user can access business features
 */
export function canAccessBusinessFeatures(): boolean {
  return hasSubscriptionTier('BUSINESS')
}

/**
 * Privacy guard component factory
 */
export function createAuthGuard(options: {
  redirectTo?: string
  requireSubscription?: string
  fallback?: React.ReactNode
}) {
  return {
    isAllowed: (): boolean => {
      // Check authentication
      if (!isUserAuthenticated()) {
        return false
      }

      // Check subscription if required
      if (options.requireSubscription && !hasSubscriptionTier(options.requireSubscription)) {
        return false
      }

      return true
    },
    redirectTo: options.redirectTo || '/auth',
    fallback: options.fallback,
  }
}