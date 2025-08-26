'use client';
import Link from 'next/link';
export default function Header() {
  return (
    <header style={{display:'flex',gap:16,alignItems:'center',padding:'12px 16px',borderBottom:'1px solid #222'}}>
  <Link href="/" className="logo">HOTMESS</Link>
      <nav style={{display:'flex',gap:12}}>
        <Link href="/radio">Radio</Link>
        <Link href="/drop">Drops</Link>
        <Link href="/hand-in-hand">Hand-in-Hand</Link>
        <Link href="/affiliate">Affiliate</Link>
        <Link href="/rooms">Rooms</Link>
      </nav>
    </header>
  );
}
