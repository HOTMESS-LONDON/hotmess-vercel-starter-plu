'use client';
export default function RadioPlayer() {
  const stream = process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL || '';
  return (
    <div style={{marginTop:16}}>
      <audio controls preload="none" style={{width:'100%'}}>
        <source src={stream} type="audio/mpeg" />
      </audio>
      <p style={{fontSize:12,opacity:.6,marginTop:8}}>Stream: {stream || 'not configured'}</p>
    </div>
  );
}
