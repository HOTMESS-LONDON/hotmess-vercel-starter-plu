import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setCookie, getCookie, deleteCookie, hasCookie, ageVerification, consent } from '@/lib/cookies'

// Mock document.cookie
let mockCookies: string[] = []

Object.defineProperty(document, 'cookie', {
  get: () => mockCookies.join('; '),
  set: (value: string) => {
    const [nameValue] = value.split(';')
    const [name] = nameValue.split('=')
    
    // Remove existing cookie with same name
    mockCookies = mockCookies.filter(cookie => !cookie.startsWith(name + '='))
    
    // Add new cookie if not being deleted
    if (!value.includes('expires=Thu, 01 Jan 1970')) {
      mockCookies.push(nameValue)
    }
  },
})

describe('Cookie Utilities', () => {
  beforeEach(() => {
    mockCookies = []
  })

  afterEach(() => {
    mockCookies = []
  })

  describe('setCookie', () => {
    it('should set a basic cookie', () => {
      setCookie('test', 'value')
      expect(getCookie('test')).toBe('value')
    })

    it('should handle special characters', () => {
      setCookie('test', 'value with spaces & symbols!')
      expect(getCookie('test')).toBe('value with spaces & symbols!')
    })

    it('should set cookie with path', () => {
      // The mock implementation doesn't track the path parameter
      // We'll just verify the cookie is set
      setCookie('test', 'value', { path: '/custom' })
      expect(getCookie('test')).toBe('value')
    })
  })

  describe('getCookie', () => {
    it('should retrieve existing cookie', () => {
      setCookie('test', 'value')
      expect(getCookie('test')).toBe('value')
    })

    it('should return null for non-existent cookie', () => {
      expect(getCookie('nonexistent')).toBeNull()
    })

    it('should handle multiple cookies', () => {
      setCookie('cookie1', 'value1')
      setCookie('cookie2', 'value2')
      
      expect(getCookie('cookie1')).toBe('value1')
      expect(getCookie('cookie2')).toBe('value2')
    })
  })

  describe('deleteCookie', () => {
    it('should delete existing cookie', () => {
      setCookie('test', 'value')
      expect(getCookie('test')).toBe('value')
      
      deleteCookie('test')
      expect(getCookie('test')).toBeNull()
    })
  })

  describe('hasCookie', () => {
    it('should return true for existing cookie', () => {
      setCookie('test', 'value')
      expect(hasCookie('test')).toBe(true)
    })

    it('should return false for non-existent cookie', () => {
      expect(hasCookie('nonexistent')).toBe(false)
    })
  })

  describe('ageVerification', () => {
    it('should return false when not verified', () => {
      expect(ageVerification.isVerified()).toBe(false)
    })

    it('should set and verify age verification', () => {
      ageVerification.setVerified()
      expect(ageVerification.isVerified()).toBe(true)
    })

    it('should clear age verification', () => {
      ageVerification.setVerified()
      expect(ageVerification.isVerified()).toBe(true)
      
      ageVerification.clearVerification()
      expect(ageVerification.isVerified()).toBe(false)
    })
  })

  describe('consent', () => {
    it('should return false when no consent given', () => {
      expect(consent.hasConsent()).toBe(false)
    })

    it('should set and check consent acceptance', () => {
      consent.setConsent(true)
      expect(consent.hasConsent()).toBe(true)
    })

    it('should handle consent denial', () => {
      consent.setConsent(false)
      expect(consent.hasConsent()).toBe(false)
    })

    it('should clear consent', () => {
      consent.setConsent(true)
      expect(consent.hasConsent()).toBe(true)
      
      consent.clearConsent()
      expect(consent.hasConsent()).toBe(false)
    })
  })
})