import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAccess } from '@/lib/admin-auth'
import { getHealthStatus } from '@/lib/integrations'

export async function GET(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const healthStatus = await getHealthStatus()
    return NextResponse.json(healthStatus)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch health status' }, { status: 500 })
  }
}