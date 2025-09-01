/**
 * Cookie utilities for HOTMESS London
 * Provides functions for setting, getting, and deleting cookies with proper TypeScript types
 */

// Cookie keys used throughout the application
export const COOKIE_KEYS = {
  AGE_VERIFIED: 'hotmess_age_verified',
  CONSENT: 'hotmess_consent',
  THEME: 'hotmess_theme',
  UTM_TRACKED: 'hotmess_utm_tracked',
} as const

export type CookieKey = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS]

// Cookie options interface
export interface CookieOptions {
  expires?: Date | number // Date object or days from now
  maxAge?: number // seconds
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  httpOnly?: boolean
}

/**
 * Set a cookie with the given name, value, and options
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === 'undefined') {
    console.warn('setCookie called on server side')
    return
  }

  const {
    expires,
    maxAge,
    path = '/',
    domain,
    secure = true,
    sameSite = 'lax',
    httpOnly = false,
  } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (expires) {
    if (typeof expires === 'number') {
      // Convert days to date
      const date = new Date()
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000)
      cookieString += `; expires=${date.toUTCString()}`
    } else {
      cookieString += `; expires=${expires.toUTCString()}`
    }
  }

  if (maxAge !== undefined) {
    cookieString += `; max-age=${maxAge}`
  }

  if (path) {
    cookieString += `; path=${path}`
  }

  if (domain) {
    cookieString += `; domain=${domain}`
  }

  if (secure) {
    cookieString += '; secure'
  }

  if (sameSite) {
    cookieString += `; samesite=${sameSite}`
  }

  if (httpOnly) {
    cookieString += '; httponly'
  }

  document.cookie = cookieString
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null
  }

  const nameEQ = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')

  for (let cookie of cookies) {
    cookie = cookie.trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') {
    console.warn('deleteCookie called on server side')
    return
  }

  setCookie(name, '', {
    expires: new Date(0),
    path,
  })
}

/**
 * Check if a cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null
}

/**
 * Age verification cookie utilities
 */
export const ageVerification = {
  /**
   * Check if user has verified their age
   */
  isVerified(): boolean {
    return getCookie(COOKIE_KEYS.AGE_VERIFIED) === 'true'
  },

  /**
   * Set age verification cookie
   */
  setVerified(): void {
    setCookie(COOKIE_KEYS.AGE_VERIFIED, 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      secure: true,
      sameSite: 'lax',
    })
  },

  /**
   * Clear age verification
   */
  clearVerification(): void {
    deleteCookie(COOKIE_KEYS.AGE_VERIFIED)
  },
}

/**
 * Consent management utilities
 */
export const consent = {
  /**
   * Check if user has given consent
   */
  hasConsent(): boolean {
    return getCookie(COOKIE_KEYS.CONSENT) === 'accepted'
  },

  /**
   * Set consent cookie
   */
  setConsent(accepted: boolean): void {
    setCookie(COOKIE_KEYS.CONSENT, accepted ? 'accepted' : 'denied', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      secure: true,
      sameSite: 'lax',
    })
  },

  /**
   * Clear consent
   */
  clearConsent(): void {
    deleteCookie(COOKIE_KEYS.CONSENT)
  },
}