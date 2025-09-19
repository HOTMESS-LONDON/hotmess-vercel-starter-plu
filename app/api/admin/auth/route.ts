import { NextRequest, NextResponse } from 'next/server'
import { generateAdminToken, verifyPassword } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }
    
    const adminPassword = process.env.ADMIN_PASSWORD || 'hotmess2024'
    
    if (password === adminPassword) {
      const token = generateAdminToken()
      return NextResponse.json({ token, success: true })
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}