'use client'
import React from 'react'
export type UTM = { utm_source?:string; utm_medium?:string; utm_campaign?:string; aff?:string; sku?:string; room?:string }
const KEY = 'hotmess:utm';
const Ctx = React.createContext<{utm:UTM;appendUTM:(url:string)=>string}|null>(null)
export function UTMProvider({children}:{children:React.ReactNode}){
  const [utm,setUTM] = React.useState<UTM>(()=>{
    try{ const raw = sessionStorage.getItem(KEY); return raw? JSON.parse(raw):{} }catch{return {}}
  })
  React.useEffect(()=>{
    const p=new URLSearchParams(window.location.search);
    const next:UTM = {}
    ;['utm_source','utm_medium','utm_campaign','aff','sku','room'].forEach(k=>{
      const v=p.get(k); if(v) (next as any)[k]=v
    })
    if(Object.keys(next).length){
      setUTM(prev=>{const m={...prev,...next}; sessionStorage.setItem(KEY, JSON.stringify(m)); return m})
    }
  },[])
  const appendUTM = React.useCallback((url:string)=>{
    if(!utm || Object.keys(utm).length===0) return url
    try{
      const u=new URL(url, window.location.origin)
      Object.entries(utm).forEach(([k,v])=>{ if(v && !u.searchParams.has(k)) u.searchParams.set(k,String(v)) })
      return u.toString()
    }catch{
      const qs=new URLSearchParams(utm as any).toString()
      return url+(url.includes('?')?'&':'?')+qs
    }
  },[utm])
  return <Ctx.Provider value={{utm,appendUTM}}>{children}</Ctx.Provider>
}
export function useUTM(){
  const ctx = React.useContext(Ctx); if(!ctx) throw new Error('useUTM inside UTMProvider'); return ctx
}
