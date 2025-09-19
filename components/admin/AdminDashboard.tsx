'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Users, Radio, Bell, Podcast, Activity } from 'lucide-react'
import { DJsTab } from './tabs/DJsTab'
import { ShowsTab } from './tabs/ShowsTab'
import { RemindersTab } from './tabs/RemindersTab'
import { PodcastsTab } from './tabs/PodcastsTab'
import { HealthTab } from './tabs/HealthTab'

interface AdminDashboardProps {
  token: string
  onLogout: () => void
}

export function AdminDashboard({ token, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('djs')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HOTMESS Admin Panel</h1>
              <p className="text-sm text-gray-500">Manage DJs, shows, reminders, and more</p>
            </div>
            <Button onClick={onLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="djs" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              DJs
            </TabsTrigger>
            <TabsTrigger value="shows" className="flex items-center gap-2">
              <Radio className="h-4 w-4" />
              Shows
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Reminders
            </TabsTrigger>
            <TabsTrigger value="podcasts" className="flex items-center gap-2">
              <Podcast className="h-4 w-4" />
              Podcasts
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="djs" className="space-y-6">
            <DJsTab token={token} />
          </TabsContent>

          <TabsContent value="shows" className="space-y-6">
            <ShowsTab token={token} />
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <RemindersTab token={token} />
          </TabsContent>

          <TabsContent value="podcasts" className="space-y-6">
            <PodcastsTab token={token} />
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <HealthTab token={token} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}