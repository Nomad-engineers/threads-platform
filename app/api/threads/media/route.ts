/**
 * Threads Media API Route
 * Handles fetching user media and individual media details from Threads API
 */

import { NextRequest, NextResponse } from 'next/server'
import { threadsApi } from '@/lib/api/threads-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '25')
    const since = searchParams.get('since')
    const fields = searchParams.get('fields')?.split(',') || ['id', 'media_type', 'media_url', 'permalink', 'caption', 'timestamp']

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const media = await threadsApi.getUserMedia(userId, fields, limit, since || undefined)

    return NextResponse.json(media)
  } catch (error) {
    console.error('Threads media API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch media'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (!mediaId) {
      return NextResponse.json(
        { error: 'Media ID is required' },
        { status: 400 }
      )
    }

    const result = await threadsApi.deleteMedia(mediaId)

    return NextResponse.json({
      success: result.success,
      message: 'Media deleted successfully'
    })
  } catch (error) {
    console.error('Threads media delete API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to delete media'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}