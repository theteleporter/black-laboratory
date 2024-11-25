'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Matter from 'matter-js'

export default function FallingTextarea() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const renderRef = useRef<Matter.Render | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const sceneRef = useRef<Matter.Composite | null>(null)
  const [showBorders, setShowBorders] = useState(false)
  const lastTextRef = useRef('')
  const positionsRef = useRef<{ [key: number]: { x: number; y: number } }>({})
  const groundRef = useRef<Matter.Body | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const initPhysics = useCallback(() => {
    const Engine = Matter.Engine
    const Render = Matter.Render
    const Runner = Matter.Runner
    const Composite = Matter.Composite
    const Bodies = Matter.Bodies

    engineRef.current = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    })

    renderRef.current = Render.create({
      canvas: canvasRef.current!,
      engine: engineRef.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    })

    runnerRef.current = Runner.create()
    sceneRef.current = Composite.create()

    const wallOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
      friction: 0.1,
      restitution: 0.6
    }

    groundRef.current = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, wallOptions)
    const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 60, window.innerHeight, wallOptions)
    const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 60, window.innerHeight, wallOptions)

    Composite.add(sceneRef.current, [groundRef.current, leftWall, rightWall])
    Composite.add(engineRef.current.world, sceneRef.current)

    Runner.run(runnerRef.current, engineRef.current)
    Render.run(renderRef.current)
  }, [])

  const renderScene = useCallback(() => {
    if (!renderRef.current || !engineRef.current) return

    const context = renderRef.current.context
    const bodies = Matter.Composite.allBodies(engineRef.current.world)

    context.clearRect(0, 0, renderRef.current.options.width as number, renderRef.current.options.height as number)

    context.font = '14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    bodies.forEach(body => {
      // Ensure text property exists on body
      if (body.render && body.render.text) {
        const { x, y } = body.position
        const angle = body.angle

        context.save()
        context.translate(x, y)
        context.rotate(angle)

        const width = body.bounds.max.x - body.bounds.min.x
        const height = body.bounds.max.y - body.bounds.min.y

        if (showBorders) {
          context.strokeStyle = '#ffffff'
          context.strokeRect(-width / 2, -height / 2, width, height)
        }

        context.fillStyle = body.render.fillStyle || '#ffffff'
        context.fillText(body.render.text, 0, 0)

        context.restore()
      }
    })
  }, [showBorders])

  const updateCharPositions = useCallback(() => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const text = textarea.value
    const textareaRect = textarea.getBoundingClientRect()
    const computedStyle = window.getComputedStyle(textarea)
    const paddingLeft = parseFloat(computedStyle.paddingLeft)
    const paddingTop = parseFloat(computedStyle.paddingTop)
    const lineHeight = parseFloat(computedStyle.lineHeight)
    const charWidth = 8.5 // Approximate width of a monospace character

    let positions: { [key: number]: { x: number; y: number } } = {}
    let lineIndex = 0
    let charIndex = 0

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '\n') {
        lineIndex++
        charIndex = 0
      } else {
        const x = textareaRect.left + paddingLeft + charIndex * charWidth
        const y = textareaRect.top + paddingTop + lineIndex * lineHeight
        positions[i] = { x, y }
        charIndex++
      }
    }

    positionsRef.current = positions
  }, [])

  const handleResize = useCallback(() => {
    if (renderRef.current) {
      renderRef.current.canvas.width = window.innerWidth
      renderRef.current.canvas.height = window.innerHeight
    }
    if (engineRef.current && sceneRef.current && groundRef.current) {
      Matter.Body.setPosition(groundRef.current, Matter.Vector.create(window.innerWidth / 2, window.innerHeight))
      const rightWall = sceneRef.current.bodies[2]
      if (rightWall) Matter.Body.setPosition(rightWall, Matter.Vector.create(window.innerWidth, window.innerHeight / 2))
    }
    updateCharPositions()
    setIsMobile(window.innerWidth < 640) // Assuming 640px as the breakpoint for mobile
  }, [updateCharPositions])

  useEffect(() => {
    initPhysics()
    handleResize()

    window.addEventListener('resize', handleResize)

    // Initialize lastTextRef with the initial text content
    lastTextRef.current = textareaRef.current?.value || ''
    updateCharPositions()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current)
        renderRef.current.canvas.remove()
        renderRef.current.canvas = null as any
        renderRef.current.context = null as any
      }
      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current)
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current)
      }
    }
  }, [initPhysics, updateCharPositions, handleResize])

  useEffect(() => {
    if (renderRef.current) {
      renderRef.current.options.wireframes = false
      renderRef.current.options.background = 'transparent'
      Matter.Events.on(renderRef.current, 'afterRender', renderScene)
    }

    return () => {
      if (renderRef.current) {
        Matter.Events.off(renderRef.current, 'afterRender', renderScene)
      }
    }
  }, [renderScene])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    const oldText = lastTextRef.current

    if (newText.length < oldText.length && sceneRef.current && engineRef.current) {
      const Bodies = Matter.Bodies
      const Composite = Matter.Composite

      let startIndex = 0
      while (startIndex < newText.length && newText[startIndex] === oldText[startIndex]) {
        startIndex++
      }

      const deletedChars = oldText.slice(startIndex, startIndex + (oldText.length - newText.length))

      deletedChars.split('').forEach((char, index) => {
        const position = positionsRef.current[startIndex + index]
        if (position) {
          const body = Bodies.circle(position.x, position.y, 5, {
            render: {
              text: char, // Assign the text property here
              fillStyle: '#ffffff'
            }
          })
          Composite.add(engineRef.current.world, body)
        }
      })
    }

    lastTextRef.current = newText
  }, [])

  return (
    <div>
      <textarea
        ref={textareaRef}
        onChange={handleTextChange}
        placeholder="Type here..."
        style={{ position: 'absolute', top: 10, left: 10 }}
      />
      <canvas ref={canvasRef} />
    </div>
  )
}
