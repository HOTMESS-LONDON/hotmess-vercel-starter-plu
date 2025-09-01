'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// UTM Parameters interface
interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

// UTM Context
interface UTMContextType {
  utmParams: UTMParams
  setUTMParams: (params: UTMParams) => void
}

const UTMContext = createContext<UTMContextType | undefined>(undefined)

// UTM Provider component
function UTMProvider({ children }: { children: ReactNode }) {
  const [utmParams, setUTMParams] = useState<UTMParams>({})

  useEffect(() => {
    // Extract UTM parameters from URL on client side
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const params: UTMParams = {}

      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmKeys.forEach((key) => {
        const value = urlParams.get(key)
        if (value) {
          params[key as keyof UTMParams] = value
        }
      })

      if (Object.keys(params).length > 0) {
        setUTMParams(params)
        // Store in sessionStorage for persistence
        sessionStorage.setItem('utm_params', JSON.stringify(params))
      } else {
        // Try to restore from sessionStorage
        const stored = sessionStorage.getItem('utm_params')
        if (stored) {
          try {
            setUTMParams(JSON.parse(stored))
          } catch (e) {
            console.warn('Failed to parse stored UTM params:', e)
          }
        }
      }
    }
  }, [])

  return <UTMContext.Provider value={{ utmParams, setUTMParams }}>{children}</UTMContext.Provider>
}

// Hook to use UTM context
export function useUTM() {
  const context = useContext(UTMContext)
  if (context === undefined) {
    throw new Error('useUTM must be used within a UTMProvider')
  }
  return context
}

// ClientLayout component that wraps the app with client-side providers
export default function ClientLayout({ children }: { children: ReactNode }) {
  return <UTMProvider>{children}</UTMProvider>
}
