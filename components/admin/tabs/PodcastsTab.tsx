'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Plus, RefreshCw, ExternalLink, Play } from 'lucide-react'
import { Podcast } from '@/lib/admin-types'

interface PodcastsTabProps {
  token: string
}

export function PodcastsTab({ token }: PodcastsTabProps) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPodcastUrl, setNewPodcastUrl] = useState('')

  const fetchPodcasts = async () => {
    try {
      const response = await fetch('/api/admin/podcasts', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setPodcasts(data)
      }
    } catch (error) {
      console.error('Failed to fetch podcasts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [token])

  const handleRefreshAll = async () => {
    setRefreshing(true)
    try {
      const response = await fetch('/api/admin/podcasts?action=refresh-all', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        alert(`Refreshed ${data.refreshed} podcasts, ${data.failed} failed`)
        fetchPodcasts()
      }
    } catch (error) {
      console.error('Failed to refresh podcasts:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const handleAddPodcast = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPodcastUrl) return

    try {
      const response = await fetch('/api/admin/podcasts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rssUrl: newPodcastUrl,
          title: 'New Podcast',
          description: '',
        }),
      })

      if (response.ok) {
        setNewPodcastUrl('')
        setShowAddForm(false)
        fetchPodcasts()
      }
    } catch (error) {
      console.error('Failed to add podcast:', error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">Loading podcasts...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Podcasts Management</CardTitle>
              <CardDescription>
                Manage podcast RSS feeds and episodes for DJs and shows
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRefreshAll}
                disabled={refreshing}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh All
              </Button>
              <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Podcast
              </Button>
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddPodcast} className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="rss-url">RSS Feed URL</Label>
                  <Input
                    id="rss-url"
                    type="url"
                    value={newPodcastUrl}
                    onChange={(e) => setNewPodcastUrl(e.target.value)}
                    placeholder="https://example.com/podcast.rss"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Add Podcast</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardHeader>
      </Card>

      {/* Podcasts List */}
      {podcasts.length === 0 ? (
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-muted-foreground">
              No podcasts configured. Add a podcast RSS feed to get started.
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {podcasts.map((podcast) => (
            <Card key={podcast.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{podcast.title}</CardTitle>
                    <CardDescription>{podcast.description}</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={podcast.isActive ? 'default' : 'secondary'}>
                        {podcast.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Last updated: {new Date(podcast.lastFetched).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={podcast.rssUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className="font-medium mb-3">
                    Latest Episodes ({podcast.episodes.length})
                  </h4>
                  {podcast.episodes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No episodes found</p>
                  ) : (
                    <div className="space-y-2">
                      {podcast.episodes.slice(0, 5).map((episode) => (
                        <div
                          key={episode.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{episode.title}</h5>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {new Date(episode.publishedAt).toLocaleDateString()}
                              </span>
                              {episode.duration && (
                                <span className="text-xs text-muted-foreground">
                                  {episode.duration}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1 ml-4">
                            {episode.audioUrl && (
                              <Button size="sm" variant="ghost" asChild>
                                <a href={episode.audioUrl} target="_blank" rel="noopener noreferrer">
                                  <Play className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {episode.externalLinks?.spotify && (
                              <Button size="sm" variant="ghost" asChild>
                                <a href={episode.externalLinks.spotify} target="_blank" rel="noopener noreferrer">
                                  <span className="text-xs">SP</span>
                                </a>
                              </Button>
                            )}
                            {episode.externalLinks?.apple && (
                              <Button size="sm" variant="ghost" asChild>
                                <a href={episode.externalLinks.apple} target="_blank" rel="noopener noreferrer">
                                  <span className="text-xs">AP</span>
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      {podcast.episodes.length > 5 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{podcast.episodes.length - 5} more episodes
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}