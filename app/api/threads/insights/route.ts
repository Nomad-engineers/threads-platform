/**
 * Threads Insights API Route
 * Handles fetching insights and analytics from Threads API
 */

import { NextRequest, NextResponse } from 'next/server'
import { threadsApi } from '@/lib/api/threads-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'media' or 'user'
    const id = searchParams.get('id')
    const metrics = searchParams.get('metrics')?.split(',') || ['views', 'likes', 'replies', 'reposts', 'quotes', 'shares']
    const since = searchParams.get('since')
    const until = searchParams.get('until')

    if (!id) {
      return NextResponse.json(
        { error: 'ID (media ID or user ID) is required' },
        { status: 400 }
      )
    }

    if (!type || !['media', 'user'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "media" or "user"' },
        { status: 400 }
      )
    }

    let insights

    if (type === 'media') {
      insights = await threadsApi.getMediaInsights(id, metrics)
    } else {
      insights = await threadsApi.getUserInsights(id, metrics, since || undefined, until || undefined)
    }

    return NextResponse.json({
      data: insights,
      type,
      id,
      metrics,
      timeRange: { since, until }
    })
  } catch (error) {
    console.error('Threads insights API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch insights'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}