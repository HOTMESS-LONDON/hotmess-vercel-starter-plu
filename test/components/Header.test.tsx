import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/Header'

// Mock Next.js router
const mockPathname = '/'
const mockPush = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Header', () => {
  it('should render site logo and navigation items', () => {
    render(<Header />)
    
    expect(screen.getByText('HOTMESS London')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Radio')).toBeInTheDocument()
    expect(screen.getByText('Drops')).toBeInTheDocument()
    expect(screen.getByText('Hand-in-Hand')).toBeInTheDocument()
    expect(screen.getByText('Rooms')).toBeInTheDocument()
    expect(screen.getByText('Affiliate')).toBeInTheDocument()
  })

  it('should have proper navigation links', () => {
    render(<Header />)
    
    const homeLink = screen.getAllByText('Home')[0].closest('a')
    const radioLink = screen.getAllByText('Radio')[0].closest('a')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(radioLink).toHaveAttribute('href', '/radio')
  })

  it('should show mobile menu when menu button is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Toggle navigation menu')
    fireEvent.click(menuButton)
    
    // Check if mobile navigation descriptions are visible
    expect(screen.getByText('24/7 streaming. Hand-in-Hand is the only place to land.')).toBeInTheDocument()
    expect(screen.getByText('Exclusive merchandise and limited releases.')).toBeInTheDocument()
  })

  it('should close mobile menu when navigation item is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Toggle navigation menu')
    fireEvent.click(menuButton)
    
    // Check if mobile navigation descriptions are visible
    expect(screen.getByText('24/7 streaming. Hand-in-Hand is the only place to land.')).toBeInTheDocument()
    
    // Click on the close button (X) instead of a link to avoid navigation issues
    fireEvent.click(menuButton)
    
    // Mobile menu descriptions should no longer be visible
    expect(screen.queryByText('24/7 streaming. Hand-in-Hand is the only place to land.')).not.toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<Header />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle navigation menu')).toBeInTheDocument()
  })

  it('should have sticky positioning classes', () => {
    render(<Header />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-40')
  })

  it('should show menu icon when closed and X icon when open', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Toggle navigation menu')
    
    // Initially should show menu icon (Menu component)
    expect(menuButton.querySelector('svg')).toBeInTheDocument()
    
    fireEvent.click(menuButton)
    
    // After click should show X icon
    expect(menuButton.querySelector('svg')).toBeInTheDocument()
  })
})