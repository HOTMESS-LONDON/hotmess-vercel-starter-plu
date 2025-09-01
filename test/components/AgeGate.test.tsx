import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AgeGate from '@/components/AgeGate'

// Mock the cookies module with proper factory function
vi.mock('@/lib/cookies', () => {
  const mockIsVerified = vi.fn()
  const mockSetVerified = vi.fn()
  const mockClearVerification = vi.fn()
  
  return {
    ageVerification: {
      isVerified: mockIsVerified,
      setVerified: mockSetVerified,
      clearVerification: mockClearVerification,
    },
  }
})

// Get mock functions from the module
import { ageVerification } from '@/lib/cookies'
const mockAgeVerification = ageVerification as any

// Mock window.location
const mockLocation = {
  href: '',
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

describe('AgeGate', () => {
  beforeEach(() => {
    mockAgeVerification.isVerified.mockReturnValue(false)
    mockAgeVerification.setVerified.mockClear()
    mockAgeVerification.clearVerification.mockClear()
    mockLocation.href = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should show age gate when user is not verified', async () => {
    mockAgeVerification.isVerified.mockReturnValue(false)
    
    render(
      <AgeGate>
        <div data-testid="protected-content">Protected Content</div>
      </AgeGate>
    )

    await waitFor(() => {
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument()
    })
    
    expect(screen.getByText('I am 18 or older')).toBeInTheDocument()
    expect(screen.getByText('I am under 18')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('should hide age gate and show content when user is verified', async () => {
    mockAgeVerification.isVerified.mockReturnValue(true)
    
    render(
      <AgeGate>
        <div data-testid="protected-content">Protected Content</div>
      </AgeGate>
    )

    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument()
    })
    
    expect(screen.queryByText('Age Verification Required')).not.toBeInTheDocument()
  })

  it('should set verification cookie when user confirms age', async () => {
    mockAgeVerification.isVerified.mockReturnValue(false)
    
    render(
      <AgeGate>
        <div data-testid="protected-content">Protected Content</div>
      </AgeGate>
    )

    await waitFor(() => {
      expect(screen.getByText('I am 18 or older')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('I am 18 or older'))

    await waitFor(() => {
      expect(mockAgeVerification.setVerified).toHaveBeenCalledTimes(1)
    })
  })

  it('should redirect when user denies age verification', async () => {
    mockAgeVerification.isVerified.mockReturnValue(false)
    
    render(
      <AgeGate>
        <div data-testid="protected-content">Protected Content</div>
      </AgeGate>
    )

    await waitFor(() => {
      expect(screen.getByText('I am under 18')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('I am under 18'))

    expect(mockLocation.href).toBe('https://www.google.com')
  })

  it('should have proper accessibility attributes', async () => {
    mockAgeVerification.isVerified.mockReturnValue(false)
    
    render(
      <AgeGate>
        <div data-testid="protected-content">Protected Content</div>
      </AgeGate>
    )

    await waitFor(() => {
      expect(screen.getByText('Age Verification Required')).toBeInTheDocument()
    })

    // Check for proper ARIA labels and roles
    const confirmButton = screen.getByText('I am 18 or older')
    const denyButton = screen.getByText('I am under 18')
    
    expect(confirmButton).toBeInTheDocument()
    expect(denyButton).toBeInTheDocument()
    
    // Check dialog structure
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})