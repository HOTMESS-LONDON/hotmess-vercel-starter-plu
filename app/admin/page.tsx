'use client'

import { useState } from 'react'
import { AdminLogin } from '@/components/admin/AdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const handleLogin = (authToken: string) => {
    setToken(authToken)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setToken(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard token={token!} onLogout={handleLogout} />
}