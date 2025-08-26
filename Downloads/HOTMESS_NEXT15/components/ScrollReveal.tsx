"use client";
import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className="" }:{children:React.ReactNode;className?:string}){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ el.classList.add("show"); obs.disconnect(); }
    },{threshold:0.12});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
