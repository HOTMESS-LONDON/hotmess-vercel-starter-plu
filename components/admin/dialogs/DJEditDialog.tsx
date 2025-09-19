'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DJ } from '@/lib/admin-types'

interface DJEditDialogProps {
  dj: DJ | null
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  token: string
}

export function DJEditDialog({ dj, isOpen, onClose, onSave, token }: DJEditDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    trackUrl: '',
    slots: '',
    podcastRssUrl: '',
    socials: {
      instagram: '',
      twitter: '',
      soundcloud: '',
      spotify: '',
    },
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dj) {
      setFormData({
        name: dj.name,
        bio: dj.bio,
        trackUrl: dj.trackUrl || '',
        slots: dj.slots.join(', '),
        podcastRssUrl: dj.podcastRssUrl || '',
        socials: {
          instagram: dj.socials.instagram || '',
          twitter: dj.socials.twitter || '',
          soundcloud: dj.socials.soundcloud || '',
          spotify: dj.socials.spotify || '',
        },
      })
    } else {
      setFormData({
        name: '',
        bio: '',
        trackUrl: '',
        slots: '',
        podcastRssUrl: '',
        socials: {
          instagram: '',
          twitter: '',
          soundcloud: '',
          spotify: '',
        },
      })
    }
  }, [dj])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const djData = {
        name: formData.name,
        bio: formData.bio,
        trackUrl: formData.trackUrl || undefined,
        slots: formData.slots.split(',').map(s => s.trim()).filter(s => s),
        podcastRssUrl: formData.podcastRssUrl || undefined,
        socials: {
          instagram: formData.socials.instagram || undefined,
          twitter: formData.socials.twitter || undefined,
          soundcloud: formData.socials.soundcloud || undefined,
          spotify: formData.socials.spotify || undefined,
        },
      }

      const url = dj ? `/api/admin/djs/${dj.id}` : '/api/admin/djs'
      const method = dj ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(djData),
      })

      if (response.ok) {
        onSave()
      } else {
        const error = await response.json()
        alert(`Failed to save DJ: ${error.error}`)
      }
    } catch (error) {
      alert('Failed to save DJ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dj ? 'Edit DJ' : 'Add New DJ'}</DialogTitle>
          <DialogDescription>
            {dj ? 'Update DJ information and social links' : 'Create a new DJ profile'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slots">Shows (comma-separated)</Label>
              <Input
                id="slots"
                value={formData.slots}
                onChange={(e) => setFormData(prev => ({ ...prev, slots: e.target.value }))}
                placeholder="Wake the Mess, Dial-a-Daddy"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackUrl">Track URL</Label>
            <Input
              id="trackUrl"
              type="url"
              value={formData.trackUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, trackUrl: e.target.value }))}
              placeholder="https://soundcloud.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="podcastRssUrl">Podcast RSS URL</Label>
            <Input
              id="podcastRssUrl"
              type="url"
              value={formData.podcastRssUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, podcastRssUrl: e.target.value }))}
              placeholder="https://example.com/podcast.rss"
            />
          </div>

          <div className="space-y-3">
            <Label>Social Media</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.socials.instagram}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socials: { ...prev.socials, instagram: e.target.value }
                  }))}
                  placeholder="@username or full URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter/X</Label>
                <Input
                  id="twitter"
                  value={formData.socials.twitter}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socials: { ...prev.socials, twitter: e.target.value }
                  }))}
                  placeholder="@username or full URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soundcloud">SoundCloud</Label>
                <Input
                  id="soundcloud"
                  value={formData.socials.soundcloud}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socials: { ...prev.socials, soundcloud: e.target.value }
                  }))}
                  placeholder="https://soundcloud.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spotify">Spotify</Label>
                <Input
                  id="spotify"
                  value={formData.socials.spotify}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    socials: { ...prev.socials, spotify: e.target.value }
                  }))}
                  placeholder="https://open.spotify.com/artist/..."
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name}>
              {loading ? 'Saving...' : dj ? 'Update DJ' : 'Create DJ'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}