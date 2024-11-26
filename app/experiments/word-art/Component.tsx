'use client'

import React, { useState, useEffect, useRef } from 'react'

export default function Component() {
  const [text, setText] = useState('Black Labs')
  const [perspective, setPerspective] = useState({ x: 21.50, y: -18 })
  const [isDragging, setIsDragging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust this breakpoint as needed
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (clientY - rect.top - rect.height / 2) / (isMobile ? 10 : 5)
        const y = -(clientX - rect.left - rect.width / 2) / (isMobile ? 10 : 5)
        setPerspective({ x, y })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault() // Prevent scrolling
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    }

    const handleEnd = () => {
      setIsDragging(false)
      document.body.style.userSelect = 'auto'
      document.body.style.overflow = 'auto' // Re-enable scrolling
    }

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (textRef.current && !textRef.current.contains(e.target as Node)) {
        setIsEditing(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleEnd)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEnd)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isDragging, isMobile])

  useEffect(() => {
    if (isEditing && textRef.current) {
      const range = document.createRange()
      range.selectNodeContents(textRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [isEditing])

  const handleStart = (clientX: number, clientY: number) => {
    if (!isEditing) {
      setIsDragging(true)
      setLastTouchPosition({ x: clientX, y: clientY })
      document.body.style.userSelect = 'none'
      document.body.style.overflow = 'hidden' // Disable scrolling
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      handleStart(e.clientX, e.clientY)
    }
    e.stopPropagation()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
    e.stopPropagation()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsEditing(false)
    }
  }

  const handleTextClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isEditing) {
      setIsEditing(true)
      setIsDragging(false)
    }
  }

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center cursor-move relative touch-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="relative"
        style={{
          transform: `perspective(1000px) rotateX(${perspective.x}deg) rotateY(${perspective.y}deg) skew(${isMobile ? '-5deg' : '-10deg'}, ${isMobile ? '-2.5deg' : '-5deg'})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {isEditing && (
          <div
            className="absolute inset-0 bg-gray-200 opacity-50 rounded-xl"
            style={{
              transform: 'scale(1.05)',
            }}
          />
        )}
        <h1
          ref={textRef}
          contentEditable={isEditing}
          suppressContentEditableWarning
          onBlur={(e) => {
            setText(e.currentTarget.textContent || 'WordArt')
            setIsEditing(false)
          }}
          onKeyDown={handleKeyDown}
          onClick={handleTextClick}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter relative outline-none px-4 py-2"
          style={{
            background: 'linear-gradient(to bottom, #FFFF00, #FBCA01, #FFA500, #FF4800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(${isMobile ? '2px 2px 0 #8B4513' : '3px 3px 0 #8B4513'}) 
                     drop-shadow(${isMobile ? '4px 4px 0 #8B4513' : '6px 6px 0 #8B4513'}) 
                     drop-shadow(${isMobile ? '6px 6px 0 #8B4513' : '9px 9px 0 #8B4513'}) 
                     drop-shadow(${isMobile ? '8px 8px 0 #8B4513' : '12px 12px 0 #8B4513'})`,
            userSelect: isDragging ? 'none' : 'text',
            cursor: isEditing ? 'text' : 'pointer',
          }}
          autoCapitalize="off"
        >
          {text}
        </h1>
      </div>
      {isDragging && (
        <div className="absolute bottom-4 left-4 font-mono text-gray-400 text-sm">
          x: {perspective.x.toFixed(2)}, y: {perspective.y.toFixed(2)}
        </div>
      )}
    </div>
  )
}
