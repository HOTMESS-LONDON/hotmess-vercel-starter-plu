import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Home Page', () => {
  it('has proper semantic structure with headings', () => {
    render(<Home />)

    // Main heading
    const mainHeading = screen.getByRole('heading', { level: 1, name: /hotmess/i })
    expect(mainHeading).toBeInTheDocument()

    // Section headings (using getByText for h2s inside cards)
    expect(screen.getByText('Radio')).toBeInTheDocument()
    expect(screen.getByText('Hand-in-Hand')).toBeInTheDocument()
    expect(screen.getByText('Drops')).toBeInTheDocument()
    expect(screen.getByText('Rooms')).toBeInTheDocument()
  })

  it('has accessible navigation links', () => {
    render(<Home />)

    // Primary CTA links
    const radioLink = screen.getByRole('link', { name: /open radio/i })
    expect(radioLink).toBeInTheDocument()
    expect(radioLink).toHaveAttribute('href', '/radio')

    const dropsLink = screen.getByRole('link', { name: /shop drops/i })
    expect(dropsLink).toBeInTheDocument()
    expect(dropsLink).toHaveAttribute('href', '/drop')

    // Grid teaser links
    expect(screen.getByRole('link', { name: /listen now/i })).toHaveAttribute('href', '/radio')
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      '/hand-in-hand'
    )
    expect(screen.getByRole('link', { name: /shop now/i })).toHaveAttribute('href', '/drop')
    expect(screen.getByRole('link', { name: /join rooms/i })).toHaveAttribute('href', '/rooms')
  })

  it('has proper content hierarchy and descriptions', () => {
    render(<Home />)

    // Main tagline
    expect(
      screen.getByText("London's filth frequency. Clothes, lube, radio, survival.")
    ).toBeInTheDocument()

    // Card descriptions
    expect(
      screen.getByText('24/7 streaming. Hand-in-Hand is the only place to land.')
    ).toBeInTheDocument()
    expect(
      screen.getByText("Sunday's transformative show. Connection, community, conversation.")
    ).toBeInTheDocument()
    expect(screen.getByText('Exclusive merchandise and limited releases.')).toBeInTheDocument()
    expect(
      screen.getByText('Safe spaces for community conversation on Telegram.')
    ).toBeInTheDocument()
  })

  it('has interactive elements with proper roles', () => {
    render(<Home />)

    // Check that buttons have proper roles
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)

    // Check that links have proper roles
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('follows responsive design patterns', () => {
    render(<Home />)

    const container = screen.getByText('HOTMESS').closest('div')
    expect(container).toHaveClass('space-y-12')

    // Check for responsive grid classes
    const gridSection = screen.getByText('Radio').closest('section')
    expect(gridSection).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2')
  })

  it('has proper text contrast and readability', () => {
    render(<Home />)

    // Check for muted text utility classes that provide proper contrast
    const tagline = screen.getByText("London's filth frequency. Clothes, lube, radio, survival.")
    expect(tagline).toHaveClass('text-muted-foreground')

    // Check main heading has proper styling
    const mainHeading = screen.getByText('HOTMESS')
    expect(mainHeading).toHaveClass('text-6xl', 'md:text-8xl', 'font-bold')
  })
})
