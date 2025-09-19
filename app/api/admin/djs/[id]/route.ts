import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAccess } from '@/lib/admin-auth'
import { getDJById, updateDJ, deleteDJ } from '@/lib/mock-data'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const dj = getDJById(params.id)
    if (!dj) {
      return NextResponse.json({ error: 'DJ not found' }, { status: 404 })
    }
    return NextResponse.json(dj)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch DJ' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updates = await request.json()
    const updatedDJ = updateDJ(params.id, updates)
    
    if (!updatedDJ) {
      return NextResponse.json({ error: 'DJ not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedDJ)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update DJ' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const deleted = deleteDJ(params.id)
    
    if (!deleted) {
      return NextResponse.json({ error: 'DJ not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete DJ' }, { status: 500 })
  }
}