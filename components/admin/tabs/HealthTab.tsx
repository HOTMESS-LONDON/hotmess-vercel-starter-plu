'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { HealthStatus } from '@/lib/admin-types'

interface HealthTabProps {
  token: string
}

export function HealthTab({ token }: HealthTabProps) {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchHealthStatus = async () => {
    try {
      const response = await fetch('/api/admin/health', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setHealthStatus(data)
      }
    } catch (error) {
      console.error('Failed to fetch health status:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchHealthStatus()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchHealthStatus, 30000)
    return () => clearInterval(interval)
  }, [token])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchHealthStatus()
  }

  const getStatusIcon = (status: 'healthy' | 'degraded' | 'down') => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'down':
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusColor = (status: 'healthy' | 'degraded' | 'down') => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800'
      case 'down':
        return 'bg-red-100 text-red-800'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">Loading health status...</div>
        </CardContent>
      </Card>
    )
  }

  if (!healthStatus) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center text-red-600">Failed to load health status</div>
        </CardContent>
      </Card>
    )
  }

  const services = healthStatus.services
  const overallStatus = Object.values(services).every(s => s.status === 'healthy') 
    ? 'healthy' 
    : Object.values(services).some(s => s.status === 'down') 
    ? 'down' 
    : 'degraded'

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-3">
                {getStatusIcon(overallStatus)}
                System Health Status
              </CardTitle>
              <CardDescription>
                Last updated: {new Date(healthStatus.timestamp).toLocaleString()}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(overallStatus)}>
                {overallStatus.toUpperCase()}
              </Badge>
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Individual Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Health */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getStatusIcon(services.api.status)}
                API Service
              </CardTitle>
              <Badge className={getStatusColor(services.api.status)}>
                {services.api.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {services.api.responseTime && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Response Time:</span>
                  <span className="text-sm font-mono">{services.api.responseTime}ms</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Checked:</span>
                <span className="text-sm">{new Date(services.api.lastChecked).toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Sheets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getStatusIcon(services.googleSheets.status)}
                Google Sheets
              </CardTitle>
              <Badge className={getStatusColor(services.googleSheets.status)}>
                {services.googleSheets.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {services.googleSheets.lastSync && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync:</span>
                  <span className="text-sm">{new Date(services.googleSheets.lastSync).toLocaleTimeString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Checked:</span>
                <span className="text-sm">{new Date(services.googleSheets.lastChecked).toLocaleTimeString()}</span>
              </div>
              {services.googleSheets.status === 'down' && (
                <p className="text-xs text-red-600 mt-2">
                  Check Google Sheets API credentials and spreadsheet permissions
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Telegram Bot */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getStatusIcon(services.telegramBot.status)}
                Telegram Bot
              </CardTitle>
              <Badge className={getStatusColor(services.telegramBot.status)}>
                {services.telegramBot.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {services.telegramBot.lastMessage && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Message:</span>
                  <span className="text-sm">{new Date(services.telegramBot.lastMessage).toLocaleTimeString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Checked:</span>
                <span className="text-sm">{new Date(services.telegramBot.lastChecked).toLocaleTimeString()}</span>
              </div>
              {services.telegramBot.status === 'down' && (
                <p className="text-xs text-red-600 mt-2">
                  Check Telegram bot token and channel permissions
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Podcast Feeds */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                {getStatusIcon(services.podcastFeeds.status)}
                Podcast Feeds
              </CardTitle>
              <Badge className={getStatusColor(services.podcastFeeds.status)}>
                {services.podcastFeeds.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Feeds Checked:</span>
                <span className="text-sm font-mono">{services.podcastFeeds.feedsChecked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Failed Feeds:</span>
                <span className="text-sm font-mono text-red-600">{services.podcastFeeds.failedFeeds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Last Checked:</span>
                <span className="text-sm">{new Date(services.podcastFeeds.lastChecked).toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment Variables Status */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>
            Check if required environment variables are configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <span className="text-sm">Admin Password</span>
              <Badge className="bg-green-100 text-green-800">SET</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span className="text-sm">Google Sheets API</span>
              <Badge className={process.env.GOOGLE_SHEETS_API_KEY ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {process.env.GOOGLE_SHEETS_API_KEY ? 'SET' : 'NOT SET'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded">
              <span className="text-sm">Telegram Bot</span>
              <Badge className={process.env.TELEGRAM_BOT_TOKEN ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {process.env.TELEGRAM_BOT_TOKEN ? 'SET' : 'NOT SET'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}