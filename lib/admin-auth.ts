import { NextRequest } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hotmess2024'

export function validateAdminAccess(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  
  // Simple password-based auth for now
  return token === ADMIN_PASSWORD
}

export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  return Buffer.from(password).toString('base64')
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export function generateAdminToken(): string {
  return ADMIN_PASSWORD
}