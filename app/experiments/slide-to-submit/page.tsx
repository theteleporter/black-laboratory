'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronRight } from "lucide-react"
import confetti from 'canvas-confetti'

export default function Component({ onSubmit }: { onSubmit?: () => void } = {}) {
  const [thumbPosition, setThumbPosition] = useState(0)
  const [status, setStatus] = useState<'idle' | 'sliding' | 'almostThere' | 'completed'>('idle')
  const [tapPosition, setTapPosition] = useState<{ x: number, y: number } | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)

  const handleStart = (clientX: number, clientY: number) => {
    if (status === 'completed') return
    setStatus('sliding')
    setTapPosition({ x: clientX, y: clientY })
    isDraggingRef.current = true
    handleMove(clientX)
  }

  const handleMove = useCallback((clientX: number, clientY?: number) => {
    if (status === 'completed' || !isDraggingRef.current) return
    if (sliderRef.current && thumbRef.current) {
      const rect = sliderRef.current.getBoundingClientRect()
      const thumbWidth = thumbRef.current.offsetWidth
      const trackWidth = rect.width - thumbWidth
      const newPosition = Math.max(0, Math.min(trackWidth, clientX - rect.left - thumbWidth / 2))
      setThumbPosition(newPosition)
      if (newPosition / trackWidth > 0.9) {
        setStatus('almostThere')
      } else if (newPosition / trackWidth < 0.9) {
        setStatus('sliding')
      }
    }
    if (clientY !== undefined) {
      setTapPosition({ x: clientX, y: clientY })
    }
  }, [status])

  const handleEnd = useCallback(() => {
    if (status === 'completed') return
    isDraggingRef.current = false
    setTapPosition(null)
    
    if (sliderRef.current && thumbRef.current) {
      const trackWidth = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth
      setThumbPosition(prevPosition => {
        if (prevPosition >= trackWidth) {
          setStatus('completed')
          onSubmit?.()
          confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0 },
            gravity: 0.8,
            scalar: 1.2,
            startVelocity: 30,
            ticks: 300
          })
          return prevPosition
        } else {
          setStatus('idle')
          return 0
        }
      })
    }
  }, [status, onSubmit])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    handleStart(event.clientX, event.clientY)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    handleMove(event.clientX, event.clientY)
  }

  const handleMouseUp = () => {
    handleEnd()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    handleStart(event.touches[0].clientX, event.touches[0].clientY)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    handleMove(event.touches[0].clientX, event.touches[0].clientY)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  const handleReset = () => {
    setThumbPosition(0)
    setStatus('idle')
  }

  const statusMessages = {
    idle: 'Slide to submit',
    sliding: 'Keep sliding...',
    almostThere: 'Almost there!',
    completed: 'Successfully submitted!'
  }

  return (
    <div className="w-full min-w-[300px] max-w-full mx-auto px-4 pt-8">
      <div className="h-8 mb-4 text-center relative overflow-hidden">
        {Object.entries(statusMessages).map(([key, message]) => (
          <div
            key={key}
            className={`absolute inset-0 transition-all duration-300 ease-in-out ${
              status === key ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-full'
            }`}
          >
            <span className="text-sm font-medium text-muted-foreground inline-block">
              {message}
            </span>
          </div>
        ))}
      </div>
      <div 
        ref={sliderRef}
        className={`relative h-10 mb-4 rounded-full overflow-hidden shadow-sm bg-secondary border border-gray-200 ${status === 'completed' ? 'cursor-default' : 'cursor-pointer'}`}
        onMouseDown={status !== 'completed' ? handleMouseDown : undefined}
        onTouchStart={status !== 'completed' ? handleTouchStart : undefined}
        onTouchMove={status !== 'completed' ? handleTouchMove : undefined}
        onTouchEnd={status !== 'completed' ? handleTouchEnd : undefined}
      >
        <div 
          className="absolute inset-y-0 left-0 bg-primary rounded-full"
          style={{ width: `${thumbPosition + 36}px` }}
        />
        <div 
          ref={thumbRef}
          className="absolute top-0 bottom-0 left-0 w-9 bg-background rounded-full shadow-sm flex items-center justify-center"
          style={{ transform: `translateX(${thumbPosition}px)` }}
        >
          <ChevronRight className="text-primary" size={20} />
        </div>
      </div>
      <div className="h-8 text-center">
        {status === 'completed' && (
          <button
            onClick={handleReset}
            className="text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Reset
          </button>
        )}
      </div>
      {tapPosition && (
        <div 
          className="fixed w-6 h-6 rounded-full bg-gray-500 bg-opacity-50 pointer-events-none"
          style={{
            left: tapPosition.x - 12,
            top: tapPosition.y - 12,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  )
}
