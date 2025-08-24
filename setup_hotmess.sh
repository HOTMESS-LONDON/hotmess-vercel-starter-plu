set -e
mkdir -p app/radio app/api/schedule components data public

cat > package.json <<'JSON'
{
  "name": "hotmess-vercel-starter-plu",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  }
}
JSON

cat > next.config.mjs <<'JS'
/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;
JS

cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
JSON

cat > .gitignore <<'TXT'
node_modules
.next
.vercel
.env*
TXT

cat > app/layout.tsx <<'TSX'
export const metadata = { title: "HOTMESS Radio", description: "UK’s unapologetic queer 24/7 stream." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,background:"#0B0B0B",color:"#fff",fontFamily:"system-ui"}}>
        <main style={{maxWidth:960,margin:"64px auto",padding:"0 20px"}}>{children}</main>
      </body>
    </html>
  );
}
TSX

cat > app/page.tsx <<'TSX'
export default function Home() {
  return (
    <section style={{display:"grid",gap:16}}>
      <h1 style={{fontSize:48,letterSpacing:-1,margin:0}}>HOTMESS</h1>
      <p style={{opacity:.8}}>London’s filth frequency. Clothes, lube, radio, survival.</p>
      <a href="/radio" style={{display:"inline-block",padding:"12px 16px",background:"#FF5300",borderRadius:12,color:"#0B0B0B",fontWeight:700,textDecoration:"none"}}>Open Radio</a>
    </section>
  );
}
TSX

cat > data/schedule.json <<'JSON'
{
  "Wake the Mess": { "schedule": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "time": "9AM–11AM", "host": "Maxx",
    "ai_voices": { "Weather Segment": "11 Labs – Drag queen persona with dramatic highs and comedic sass", "Maxx Memo": "11 Labs – Warm gym-bro gossip tone", "Voice Note Roulette": "Hume – Sultry late-night whisper", "Giveaway Stinger": "11 Labs – Overexcited gay gameshow host" },
    "music_triggers": { "09:45": "High-energy club anthems, queer house and circuit stompers", "10:40": "Hard house, euphoric techno and morning bangers" },
    "show_style": "High-energy club talk show. Messy, provocative and cheeky. Safe space for late risers and early freaks.",
    "daily_segments": [
      {"time": "09:00", "segment": "Intro stinger + Welcome from Maxx"},
      {"time": "09:10", "segment": "HOTMESS Weather for Nobody (AI VO)"},
      {"time": "09:20", "segment": "Club gossip round-up (scripted or AI convo)"},
      {"time": "09:45", "segment": "Track block: euphoric queer bangers"},
      {"time": "10:05", "segment": "Voice Note Roulette – listener submission"},
      {"time": "10:30", "segment": "Maxx Memo of the Day"},
      {"time": "10:45", "segment": "Giveaway/scan game segment"},
      {"time": "10:55", "segment": "Outro sting + weekend promo"}
    ]
  },
  "Dial-a-Daddy": { "schedule": ["Monday","Wednesday","Friday"], "time": "3PM–4PM", "host": "Bruno",
    "ai_voices": { "Voice from the Void": "11 Labs – Haunted hotline/phone sex operator tone", "Daddy Says": "11 Labs – Leather bar philosopher: dry, funny, short", "Giveaway": "Hume – Flirty stinger with emotional nuance" },
    "music_triggers": { "15:50": "Dirty electro ballads and cheeky afternoon throb beats" },
    "daily_segments": [
      {"time": "15:00", "segment": "Intro sting + Bruno sets the tone"},
      {"time": "15:10", "segment": "Voice from the Void – AI reads dirty problem"},
      {"time": "15:25", "segment": "Daddy Says – Advice drop"},
      {"time": "15:35", "segment": "Giveaway + call-in reaction"},
      {"time": "15:50", "segment": "One final messy track before outro"}
    ]
  },
  "Hand-in-Hand": { "schedule": ["Sunday"], "time": "2PM–6PM", "host": "HNHS + rotating guests",
    "ai_voices": { "Check-in Trigger": "Hume – Soft therapeutic guide", "Voice Notes": "Hume – Processed listener voicemails, emotional overlay", "Product Talk": "Maxx (11 Labs) – Sex-positive but sincere" },
    "music_triggers": { "15:00": "Downtempo queer ambient + dreamy tech", "17:00": "Healing trance, soft techno, wave" },
    "show_style": "Emotional and narrative core of the HOTMESS brand. A full-length Sunday show of music, conversation and community call-ins. Sex-positive and stigma-breaking. Safe but provocative.",
    "daily_segments": [
      {"time": "14:00", "segment": "Check-in Trigger + intro voice note"},
      {"time": "14:15", "segment": "Call-in #1 + curated track response"},
      {"time": "14:45", "segment": "Product Talk – HNHMESS spotlight"},
      {"time": "15:00", "segment": "Downtempo ambient segment"},
      {"time": "16:00", "segment": "Call-in #2 – Support confession with overlay"},
      {"time": "17:00", "segment": "Healing trance + outro story reflection"},
      {"time": "17:50", "segment": "Closing message + branded outro sting"}
    ]
  },
  "Drive Time Mess": { "schedule": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "time": "5PM–7PM", "host": "Philip (you) + Two Guest Hosts",
    "ai_voices": { "Product Spotlight": "Maxx (11 Labs) – Promotional but cheeky", "Giveaway": "11 Labs – Chaotic drag announcer" },
    "music_triggers": { "17:25": "Funky electro-pop, queer rap, glam-synth", "18:00": "Weekend bangers and emotional thumpers" },
    "daily_segments": [
      {"time": "17:00", "segment": "Welcome from Philip + intro sting"},
      {"time": "17:10", "segment": "Roundtable mess topic of the day"},
      {"time": "17:30", "segment": "Product Spotlight"},
      {"time": "17:50", "segment": "Giveaway draw + shoutout"},
      {"time": "18:20", "segment": "Telegram poll highlight + listener story"},
      {"time": "18:55", "segment": "DJ teaser and outro sting"}
    ]
  },
  "Guest DJ Takeovers": { "schedule": ["Friday","Saturday"], "time": "7PM–11PM", "rotation": ["Paul King","Nick Denton","Tony English","John Henning"],
    "format": [
      {"time": "19:00", "segment": "Custom DJ Intro + branded VO (submitted or AI-enhanced)"},
      {"time": "20:00", "segment": "Radio Brain sting or DJ callout"},
      {"time": "Each Hour", "segment": "No interruptions. Just non-stop bangers. No Kylie. No camp."},
      {"time": "23:00", "segment": "HOTMESS sting fadeout or DJ custom outro"}
    ],
    "music_triggers": { "19:00–23:00": "Non-stop hard house, techno, filthy club, queer rave energy", "After 23:00": "Seamless raw DJ sets with no voice breaks or pop inserts" },
    "notes": "After 11PM on weekends: uninterrupted mix mode continues with no camp breaks. DJs deliver branded intros/outros. Radio Brain maintains sonic cohesion."
  }
}
JSON

