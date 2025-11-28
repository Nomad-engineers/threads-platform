/**
 * OAuth Utilities
 * Helper functions for Threads OAuth flow
 */

import { AUTH_CONFIG } from './config'

/**
 * Generate Threads OAuth authorization URL
 */
export function generateThreadsOAuthUrl(): string {
  const { clientId, redirectUri, scopes } = AUTH_CONFIG.oauth
  const scopeString = scopes.join(',')

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scopeString,
  })

  return `https://threads.net/oauth/authorize?${params.toString()}`
}

/**
 * Parse authorization code from URL
 */
export function parseAuthCode(url: string): string | null {
  const urlParams = new URLSearchParams(url)
  return urlParams.get('code')
}

/**
 * Check if current URL contains auth code
 */
export function hasAuthCode(): boolean {
  if (typeof window === 'undefined') return false
  return parseAuthCode(window.location.search) !== null
}

/**
 * Clear auth code from URL
 */
export function clearAuthCodeFromUrl(): void {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  url.searchParams.delete('code')

  // Update URL without page reload
  window.history.replaceState({}, '', url.toString())
}