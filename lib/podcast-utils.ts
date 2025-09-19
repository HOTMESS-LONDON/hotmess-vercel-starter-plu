import Parser from 'rss-parser'
import { Podcast, PodcastEpisode } from './admin-types'

const rssParser = new Parser()

export async function fetchPodcastFeed(rssUrl: string): Promise<PodcastEpisode[]> {
  try {
    const feed = await rssParser.parseURL(rssUrl)
    
    return feed.items.map((item, index) => ({
      id: `${Date.now()}-${index}`,
      title: item.title || 'Untitled Episode',
      description: item.contentSnippet || item.content || '',
      audioUrl: item.enclosure?.url || '',
      publishedAt: item.pubDate || new Date().toISOString(),
      duration: item.itunes?.duration,
      externalLinks: {
        spotify: extractSpotifyLink(item.link),
        apple: extractAppleLink(item.link),
        google: extractGoogleLink(item.link),
      }
    }))
  } catch (error) {
    console.error('Error fetching podcast feed:', error)
    return []
  }
}

function extractSpotifyLink(link?: string): string | undefined {
  if (!link) return undefined
  if (link.includes('spotify.com')) return link
  return undefined
}

function extractAppleLink(link?: string): string | undefined {
  if (!link) return undefined
  if (link.includes('apple.com') || link.includes('podcasts.apple.com')) return link
  return undefined
}

function extractGoogleLink(link?: string): string | undefined {
  if (!link) return undefined
  if (link.includes('podcasts.google.com')) return link
  return undefined
}

export async function updatePodcastFeed(podcast: Podcast): Promise<Podcast> {
  const episodes = await fetchPodcastFeed(podcast.rssUrl)
  
  return {
    ...podcast,
    episodes: episodes.slice(0, 50), // Keep latest 50 episodes
    lastFetched: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}