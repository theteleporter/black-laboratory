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
      if (body.render.text) {
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
    lastTextRef.current = codeSnippet
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
          const { x, y } = position
          const charWidth = 8.5
          const charHeight = 17

          const letter = Bodies.rectangle(
            x + charWidth / 2,
            y + charHeight / 2,
            charWidth,
            charHeight,
            {
              restitution: 0.8,
              friction: 0.005,
              density: 0.001,
              render: {
                fillStyle: '#cccccc',
                text: char
              }
            }
          )
          Composite.add(sceneRef.current!, letter)
        }
      })
    }

    lastTextRef.current = newText
    updateCharPositions()
  }, [updateCharPositions])

  const handleFocus = useCallback(() => {
    if (isMobile && groundRef.current && engineRef.current) {
      const textareaBottom = textareaRef.current?.getBoundingClientRect().bottom || 0
      Matter.Body.setPosition(groundRef.current, Matter.Vector.create(window.innerWidth / 2, textareaBottom + 120)) // Changed from 20 to 120
    }
  }, [isMobile])

  const handleBlur = useCallback(() => {
    if (isMobile && groundRef.current && engineRef.current) {
      Matter.Body.setPosition(groundRef.current, Matter.Vector.create(window.innerWidth / 2, window.innerHeight))
    }
  }, [isMobile])

  const codeSnippet = `function fib(n) {
  const seq = [0, 1];
  while (seq.length < n) {
    const len = seq.length;
    seq.push(
      seq[len - 1] + seq[len - 2]
    );
  }
  return seq.slice(0, n);
}`

  return (
    <div className="w-screen h-dvh overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-4 right-4 flex items-center z-50">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showBorders}
            onChange={(e) => setShowBorders(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="ml-2 text-sm font-medium text-gray-300">Debug</span>
        </label>
      </div>
      <div className="absolute inset-x-0 top-0 flex items-start justify-center p-4 sm:inset-0 sm:items-center">
        <textarea
          ref={textareaRef}
          defaultValue={codeSnippet}
          onChange={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full max-w-3xl h-60 bg-transparent text-white border border-gray-700 rounded p-4 resize-none focus:outline-none focus:border-blue-500"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '14px',
            lineHeight: '1.5',
            padding: '16px',
          }}
        />
      </div>
    </div>
  )
}
