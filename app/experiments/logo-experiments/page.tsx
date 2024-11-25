'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Comfortaa, Geist, Press_Start_2P, Courier_Prime } from 'next/font/google'
import { Download, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const comfortaa = Comfortaa({ subsets: ['latin'], display: 'swap' })
const geist = Geist({ weight: '700', subsets: ['latin'], display: 'swap' })
const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' })
const courierPrime = Courier_Prime({ weight: '400', subsets: ['latin'], display: 'swap' })

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
    {...props}
  />
)

const Switch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    className={`w-11 h-6 flex items-center rounded-full p-1 ${
      checked ? 'bg-[#232323]' : 'bg-gray-300'
    }`}
    onClick={onChange}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
)

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center space-x-2">
    <Button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 0}
      className="p-1"
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
    <span>{currentPage + 1} / {totalPages}</span>
    <Button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
      className="p-1"
    >
      <ChevronRight className="w-5 h-5" />
    </Button>
  </div>
)

export default function LogoGenerators() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [texts, setTexts] = useState<string[]>([])
  const [customFont, setCustomFont] = useState('')
  const [fonts, setFonts] = useState([
    { name: 'Comfortaa', font: comfortaa, defaultText: 'black labs' },
    { name: 'Geist', font: geist, defaultText: 'Black Labs' },
    { name: 'Press Start 2P', font: pressStart2P, defaultText: 'BLACK LABS' },
    { name: 'Courier Prime', font: courierPrime, defaultText: 'Black Labs' },
  ])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fonts.forEach(({ font }) => {
      document.fonts.load(`16px ${font.style.fontFamily}`)
    })
    setTexts(fonts.map(font => font.defaultText))
  }, [])

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus()
    }
  }, [currentFontIndex])

  const generateImage = async (format: 'png' | 'svg') => {
    const content = texts[currentFontIndex] || fonts[currentFontIndex].defaultText
    const fontFamily = fonts[currentFontIndex].name
    const fontSize = 64

    if (format === 'png') {
      await generatePNG(content, fontFamily, fontSize)
    } else {
      generateSVG(content, fontFamily, fontSize)
    }
  }

  const generatePNG = async (content: string, fontFamily: string, fontSize: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    await document.fonts.load(`${fontSize}px "${fontFamily}"`)

    const dpr = window.devicePixelRatio || 1
    const padding = 40
    const letterSpacing = 0.05 * fontSize

    ctx.font = `${fontSize}px "${fontFamily}"`
    const measurements = content.split('').map(char => ctx.measureText(char))

    const totalWidth = measurements.reduce((width, measure, i) => {
      return width + measure.width + (i < content.length - 1 ? letterSpacing : 0)
    }, 0)

    const displayWidth = Math.max(totalWidth + padding * 2, 400)
    const displayHeight = Math.max(fontSize + padding * 2, 200)

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    canvas.style.width = `${displayWidth}px`
    canvas.style.height = `${displayHeight}px`

    ctx.scale(dpr, dpr)

    ctx.fillStyle = darkMode ? 'black' : 'white'
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    ctx.fillStyle = darkMode ? 'white' : 'black'
    ctx.font = `${fontSize}px "${fontFamily}"`
    ctx.textBaseline = 'middle'

    let currentX = (displayWidth - totalWidth) / 2
    content.split('').forEach((char, i) => {
      ctx.fillText(char, currentX, displayHeight / 2)
      currentX += measurements[i].width + letterSpacing
    })

    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `${fontFamily.toLowerCase().replace(/\s+/g, '-')}-logo.png`
    link.href = dataUrl
    link.click()
  }

  const generateSVG = (content: string, fontFamily: string, fontSize: number) => {
    const padding = 40
    const letterSpacing = 0.05 * fontSize

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return

    context.font = `${fontSize}px "${fontFamily}"`
    const charWidths = content.split('').map(char => context.measureText(char).width)

    const totalWidth = charWidths.reduce((width, charWidth, i) => {
      return width + charWidth + (i < content.length - 1 ? letterSpacing : 0)
    }, 0)

    const width = Math.max(totalWidth + padding * 2, 400)
    const height = Math.max(fontSize + padding * 2, 200)

    let currentX = (width - totalWidth) / 2
    const positions = charWidths.map((_, i) => {
      const pos = currentX
      currentX += charWidths[i] + letterSpacing
      return pos
    })

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}');
        </style>
      </defs>
      <rect width="100%" height="100%" fill="${darkMode ? 'black' : 'white'}"/>
      ${content.split('').map((char, i) => `
        <text
          x="${positions[i]}"
          y="${height / 2}"
          font-family="${fontFamily}, sans-serif"
          font-size="${fontSize}"
          fill="${darkMode ? 'white' : 'black'}"
          dominant-baseline="middle"
        >${char}</text>
      `).join('')}
    </svg>`

    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = `${fontFamily.toLowerCase().replace(/\s+/g, '-')}-logo.svg`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTexts = [...texts]
    newTexts[currentFontIndex] = e.target.value
    setTexts(newTexts)
  }

  const handleAddCustomFont = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (customFont) {
      const fontNames = customFont.split(',').map(name => name.trim())
      const newFonts = await Promise.all(fontNames.map(async (fontName) => {
        // Load the custom font
        const link = document.createElement('link')
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}`
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        await document.fonts.load(`16px "${fontName}"`)

        return {
          name: fontName,
          font: { className: '' },
          defaultText: fontName
        }
      }))

      setFonts(prevFonts => [...prevFonts, ...newFonts])
      setTexts(prevTexts => [...prevTexts, ...newFonts.map(font => font.defaultText)])
      setCurrentFontIndex(fonts.length)
      setCustomFont('')
    }
  }

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center justify-center p-8 ${darkMode ? 'bg-[#161616] text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center space-x-2 mb-8">
        <Sun className="h-4 w-4" />
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Moon className="h-4 w-4" />
      </div>

      <div className="w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">{fonts[currentFontIndex].name}</h2>
        <input
          ref={textRef}
          type="text"
          value={texts[currentFontIndex] || ''}
          onChange={handleTextChange}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 w-full bg-transparent focus:outline-none"
          style={{
            wordBreak: 'break-word',
            fontFamily: fonts[currentFontIndex].name,
            letterSpacing: fonts[currentFontIndex].name === 'Press Start 2P' ? '0.1em' : fonts[currentFontIndex].name === 'Comfortaa' ? '0.2em' : 'normal',
          }}
        />
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            onClick={() => generateImage('png')}
            className={`${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-black/80'}`}
          >
            Download PNG <Download className="inline-block ml-2 w-4 h-4" />
          </Button>
          <Button
            onClick={() => generateImage('svg')}
            className={`${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-black/80'}`}
          >
            Download SVG <Download className="inline-block ml-2 w-4 h-4" />
          </Button>
        </div>
        <Pagination
          currentPage={currentFontIndex}
          totalPages={fonts.length}
          onPageChange={setCurrentFontIndex}
        />
      </div>

      <form onSubmit={handleAddCustomFont} className="flex gap-2 mb-4">
        <input
          type="text"
          value={customFont}
          onChange={(e) => setCustomFont(e.target.value)}
          placeholder="Enter google font name(s)"
          className="px-2 py-1 border-b border-current focus:border-b-2 focus:outline-none bg-transparent"
        />
        <Button type="submit">Add Font(s)</Button>
      </form>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="mt-8 text-xs text-gray-500">
        Fonts:
{fonts.map(({ name }, index) => (
          <span key={name}>
            <Link
              href={`https://fonts.google.com/specimen/${name.replace(/\s+/g, '+')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              {name}
            </Link>
            {index < fonts.length - 1 ? ', ' : ''}
          </span>
        ))}
      </div>
    </div>
  )
}

