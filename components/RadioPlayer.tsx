'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

/**
 * Props for the RadioPlayer component
 */
interface RadioPlayerProps {
  /** URL of the radio stream to play. Defaults to NEXT_PUBLIC_RADIOKING_STREAM_URL environment variable */
  streamUrl?: string
  /** Title displayed in the player header. Defaults to "HOTMESS Radio" */
  title?: string
}

/**
 * RadioPlayer component for streaming HOTMESS radio
 *
 * Features:
 * - Live audio streaming with play/pause controls
 * - Volume control with visual feedback
 * - Error handling for connection issues
 * - Loading states and user feedback
 * - Accessible controls with proper labeling
 * - Configuration validation and helpful error messages
 *
 * @param streamUrl - The URL of the radio stream to play
 * @param title - Optional title for the player display
 * @returns A complete radio player interface with controls
 */
export default function RadioPlayer({
  streamUrl = process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL || '',
  title = 'HOTMESS Radio',
}: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  /**
   * Handles play/pause functionality for the radio stream
   * Manages loading states, error handling, and audio control
   */
  const handlePlay = async () => {
    if (!streamUrl) {
      setError('Stream URL not configured')
      return
    }

    if (!audioRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.load() // Reload the stream
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (err) {
      setError('Unable to connect to stream')
      setIsPlaying(false)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles volume changes from the range input
   * @param e - Change event from volume slider
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  /**
   * Handles audio stream errors
   * Sets appropriate error state and resets playing status
   */
  const handleError = () => {
    setError('Stream connection failed')
    setIsPlaying(false)
    setIsLoading(false)
  }

  if (!streamUrl) {
    return (
      <Card className="border-yellow-500 bg-yellow-500/10">
        <CardContent className="p-6">
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold text-yellow-400">Stream Not Configured</h3>
            <p className="text-sm text-muted-foreground">
              The radio stream URL is not configured. Add{' '}
              <code>NEXT_PUBLIC_RADIOKING_STREAM_URL</code> to your environment variables.
            </p>
            <p className="text-xs text-muted-foreground">This is normal in development mode.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Player Header */}
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {isPlaying ? '🎵 Now streaming live' : 'Ready to stream'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="rounded-md border border-red-500 bg-red-500/10 p-3 text-center">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <Button onClick={handlePlay} disabled={isLoading} size="lg" className="w-32">
              {isLoading ? 'Loading...' : isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </Button>
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <label htmlFor="volume" className="text-sm text-muted-foreground">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
            />
          </div>

          {/* Stream Info */}
          <div className="space-y-1 text-center">
            <p className="text-xs text-muted-foreground">
              Stream URL: {streamUrl ? '✅ Configured' : '❌ Not configured'}
            </p>
            {streamUrl && <p className="break-all text-xs text-muted-foreground">{streamUrl}</p>}
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            preload="none"
            onError={handleError}
            onLoadStart={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={streamUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </CardContent>
    </Card>
  )
}
