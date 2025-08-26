'use client'
import RadioPlayer from '../../components/RadioPlayer'
import UTMLink from '../../components/UTMLink'
const STREAM = process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL || ''

export default function Page(){
  return (
    <section className="grid two">
      <aside className="card">
        <h1>Hotmess Radio</h1>
        <p className="small">Streaming 24/7 — AI voices + live DJs.</p>
        <RadioPlayer streamUrl={STREAM} autoplay={false}/>
        <div style={{marginTop:12,display:'flex',gap:8}}>
          <UTMLink href="/handinhand" label="HNH Sundays" variant="ghost"/>
          <UTMLink href="/drop" label="Shop the Drop" variant="primary"/>
        </div>
        <p className="small" style={{marginTop:8,opacity:.7}}>Stream: {STREAM || 'not configured'}</p>
      </aside>
      <article className="card">
        <h3>Schedule</h3>
        <ul>
          <li>Mon–Fri 09:00–11:00 — Wake the Mess</li>
          <li>Mon/Wed/Fri 15:00–16:00 — Dial-a-Daddy</li>
          <li>Mon–Fri 17:00–19:00 — Drive Time Mess</li>
          <li>Fri/Sat 19:00–23:00 — DJ Takeovers (no VO inserts)</li>
          <li>Sun 14:00–18:00 — Hand-in-Hand</li>
        </ul>
      </article>
    </section>
  )
}
