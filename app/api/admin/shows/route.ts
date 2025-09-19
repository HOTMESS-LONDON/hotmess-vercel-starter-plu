import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAccess } from '@/lib/admin-auth'
import { getAllShows, createShow, bulkImportShows } from '@/lib/mock-data'
import Papa from 'papaparse'

export async function GET(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const shows = getAllShows()
    return NextResponse.json(shows)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      // Single show creation
      const showData = await request.json()
      const newShow = createShow(showData)
      return NextResponse.json(newShow, { status: 201 })
    } else if (contentType?.includes('text/csv')) {
      // Bulk CSV import
      const csvText = await request.text()
      const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true })
      
      const showsToImport = data.map((row: any) => ({
        name: row.name || '',
        description: row.description || '',
        host: row.host || '',
        schedule: row.schedule ? row.schedule.split(',').map((s: string) => s.trim()) : [],
        time: row.time || '',
        djIds: row.djIds ? row.djIds.split(',').map((s: string) => s.trim()) : [],
        podcastRssUrl: row.podcastRssUrl || undefined,
      }))
      
      const newShows = bulkImportShows(showsToImport)
      return NextResponse.json({ imported: newShows.length, shows: newShows }, { status: 201 })
    } else {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create show(s)' }, { status: 500 })
  }
}