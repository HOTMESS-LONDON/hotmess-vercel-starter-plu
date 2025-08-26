'use client'
import React from 'react'
import { UTMProvider } from '../lib/utm'
export default function ClientLayout({children}:{children:React.ReactNode}){
  return <UTMProvider>{children}</UTMProvider>
}
