import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('should render site branding and description', () => {
    render(<Footer />)
    
    expect(screen.getByText('HOTMESS London')).toBeInTheDocument()
    expect(screen.getByText('Fashion + Lube + Radio + Records. Always too much, never enough.')).toBeInTheDocument()
    expect(screen.getByText("London's filth frequency. Clothes, lube, radio, survival.")).toBeInTheDocument()
  })

  it('should render legal links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Legal')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    expect(screen.getByText('Cookie Policy')).toBeInTheDocument()
  })

  it('should render accessibility links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Accessibility')).toBeInTheDocument()
    expect(screen.getByText('Accessibility Statement')).toBeInTheDocument()
    expect(screen.getByText('Report an Issue')).toBeInTheDocument()
  })

  it('should render social links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Connect')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Telegram')).toBeInTheDocument()
  })

  it('should have external links with proper attributes', () => {
    render(<Footer />)
    
    const twitterLink = screen.getByText('Twitter').closest('a')
    const instagramLink = screen.getByText('Instagram').closest('a')
    
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/hotmessldn')
    expect(twitterLink).toHaveAttribute('target', '_blank')
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/hotmessldn')
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should have internal links without external attributes', () => {
    render(<Footer />)
    
    const privacyLink = screen.getByText('Privacy Policy').closest('a')
    const telegramLink = screen.getByText('Telegram').closest('a')
    
    expect(privacyLink).toHaveAttribute('href', '/privacy')
    expect(privacyLink).not.toHaveAttribute('target')
    expect(privacyLink).not.toHaveAttribute('rel')
    
    expect(telegramLink).toHaveAttribute('href', '/rooms')
    expect(telegramLink).not.toHaveAttribute('target')
  })

  it('should show current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} HOTMESS London. All rights reserved.`)).toBeInTheDocument()
  })

  it('should have accessibility statement and contact info', () => {
    render(<Footer />)
    
    expect(screen.getByText(/HOTMESS London is committed to creating inclusive and accessible content/)).toBeInTheDocument()
    
    const accessibilityEmail = screen.getByText('accessibility@hotmess.london')
    expect(accessibilityEmail.closest('a')).toHaveAttribute('href', 'mailto:accessibility@hotmess.london')
  })

  it('should show team attribution', () => {
    render(<Footer />)
    
    expect(screen.getByText('Built with')).toBeInTheDocument()
    expect(screen.getByText('by the HOTMESS London team')).toBeInTheDocument()
  })

  it('should have proper footer structure with contentinfo role', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('border-t', 'bg-background')
  })

  it('should show external link icons', () => {
    render(<Footer />)
    
    // External links should have external link icons
    const twitterLink = screen.getByText('Twitter').closest('a')
    const instagramLink = screen.getByText('Instagram').closest('a')
    
    expect(twitterLink?.querySelector('svg')).toBeInTheDocument()
    expect(instagramLink?.querySelector('svg')).toBeInTheDocument()
  })
})