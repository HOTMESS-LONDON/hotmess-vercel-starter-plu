import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RadioPlayer from '@/components/RadioPlayer'

describe('RadioPlayer', () => {
  it('renders with default title', () => {
    render(<RadioPlayer streamUrl="https://test-stream.example.com/stream" />)

    expect(screen.getByText('HOTMESS Radio')).toBeInTheDocument()
    expect(screen.getByText('Ready to stream')).toBeInTheDocument()
  })

  it('shows play button initially', () => {
    render(<RadioPlayer streamUrl="https://test-stream.example.com/stream" />)

    const playButton = screen.getByRole('button', { name: /play/i })
    expect(playButton).toBeInTheDocument()
    expect(playButton).toHaveTextContent('▶️ Play')
  })

  it('displays error when no stream URL provided', () => {
    // Override the environment variable for this test
    const originalEnv = process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL
    delete process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL

    render(<RadioPlayer streamUrl="" />)

    expect(screen.getByText('Stream Not Configured')).toBeInTheDocument()
    expect(screen.getByText(/NEXT_PUBLIC_RADIOKING_STREAM_URL/)).toBeInTheDocument()

    // Restore environment variable
    process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL = originalEnv
  })

  it('shows loading state when play is clicked', async () => {
    render(<RadioPlayer streamUrl="https://test-stream.example.com/stream" />)

    const playButton = screen.getByRole('button', { name: /play/i })
    fireEvent.click(playButton)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('has volume control slider', () => {
    render(<RadioPlayer streamUrl="https://test-stream.example.com/stream" />)

    const volumeSlider = screen.getByRole('slider')
    expect(volumeSlider).toBeInTheDocument()
    expect(volumeSlider).toHaveAttribute('min', '0')
    expect(volumeSlider).toHaveAttribute('max', '1')
  })

  it('displays stream URL status', () => {
    render(<RadioPlayer streamUrl="https://test-stream.example.com/stream" />)

    expect(screen.getByText('Stream URL: ✅ Configured')).toBeInTheDocument()
  })

  it('can be customized with title prop', () => {
    render(
      <RadioPlayer streamUrl="https://test-stream.example.com/stream" title="Custom Radio Title" />
    )

    expect(screen.getByText('Custom Radio Title')).toBeInTheDocument()
  })

  it('updates volume display when slider changes', () => {
    render(<RadioPlayer streamUrl="https://test-stream.example.com/stream" />)

    const volumeSlider = screen.getByRole('slider')
    fireEvent.change(volumeSlider, { target: { value: '0.5' } })

    expect(screen.getByText('Volume: 50%')).toBeInTheDocument()
  })
})
