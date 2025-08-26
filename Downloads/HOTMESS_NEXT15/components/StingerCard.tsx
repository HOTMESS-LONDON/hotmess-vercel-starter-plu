"use client";
import { useState } from "react";

export default function StingerCard({ title, file }: { title: string; file: string }) {
  return (
    <div className="card lux-glass lux-shadow" style={{padding:32,display:'flex',flexDirection:'column',alignItems:'center',gap:16,minWidth:260}}>
      <h3 className="lux-gradient lux" style={{fontSize:28,WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>{title}</h3>
      <audio controls src={file} style={{width:'100%',borderRadius:8,boxShadow:'0 2px 12px 0 rgba(252,87,94,0.12)'}} />
      <button className="lux-btn" style={{marginTop:12}} onClick={()=>{
        const audio = new Audio(file);
        audio.play();
      }}>Preview</button>
    </div>
  );
}
