'use client';
import { useEffect, useState } from "react";
type Day = "Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"|"Sunday";
type ShowDef = { schedule: Day[]; time: string; host?: string; rotation?: string[]; show_style?: string; daily_segments?: { time: string; segment: string }[]; };
type ScheduleData = Record<string, ShowDef>;
export default function Schedule() {
  const [data, setData] = useState<ScheduleData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => { fetch("/api/schedule", { cache: "no-store" }).then(r => r.json()).then(setData).catch(e => setErr(String(e))); }, []);
  if (err) return <p style={{color:"#f66"}}>Failed to load schedule: {err}</p>;
  if (!data) return <p style={{opacity:.6}}>Loading schedule…</p>;
  const shows = Object.entries(data);
  return (
    <section style={{display:"grid",gap:12}}>
      <h2 style={{fontSize:24,margin:"24px 0 0"}}>This Week on HOTMESS RADIO</h2>
      <div style={{display:"grid",gap:8}}>
        {shows.map(([name, info]) => (
          <article key={name} style={{background:"#121212",border:"1px solid #1E1E1E",borderRadius:16,padding:16}}>
            <header style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:12,flexWrap:"wrap"}}>
              <h3 style={{margin:0,fontSize:18,letterSpacing:.2}}>{name}</h3>
              <span style={{fontSize:13,opacity:.8}}>{info.time}</span>
            </header>
            <p style={{margin:"6px 0 10px",opacity:.8,fontSize:14}}>
              {info.host ? <>Host: <strong>{info.host}</strong></> : info.rotation ? <>Rotation: <strong>{info.rotation.join(", ")}</strong></> : null}
            </p>
            <p style={{margin:"0 0 10px",opacity:.7,fontSize:13}}>Days: {info.schedule.join(" · ")}</p>
            {info.daily_segments?.length ? (
              <div style={{marginTop:8}}>
                <div style={{fontSize:12,opacity:.8,marginBottom:4}}>Segments</div>
                <ul style={{listStyle:"none",padding:0,margin:0,display:"grid",gap:4}}>
                  {info.daily_segments.map((seg, i) => (
                    <li key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:12,alignItems:"baseline"}}>
                      <code style={{opacity:.8,fontSize:12}}>{seg.time}</code>
                      <span style={{fontSize:14}}>{seg.segment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
