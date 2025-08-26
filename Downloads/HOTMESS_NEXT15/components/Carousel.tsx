"use client";
import { useRef } from "react";

export default function Carousel({ children }:{children:React.ReactNode}){
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{overflowX:"auto"}} ref={ref} className="hm-carousel">
      <div style={{display:"flex",gap:16,minWidth:"100%"}}>
        {children}
      </div>
    </div>
  );
}
