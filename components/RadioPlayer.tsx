'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface RadioPlayerProps {
  streamUrl?: string
  title?: string
}

export default function RadioPlayer({ 
  streamUrl = process.env.NEXT_PUBLIC_RADIOKING_STREAM_URL || '',
  title = 'HOTMESS Radio'
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleError = () => {
    setError('Stream connection failed')
    setIsPlaying(false)
    setIsLoading(false)
  }

  if (!streamUrl) {
    return (
      <Card className="border-yellow-500 bg-yellow-500/10">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Stream Not Configured</h3>
            <p className="text-sm text-muted-foreground">
              The radio stream URL is not configured. Add <code>NEXT_PUBLIC_RADIOKING_STREAM_URL</code> to your environment variables.
            </p>
            <p className="text-xs text-muted-foreground">
              This is normal in development mode.
            </p>
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
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {isPlaying ? '🎵 Now streaming live' : 'Ready to stream'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-md p-3 text-center">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Play/Pause Button */}
          <div className="flex justify-center">
            <Button
              onClick={handlePlay}
              disabled={isLoading}
              size="lg"
              className="w-32"
            >
              {isLoading ? (
                'Loading...'
              ) : isPlaying ? (
                '⏸️ Pause'
              ) : (
                '▶️ Play'
              )}
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
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Stream Info */}
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              Stream URL: {streamUrl ? '✅ Configured' : '❌ Not configured'}
            </p>
            {streamUrl && (
              <p className="text-xs text-muted-foreground break-all">
                {streamUrl}
              </p>
            )}
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