export interface DJ {
  id: string
  name: string
  bio: string
  socials: {
    instagram?: string
    twitter?: string
    soundcloud?: string
    spotify?: string
  }
  trackUrl?: string
  slots: string[]
  podcastRssUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Show {
  id: string
  name: string
  description: string
  host: string
  schedule: string[]
  time: string
  djIds: string[]
  segments?: {
    time: string
    segment: string
  }[]
  podcastRssUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Reminder {
  id: string
  djId?: string
  showId?: string
  type: 'show' | 'event' | 'general'
  title: string
  message: string
  scheduledFor: string
  status: 'pending' | 'sent' | 'cancelled' | 'failed'
  sentAt?: string
  cancelledAt?: string
  createdAt: string
  updatedAt: string
}

export interface PodcastEpisode {
  id: string
  title: string
  description: string
  audioUrl: string
  publishedAt: string
  duration?: string
  externalLinks?: {
    spotify?: string
    apple?: string
    google?: string
  }
}

export interface Podcast {
  id: string
  title: string
  description: string
  rssUrl: string
  djId?: string
  showId?: string
  episodes: PodcastEpisode[]
  lastFetched: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface HealthStatus {
  timestamp: string
  services: {
    api: {
      status: 'healthy' | 'degraded' | 'down'
      responseTime?: number
      lastChecked: string
    }
    googleSheets: {
      status: 'healthy' | 'degraded' | 'down'
      lastSync?: string
      lastChecked: string
    }
    telegramBot: {
      status: 'healthy' | 'degraded' | 'down'
      lastMessage?: string
      lastChecked: string
    }
    podcastFeeds: {
      status: 'healthy' | 'degraded' | 'down'
      feedsChecked: number
      failedFeeds: number
      lastChecked: string
    }
  }
}

export interface AdminSettings {
  password: string
  googleSheetsApiKey?: string
  googleSheetsSpreadsheetId?: string
  telegramBotToken?: string
  telegramChannelId?: string
}