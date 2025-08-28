import type { Metadata } from 'next'
import RadioPlayer from '@/components/RadioPlayer'
import Schedule from '@/components/Schedule'

export const metadata: Metadata = {
  title: 'Radio',
  description: 'HOTMESS Radio - 24/7 streaming. Hand-in-Hand is the only place to land.',
}

export default function RadioPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          RADIO
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Streaming 24/7. Hand-in-Hand is the only place to land.
        </p>
      </section>

      {/* Radio Player */}
      <section className="max-w-2xl mx-auto">
        <RadioPlayer />
      </section>

      {/* Schedule */}
      <section>
        <Schedule />
      </section>
    </div>
  )
}
