import { NextRequest, NextResponse } from 'next/server'
import { validateAdminAccess } from '@/lib/admin-auth'
import { getAllDJs, createDJ, bulkImportDJs } from '@/lib/mock-data'
import Papa from 'papaparse'

export async function GET(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const djs = getAllDJs()
    return NextResponse.json(djs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch DJs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!validateAdminAccess(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contentType = request.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      // Single DJ creation
      const djData = await request.json()
      const newDJ = createDJ(djData)
      return NextResponse.json(newDJ, { status: 201 })
    } else if (contentType?.includes('text/csv')) {
      // Bulk CSV import
      const csvText = await request.text()
      const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true })
      
      const djsToImport = data.map((row: any) => ({
        name: row.name || '',
        bio: row.bio || '',
        socials: {
          instagram: row.instagram || undefined,
          twitter: row.twitter || undefined,
          soundcloud: row.soundcloud || undefined,
          spotify: row.spotify || undefined,
        },
        trackUrl: row.trackUrl || undefined,
        slots: row.slots ? row.slots.split(',').map((s: string) => s.trim()) : [],
        podcastRssUrl: row.podcastRssUrl || undefined,
      }))
      
      const newDJs = bulkImportDJs(djsToImport)
      return NextResponse.json({ imported: newDJs.length, djs: newDJs }, { status: 201 })
    } else {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create DJ(s)' }, { status: 500 })
  }
}