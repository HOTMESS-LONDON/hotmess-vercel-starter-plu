import { DJ, Show, Podcast, Reminder } from './admin-types'

// Mock data store (in production, this would be a database)
let mockDJs: DJ[] = [
  {
    id: 'dj-1',
    name: 'Maxx',
    bio: 'High-energy club talk show host. Messy, provocative and cheeky.',
    socials: {
      instagram: '@maxx_hotmess',
      twitter: '@maxx_hotmess'
    },
    trackUrl: 'https://soundcloud.com/maxx-hotmess',
    slots: ['Wake the Mess'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'dj-2',
    name: 'Bruno',
    bio: 'Host of Dial-a-Daddy. Leather bar philosopher with dry humor.',
    socials: {
      instagram: '@bruno_hotmess',
      soundcloud: 'bruno-hotmess'
    },
    slots: ['Dial-a-Daddy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

let mockShows: Show[] = [
  {
    id: 'show-1',
    name: 'Wake the Mess',
    description: 'High-energy club talk show. Messy, provocative and cheeky. Safe space for late risers and early freaks.',
    host: 'Maxx',
    schedule: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    time: '9AM–11AM',
    djIds: ['dj-1'],
    segments: [
      { time: '09:00', segment: 'Intro stinger + Welcome from Maxx' },
      { time: '09:10', segment: 'HOTMESS Weather for Nobody (AI VO)' },
      { time: '09:20', segment: 'Club gossip round-up (scripted or AI convo)' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'show-2',
    name: 'Dial-a-Daddy',
    description: 'Afternoon advice show with a cheeky twist.',
    host: 'Bruno',
    schedule: ['Monday', 'Wednesday', 'Friday'],
    time: '3PM–4PM',
    djIds: ['dj-2'],
    segments: [
      { time: '15:00', segment: 'Intro sting + Bruno sets the tone' },
      { time: '15:10', segment: 'Voice from the Void – AI reads dirty problem' }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

let mockPodcasts: Podcast[] = []

// CRUD operations for DJs
export function getAllDJs(): DJ[] {
  return [...mockDJs]
}

export function getDJById(id: string): DJ | undefined {
  return mockDJs.find(dj => dj.id === id)
}

export function createDJ(dj: Omit<DJ, 'id' | 'createdAt' | 'updatedAt'>): DJ {
  const newDJ: DJ = {
    ...dj,
    id: `dj-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockDJs.push(newDJ)
  return newDJ
}

export function updateDJ(id: string, updates: Partial<DJ>): DJ | undefined {
  const index = mockDJs.findIndex(dj => dj.id === id)
  if (index === -1) return undefined
  
  mockDJs[index] = {
    ...mockDJs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockDJs[index]
}

export function deleteDJ(id: string): boolean {
  const index = mockDJs.findIndex(dj => dj.id === id)
  if (index === -1) return false
  
  mockDJs.splice(index, 1)
  return true
}

// CRUD operations for Shows
export function getAllShows(): Show[] {
  return [...mockShows]
}

export function getShowById(id: string): Show | undefined {
  return mockShows.find(show => show.id === id)
}

export function createShow(show: Omit<Show, 'id' | 'createdAt' | 'updatedAt'>): Show {
  const newShow: Show = {
    ...show,
    id: `show-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockShows.push(newShow)
  return newShow
}

export function updateShow(id: string, updates: Partial<Show>): Show | undefined {
  const index = mockShows.findIndex(show => show.id === id)
  if (index === -1) return undefined
  
  mockShows[index] = {
    ...mockShows[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockShows[index]
}

export function deleteShow(id: string): boolean {
  const index = mockShows.findIndex(show => show.id === id)
  if (index === -1) return false
  
  mockShows.splice(index, 1)
  return true
}

// CRUD operations for Podcasts
export function getAllPodcasts(): Podcast[] {
  return [...mockPodcasts]
}

export function getPodcastById(id: string): Podcast | undefined {
  return mockPodcasts.find(podcast => podcast.id === id)
}

export function createPodcast(podcast: Omit<Podcast, 'id' | 'createdAt' | 'updatedAt'>): Podcast {
  const newPodcast: Podcast = {
    ...podcast,
    id: `podcast-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockPodcasts.push(newPodcast)
  return newPodcast
}

export function updatePodcast(id: string, updates: Partial<Podcast>): Podcast | undefined {
  const index = mockPodcasts.findIndex(podcast => podcast.id === id)
  if (index === -1) return undefined
  
  mockPodcasts[index] = {
    ...mockPodcasts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return mockPodcasts[index]
}

export function deletePodcast(id: string): boolean {
  const index = mockPodcasts.findIndex(podcast => podcast.id === id)
  if (index === -1) return false
  
  mockPodcasts.splice(index, 1)
  return true
}

// Bulk operations
export function bulkImportDJs(djs: Omit<DJ, 'id' | 'createdAt' | 'updatedAt'>[]): DJ[] {
  const newDJs = djs.map(dj => createDJ(dj))
  return newDJs
}

export function bulkImportShows(shows: Omit<Show, 'id' | 'createdAt' | 'updatedAt'>[]): Show[] {
  const newShows = shows.map(show => createShow(show))
  return newShows
}