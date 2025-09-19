import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAccess } from '@/lib/admin-auth'
import { getAllPodcasts, createPodcast, updatePodcast } from '@/lib/mock-data'
import { fetchPodcastFeed, updatePodcastFeed } from '@/lib/podcast-utils'

export async function GET(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const podcasts = getAllPodcasts()
    return NextResponse.json(podcasts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch podcasts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { rssUrl, title, description, djId, showId } = await request.json()
    
    if (!rssUrl) {
      return NextResponse.json({ error: 'RSS URL required' }, { status: 400 })
    }
    
    // Fetch initial episodes
    const episodes = await fetchPodcastFeed(rssUrl)
    
    const newPodcast = createPodcast({
      title: title || 'Untitled Podcast',
      description: description || '',
      rssUrl,
      djId,
      showId,
      episodes,
      lastFetched: new Date().toISOString(),
      isActive: true,
    })
    
    return NextResponse.json(newPodcast, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create podcast' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'refresh-all') {
      // Refresh all active podcast feeds
      const podcasts = getAllPodcasts()
      const refreshPromises = podcasts
        .filter(p => p.isActive)
        .map(async podcast => {
          try {
            const updatedPodcast = await updatePodcastFeed(podcast)
            updatePodcast(podcast.id, updatedPodcast)
            return { id: podcast.id, success: true }
          } catch (error) {
            return { id: podcast.id, success: false, error: error instanceof Error ? error.message : 'Unknown error' }
          }
        })
      
      const results = await Promise.all(refreshPromises)
      
      return NextResponse.json({
        refreshed: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to refresh podcasts' }, { status: 500 })
  }
}