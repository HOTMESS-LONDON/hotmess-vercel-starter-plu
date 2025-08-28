'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
type ShowDef = {
  schedule: Day[]
  time: string
  host?: string
  rotation?: string[]
  show_style?: string
  daily_segments?: { time: string; segment: string }[]
}
type ScheduleData = Record<string, ShowDef>

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
      <div className="text-center py-8">
        <p className="text-red-400">Failed to load schedule: {err}</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading schedule…</p>
      </div>
    )
  }

  const shows = Object.entries(data)

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold text-center">This Week on HOTMESS RADIO</h2>
      <div className="grid gap-4">
        {shows.map(([name, info]) => (
          <Card key={name} className="hover:bg-card/80 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-baseline gap-3 flex-wrap">
                <CardTitle className="text-xl">{name}</CardTitle>
                <span className="text-sm text-muted-foreground font-mono">
                  {info.time}
                </span>
              </div>
              {(info.host || info.rotation) && (
                <p className="text-sm text-muted-foreground">
                  {info.host ? (
                    <>
                      Host: <strong className="text-foreground">{info.host}</strong>
                    </>
                  ) : info.rotation ? (
                    <>
                      Rotation: <strong className="text-foreground">{info.rotation.join(', ')}</strong>
                    </>
                  ) : null}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Days: {info.schedule.join(' · ')}
              </p>
            </CardHeader>
            {info.daily_segments?.length && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    Segments
                  </div>
                  <div className="space-y-2">
                    {info.daily_segments.map((seg, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-[auto_1fr] gap-3 items-baseline text-sm"
                      >
                        <code className="text-xs text-muted-foreground font-mono bg-secondary px-2 py-1 rounded">
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
