import { render, screen } from '@testing-library/react'
import { expect, it, describe, vi, beforeEach } from 'vitest'
import ClientLayout, { useUTM } from '../../app/client-layout'

// Mock window.location
const mockLocation = {
  search: '?utm_source=test&utm_campaign=vitest',
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
})

// Test component that uses the UTM context
function TestComponent() {
  const { utmParams } = useUTM()
  return (
    <div>
      <span data-testid="utm-source">{utmParams.utm_source || 'none'}</span>
      <span data-testid="utm-campaign">{utmParams.utm_campaign || 'none'}</span>
    </div>
  )
}

describe('ClientLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders children correctly', () => {
    render(
      <ClientLayout>
        <div data-testid="child-content">Test Content</div>
      </ClientLayout>
    )

    expect(screen.getByTestId('child-content')).toHaveTextContent('Test Content')
  })

  it('provides UTM context to child components', () => {
    render(
      <ClientLayout>
        <TestComponent />
      </ClientLayout>
    )

    // UTM params should be available (even if empty initially)
    expect(screen.getByTestId('utm-source')).toBeInTheDocument()
    expect(screen.getByTestId('utm-campaign')).toBeInTheDocument()
  })

  it('throws error when useUTM is used outside provider', () => {
    // Mock console.error to avoid test output noise
    const originalError = console.error
    console.error = vi.fn()

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useUTM must be used within a UTMProvider')

    console.error = originalError
  })
})
