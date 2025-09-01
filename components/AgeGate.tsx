'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ageVerification } from '@/lib/cookies'
import { AGE_GATE } from '@/lib/constants'

interface AgeGateProps {
  children: React.ReactNode
}

export default function AgeGate({ children }: AgeGateProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already verified their age
    const isVerified = ageVerification.isVerified()
    setIsOpen(!isVerified)
    setIsLoading(false)
  }, [])

  const handleAgeConfirm = () => {
    ageVerification.setVerified()
    setIsOpen(false)
  }

  const handleAgeDeny = () => {
    // Redirect to a safe external site or show alternative content
    window.location.href = 'https://www.google.com'
  }

  // Show loading state while checking verification status
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent 
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">{AGE_GATE.title}</DialogTitle>
            <DialogDescription className="text-center leading-relaxed">
              {AGE_GATE.message}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              This site contains adult content and requires age verification.
            </span>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleAgeDeny}
              className="w-full sm:w-auto"
            >
              {AGE_GATE.denyText}
            </Button>
            <Button
              onClick={handleAgeConfirm}
              className="w-full sm:w-auto"
            >
              {AGE_GATE.confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Only render children if age is verified */}
      {!isOpen && children}
    </>
  )
}