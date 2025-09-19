import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAccess } from '@/lib/admin-auth'
import { fetchRemindersFromSheets, cancelReminder } from '@/lib/integrations'

export async function GET(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    
    let reminders = await fetchRemindersFromSheets()
    
    // Apply filters
    if (search) {
      reminders = reminders.filter(reminder =>
        reminder.title.toLowerCase().includes(search.toLowerCase()) ||
        reminder.message.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (status) {
      reminders = reminders.filter(reminder => reminder.status === status)
    }
    
    return NextResponse.json(reminders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reminders' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Reminder ID required' }, { status: 400 })
    }
    
    const success = await cancelReminder(id)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to cancel reminder' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to cancel reminder' }, { status: 500 })
  }
}