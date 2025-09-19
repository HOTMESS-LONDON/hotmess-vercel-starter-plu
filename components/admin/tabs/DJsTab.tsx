'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Download, Upload } from 'lucide-react'
import { DJ } from '@/lib/admin-types'
import { DJEditDialog } from '../dialogs/DJEditDialog'

interface DJsTabProps {
  token: string
}

export function DJsTab({ token }: DJsTabProps) {
  const [djs, setDJs] = useState<DJ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDJ, setEditingDJ] = useState<DJ | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const fetchDJs = async () => {
    try {
      const response = await fetch('/api/admin/djs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setDJs(data)
      }
    } catch (error) {
      console.error('Failed to fetch DJs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDJs()
  }, [token])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this DJ?')) return

    try {
      const response = await fetch(`/api/admin/djs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setDJs(djs.filter(dj => dj.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete DJ:', error)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Name', 'Bio', 'Instagram', 'Twitter', 'SoundCloud', 'Spotify', 'Track URL', 'Slots']
    const csvData = djs.map(dj => [
      dj.name,
      dj.bio,
      dj.socials.instagram || '',
      dj.socials.twitter || '',
      dj.socials.soundcloud || '',
      dj.socials.spotify || '',
      dj.trackUrl || '',
      dj.slots.join(', ')
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hotmess-djs.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const response = await fetch('/api/admin/djs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/csv',
        },
        body: await file.text(),
      })

      if (response.ok) {
        fetchDJs() // Refresh the list
        alert('DJs imported successfully!')
      }
    } catch (error) {
      console.error('Failed to import DJs:', error)
      alert('Failed to import DJs')
    }

    event.target.value = '' // Reset file input
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">Loading DJs...</div>
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
              <CardTitle>DJs Management</CardTitle>
              <CardDescription>
                Manage DJ profiles, socials, and show assignments
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => document.getElementById('csv-import')?.click()}
              >
                <Upload className="h-4 w-4" />
                Import CSV
                <input
                  id="csv-import"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleImportCSV}
                />
              </Button>
              <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add DJ
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* DJs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {djs.map((dj) => (
          <Card key={dj.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{dj.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{dj.bio}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingDJ(dj)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(dj.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Shows:</p>
                  <p className="text-sm text-muted-foreground">
                    {dj.slots.length > 0 ? dj.slots.join(', ') : 'No shows assigned'}
                  </p>
                </div>
                {dj.trackUrl && (
                  <div>
                    <p className="text-sm font-medium">Track URL:</p>
                    <a
                      href={dj.trackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Listen
                    </a>
                  </div>
                )}
                <div className="flex gap-1 pt-2">
                  {dj.socials.instagram && (
                    <a
                      href={`https://instagram.com/${dj.socials.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded"
                    >
                      IG
                    </a>
                  )}
                  {dj.socials.twitter && (
                    <a
                      href={`https://twitter.com/${dj.socials.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      X
                    </a>
                  )}
                  {dj.socials.soundcloud && (
                    <a
                      href={dj.socials.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded"
                    >
                      SC
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      {(showAddDialog || editingDJ) && (
        <DJEditDialog
          dj={editingDJ}
          isOpen={showAddDialog || !!editingDJ}
          onClose={() => {
            setShowAddDialog(false)
            setEditingDJ(null)
          }}
          onSave={() => {
            fetchDJs()
            setShowAddDialog(false)
            setEditingDJ(null)
          }}
          token={token}
        />
      )}
    </div>
  )
}