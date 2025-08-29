'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/** Valid days of the week for show scheduling */
type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

/**
 * Structure for individual show definition
 */
type ShowDef = {
  /** Days of the week when the show airs */
  schedule: Day[]
  /** Time range when the show airs (e.g., "9AM-11AM") */
  time: string
  /** Primary host name */
  host?: string
  /** Array of rotating hosts */
  rotation?: string[]
  /** Description of the show's style and format */
  show_style?: string
  /** Daily segments with times and descriptions */
  daily_segments?: { time: string; segment: string }[]
}

/** Complete schedule data structure with show names as keys */
type ScheduleData = Record<string, ShowDef>

/**
 * Schedule component that displays HOTMESS radio show schedule
 *
 * Features:
 * - Fetches schedule data from /api/schedule endpoint
 * - Displays shows with times, hosts, and daily segments
 * - Error handling for API failures
 * - Loading states for better user experience
 * - Responsive card layout with hover effects
 *
 * @returns A complete schedule display with show information
 */
export default function Schedule() {
  const [data, setData] = useState<ScheduleData | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/schedule', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setErr(String(e)))
  }, [])

  if (err) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-400">Failed to load schedule: {err}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Loading schedule…</p>
      </div>
    )
  }

  const shows = Object.entries(data)

  return (
    <section className="space-y-6">
      <h2 className="text-center text-3xl font-bold">This Week on HOTMESS RADIO</h2>
      <div className="grid gap-4">
        {shows.map(([name, info]) => (
          <Card key={name} className="transition-colors hover:bg-card/80">
            <CardHeader>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <CardTitle className="text-xl">{name}</CardTitle>
                <span className="font-mono text-sm text-muted-foreground">{info.time}</span>
              </div>
              {(info.host || info.rotation) && (
                <p className="text-sm text-muted-foreground">
                  {info.host ? (
                    <>
                      Host: <strong className="text-foreground">{info.host}</strong>
                    </>
                  ) : info.rotation ? (
                    <>
                      Rotation:{' '}
                      <strong className="text-foreground">{info.rotation.join(', ')}</strong>
                    </>
                  ) : null}
                </p>
              )}
              <p className="text-xs text-muted-foreground">Days: {info.schedule.join(' · ')}</p>
            </CardHeader>
            {info.daily_segments?.length && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Segments
                  </div>
                  <div className="space-y-2">
                    {info.daily_segments.map((seg, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_1fr] items-baseline gap-3 text-sm"
                      >
                        <code className="rounded bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground">
                          {seg.time}
                        </code>
                        <span className="text-muted-foreground">{seg.segment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