cat > app/api/schedule/route.ts <<'TS'
import { NextResponse } from "next/server";
import schedule from "@/data/schedule.json";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export async function GET() { return NextResponse.json(schedule); }
TS

cat > components/Schedule.tsx <<'TSX'
'use client';
import { useEffect, useState } from "react";
type Day = "Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"|"Sunday";
type ShowDef = { schedule: Day[]; time: string; host?: string; rotation?: string[]; show_style?: string; daily_segments?: { time: string; segment: string }[]; };
type ScheduleData = Record<string, ShowDef>;
export default function Schedule() {
  const [data, setData] = useState<ScheduleData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => { fetch("/api/schedule", { cache: "no-store" }).then(r => r.json()).then(setData).catch(e => setErr(String(e)); }, []);
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
TSX

cat > app/radio/page.tsx <<'TSX'
'use client';
import { useMemo } from "react";
import Schedule from "@/components/Schedule";
export const revalidate = 60;
export default function Page() {
  const stream = useMemo(() => process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL || "", []);
  return (
    <section style={{display:"grid",gap:16}}>
      <h1 style={{fontSize:36,margin:0}}>HOTMESS RADIO</h1>
      <p style={{opacity:.85}}>Streaming 24/7. Hand-in-Hand is the only place to land.</p>
      <audio controls preload="none" style={{width:"100%",marginTop:8}}>
        <source src={stream} type="audio/mpeg" />
        Your browser does not support audio.
      </audio>
      <p style={{fontSize:12,opacity:.6}}>Stream URL: {stream ? stream : "not configured"}</p>
      <Schedule />
    </section>
  );
}
TSX

cat > public/robots.txt <<'TXT'
User-agent: *
Allow: /
TXT

cat > .env.example <<'ENV'
# RadioKing public stream URL (mp3 over HTTPS)
NEXT_PUBLIC_RADIOKING_STREAM_URL=https://your-radioking-stream-url.example/stream
ENV

echo "✅ Files created."
