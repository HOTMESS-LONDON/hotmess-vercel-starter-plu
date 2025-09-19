'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, X, Download, Filter } from 'lucide-react'
import { Reminder } from '@/lib/admin-types'

interface RemindersTabProps {
  token: string
}

export function RemindersTab({ token }: RemindersTabProps) {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const fetchReminders = async () => {
    try {
      const url = new URL('/api/admin/reminders', window.location.origin)
      if (searchTerm) url.searchParams.set('search', searchTerm)
      if (statusFilter !== 'all') url.searchParams.set('status', statusFilter)

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setReminders(data)
        setFilteredReminders(data)
      }
    } catch (error) {
      console.error('Failed to fetch reminders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReminders()
  }, [token, searchTerm, statusFilter])

  const handleCancelReminder = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this reminder?')) return

    try {
      const response = await fetch(`/api/admin/reminders?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        fetchReminders() // Refresh the list
      }
    } catch (error) {
      console.error('Failed to cancel reminder:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'sent': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleExportCSV = () => {
    const headers = ['ID', 'Title', 'Message', 'Type', 'Status', 'Scheduled For', 'Created At']
    const csvData = filteredReminders.map(reminder => [
      reminder.id,
      reminder.title,
      reminder.message,
      reminder.type,
      reminder.status,
      reminder.scheduledFor,
      reminder.createdAt
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hotmess-reminders.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">Loading reminders...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Reminders Management</CardTitle>
              <CardDescription>
                View, search, and manage reminders from Google Sheets
              </CardDescription>
            </div>
            <Button onClick={handleExportCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
          
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reminders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="cancelled">Cancelled</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </CardHeader>
      </Card>

      {/* Reminders List */}
      <div className="space-y-4">
        {filteredReminders.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-muted-foreground">
                No reminders found matching your criteria
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredReminders.map((reminder) => (
            <Card key={reminder.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{reminder.title}</h3>
                      <Badge className={`text-xs ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {reminder.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {reminder.message}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                      <div>
                        <p className="font-medium">Scheduled For:</p>
                        <p>{new Date(reminder.scheduledFor).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Created:</p>
                        <p>{new Date(reminder.createdAt).toLocaleDateString()}</p>
                      </div>
                      {reminder.sentAt && (
                        <div>
                          <p className="font-medium">Sent At:</p>
                          <p>{new Date(reminder.sentAt).toLocaleString()}</p>
                        </div>
                      )}
                      {reminder.cancelledAt && (
                        <div>
                          <p className="font-medium">Cancelled At:</p>
                          <p>{new Date(reminder.cancelledAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {reminder.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancelReminder(reminder.id)}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {reminders.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {reminders.filter(r => r.status === 'sent').length}
            </div>
            <p className="text-xs text-muted-foreground">Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {reminders.filter(r => r.status === 'cancelled').length}
            </div>
            <p className="text-xs text-muted-foreground">Cancelled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {reminders.filter(r => r.status === 'failed').length}
            </div>
            <p className="text-xs text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}