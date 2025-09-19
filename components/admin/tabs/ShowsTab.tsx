'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Download, Upload } from 'lucide-react'
import { Show } from '@/lib/admin-types'

interface ShowsTabProps {
  token: string
}

export function ShowsTab({ token }: ShowsTabProps) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)

  const fetchShows = async () => {
    try {
      const response = await fetch('/api/admin/shows', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setShows(data)
      }
    } catch (error) {
      console.error('Failed to fetch shows:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [token])

  const handleExportCSV = () => {
    const headers = ['Name', 'Description', 'Host', 'Schedule', 'Time', 'DJ IDs']
    const csvData = shows.map(show => [
      show.name,
      show.description,
      show.host,
      show.schedule.join(', '),
      show.time,
      show.djIds.join(', ')
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hotmess-shows.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">Loading shows...</div>
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
              <CardTitle>Shows Management</CardTitle>
              <CardDescription>
                Manage radio shows, schedules, and segments
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportCSV} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Import CSV
              </Button>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Show
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Shows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {shows.map((show) => (
          <Card key={show.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{show.name}</CardTitle>
                  <CardDescription>{show.description}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Host:</p>
                    <p className="text-sm text-muted-foreground">{show.host}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time:</p>
                    <p className="text-sm text-muted-foreground">{show.time}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Schedule:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {show.schedule.map((day) => (
                      <span
                        key={day}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {show.segments && show.segments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Segments:</p>
                    <div className="mt-2 space-y-1">
                      {show.segments.slice(0, 3).map((segment, index) => (
                        <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                          <span className="font-mono text-gray-600">{segment.time}</span>
                          <span className="ml-2">{segment.segment}</span>
                        </div>
                      ))}
                      {show.segments.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{show.segments.length - 3} more segments
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}