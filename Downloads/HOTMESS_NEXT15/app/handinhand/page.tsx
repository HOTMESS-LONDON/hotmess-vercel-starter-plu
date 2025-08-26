'use client'
import UTMLink from '../../components/UTMLink'
export default function Page(){
  return (
    <section className="grid two">
      <article className="card">
        <h1>Hand-in-Hand</h1>
        <p>Care, music, community. Sundays 14:00–18:00.</p>
        <div style={{display:'flex',gap:10}}>
          <UTMLink href="/radio" label="Listen Live" variant="primary"/>
          <UTMLink href="/care" label="Care Hub" variant="ghost"/>
        </div>
      </article>
      <aside className="card">
        <h3>Set a Reminder</h3>
        <a className="btn btn-ghost" href="/assets/hand-in-hand.ics">Add to Calendar</a>
      </aside>
    </section>
  )
}
