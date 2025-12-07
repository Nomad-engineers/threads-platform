/**
 * Threads Profile API Route
 * Handles getting user profile information from Threads API
 */

import { NextRequest, NextResponse } from 'next/server'
import { threadsApi } from '@/lib/api/threads-api'
import { authStorage } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get access token from request (either from Authorization header or from stored token)
    const authHeader = request.headers.get('authorization')
    let accessToken = authHeader?.replace('Bearer ', '')

    // If no token in header, try to get from storage (for client-side requests)
    if (!accessToken) {
      // For server-side requests, we need to get the token differently
      // This is a simplified approach - in production, you might want to use session management
      const cookies = request.cookies.get('accessToken')
      if (cookies) {
        accessToken = cookies.value
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token provided' },
        { status: 401 }
      )
    }

    // Set the token for the API client
    // Note: In a real implementation, you might want to modify the ThreadsApiClient
    // to accept a token parameter or use dependency injection
    const profile = await threadsApi.getUserProfile()

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Threads profile API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch profile'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}