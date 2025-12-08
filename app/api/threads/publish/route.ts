/**
 * Threads Publish API Route
 * Handles publishing content to Threads API
 */

import { NextRequest, NextResponse } from 'next/server'
import { threadsApi } from '@/lib/api/threads-api'
import { authStorage } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, userId, ...postParams } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    let result

    switch (type) {
      case 'text':
        result = await threadsApi.createTextPostContainer(userId.toString(), postParams)
        break
      case 'image':
        result = await threadsApi.createImagePostContainer(userId.toString(), postParams)
        break
      case 'video':
        result = await threadsApi.createVideoPostContainer(userId.toString(), postParams)
        break
      case 'carousel':
        result = await threadsApi.createCarouselPostContainer(userId.toString(), postParams)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid post type. Must be: text, image, video, or carousel' },
          { status: 400 }
        )
    }

    // If auto_publish is true for text posts, the post is already published
    if (type === 'text' && postParams.auto_publish_text) {
      return NextResponse.json({
        id: result.id,
        status: 'PUBLISHED',
        message: 'Text post published successfully'
      })
    }

    // For media posts, we need to wait for processing and then publish
    // Note: In a real implementation, you might want to make this asynchronous
    // or use a job queue for the processing step
    return NextResponse.json({
      containerId: result.id,
      status: result.status,
      message: 'Media container created. Please wait 30 seconds before publishing.',
      nextStep: 'PUBLISH_CONTAINER'
    })
  } catch (error) {
    console.error('Threads publish API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to publish post'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { containerId, userId } = body

    if (!containerId || !userId) {
      return NextResponse.json(
        { error: 'Container ID and User ID are required' },
        { status: 400 }
      )
    }

    const result = await threadsApi.publishMediaContainer(userId.toString(), containerId)

    return NextResponse.json({
      id: result.id,
      status: 'PUBLISHED',
      message: 'Post published successfully'
    })
  } catch (error) {
    console.error('Threads publish (container) API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to publish container'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}