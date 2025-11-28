/**
 * Authentication Module
 * Central export for all auth utilities and configuration
 */

// Configuration
export { AUTH_CONFIG } from './config'

// OAuth utilities
export {
  generateThreadsOAuthUrl,
  parseAuthCode,
  hasAuthCode,
  clearAuthCodeFromUrl,
} from './oauth'

// Storage utilities
export { authStorage } from './storage'

// API utilities
export { authApi } from './api'

// Guards and privacy utilities
export {
  isUserAuthenticated,
  getCurrentUser,
  hasSubscriptionTier,
  canAccessPremiumFeatures,
  canAccessProfessionalFeatures,
  canAccessBusinessFeatures,
  createAuthGuard,
} from './guards'

// Types re-export for convenience
export type { AuthResponse, AuthState, User } from '@/types/auth'