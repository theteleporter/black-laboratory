'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Comfortaa, Geist, Dela_Gothic_One, Courier_Prime } from 'next/font/google'
import { Download, Moon, Sun, ChevronLeft, ChevronRight, AlignLeft, AlignCenter, AlignRight, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import type { NextFont } from 'next/dist/compiled/@next/font'
import Note from '../../../components/note'
import { getFontWeights } from '../../../utils/fontUtils'

interface FontConfig {
  name: string;
  font: NextFont | { className: string; style: { fontFamily: string } };
  defaultText: string;
  weights: string[];
}

interface FontSettings {
  size: number;
  spacing: number;
  weight: string;
  alignment: 'left' | 'center' | 'right';
}

const comfortaa = Comfortaa({ subsets: ['latin'], display: 'swap' })
const geist = Geist({ weight: '700', subsets: ['latin'], display: 'swap' })
const delaGothicOne = Dela_Gothic_One({ weight: '400', subsets: ['latin'], display: 'swap' })
const courierPrime = Courier_Prime({ weight: '400', subsets: ['latin'], display: 'swap' })

// Default font settings
const defaultSettings: FontSettings = {
  size: 44,
  spacing: 0,
  weight: '400', // Updated default weight
  alignment: 'center'
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button
    className={`px-2 py-1 rounded-md font-normal transition-colors ${className}`}
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

const Slider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  darkMode: boolean;
}> = ({ value, onChange, min, max, step = 1, label, darkMode }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <label className="text-xs font-medium">{label}</label>
      <span className="text-xs font-medium">{value}</span>
    </div>
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className={`w-full h-1 bg-[#454545] rounded-lg appearance-none cursor-pointer 
        [&::-webkit-slider-thumb]:appearance-none 
        [&::-webkit-slider-thumb]:w-3 
        [&::-webkit-slider-thumb]:h-3 
        [&::-webkit-slider-thumb]:rounded-full 
        [&::-webkit-slider-thumb]:${darkMode ? 'bg-white' : 'bg-black'}`}
    />
  </div>
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

export default function Component() {
  const [darkMode, setDarkMode] = useState(true)
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [texts, setTexts] = useState<string[]>([])
  const [customFont, setCustomFont] = useState('')
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    ...defaultSettings,
    weight: '400', // Updated default weight
  })
  const [fonts, setFonts] = useState<FontConfig[]>([])
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchFontWeights = async () => {
      setIsLoading(true);
      const predefinedFonts: FontConfig[] = [
        { name: 'Comfortaa', font: comfortaa, defaultText: 'black labs', weights: [] },
        { name: 'Geist', font: geist, defaultText: 'Black Labs', weights: [] },
        { name: 'Dela Gothic One', font: delaGothicOne, defaultText: 'BLACK LABS', weights: [] },
        { name: 'Courier Prime', font: courierPrime, defaultText: 'Black Labs', weights: [] },
      ];

      const fontsWithWeights = await Promise.all(
        predefinedFonts.map(async (font) => {
          const weights = await getFontWeights(font.name);
          return { ...font, weights };
        })
      );

      setFonts(fontsWithWeights);
      setTexts(fontsWithWeights.map(font => font.defaultText));
      setFontSettings(prev => ({ ...prev, weight: fontsWithWeights[0].weights[0] || '400' }));
      setIsLoading(false);
    };

    fetchFontWeights();
  }, []);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus()
    }
  }, [currentFontIndex])

  const resetSettings = () => {
    setFontSettings(defaultSettings)
  }

  const generateImage = async (format: 'png' | 'svg') => {
    const content = texts[currentFontIndex] || fonts[currentFontIndex].defaultText
    const fontFamily = fonts[currentFontIndex].name
    const fontSize = fontSettings.size

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

    // Load the font with the correct weight
    await document.fonts.load(`${fontSettings.weight} ${fontSize}px "${fontFamily}"`)

    const dpr = window.devicePixelRatio || 1
    const padding = 40
    const letterSpacing = fontSettings.spacing

    ctx.font = `${fontSettings.weight} ${fontSize}px "${fontFamily}"`
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
    ctx.font = `${fontSettings.weight} ${fontSize}px "${fontFamily}"`
    ctx.textAlign = fontSettings.alignment
    ctx.textBaseline = 'middle'

    let currentX
    if (fontSettings.alignment === 'center') {
      currentX = displayWidth / 2
    } else if (fontSettings.alignment === 'right') {
      currentX = displayWidth - padding
    } else {
      currentX = padding
    }

    ctx.fillText(content, currentX, displayHeight / 2)

    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = `${fontFamily.toLowerCase().replace(/\s+/g, '-')}-logo.png`
    link.href = dataUrl
    link.click()
  }

  const generateSVG = (content: string, fontFamily: string, fontSize: number) => {
    const padding = 40
    const letterSpacing = fontSettings.spacing

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return

    context.font = `${fontSettings.weight} ${fontSize}px "${fontFamily}"`
    const metrics = context.measureText(content)
    const textWidth = metrics.width + (content.length - 1) * letterSpacing

    const width = Math.max(textWidth + padding * 2, 400)
    const height = Math.max(fontSize + padding * 2, 200)

    let textX
    if (fontSettings.alignment === 'center') {
      textX = width / 2
    } else if (fontSettings.alignment === 'right') {
      textX = width - padding
    } else {
      textX = padding
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@${fontSettings.weight}');
        </style>
      </defs>
      <rect width="100%" height="100%" fill="${darkMode ? 'black' : 'white'}"/>
      <text
        x="${textX}"
        y="${height / 2}"
        font-family="${fontFamily}, sans-serif"
        font-size="${fontSize}"
        font-weight="${fontSettings.weight}"
        fill="${darkMode ? 'white' : 'black'}"
        text-anchor="${fontSettings.alignment}"
        dominant-baseline="middle"
        letter-spacing="${letterSpacing}"
      >${content}</text>
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
    e.preventDefault();
    if (customFont) {
      const fontNames = customFont.split(',').map(name => name.trim());
      const newFonts = await Promise.all(fontNames.map(async (fontName) => {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@100;200;300;400;500;600;700;800;900&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        await document.fonts.load(`16px "${fontName}"`);

        const weights = await getFontWeights(fontName);

        return {
          name: fontName,
          font: {
            className: '',
            style: {
              fontFamily: fontName
            }
          },
          defaultText: fontName,
          weights
        };
      }));

      setFonts(prevFonts => [...prevFonts, ...newFonts]);
      setTexts(prevTexts => [...prevTexts, ...newFonts.map(font => font.defaultText)]);
      setCurrentFontIndex(fonts.length);
      setCustomFont('');
    }
  };

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center justify-center p-8 ${darkMode ? 'bg-[#161616] text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center space-x-2 mb-8">
        <Sun className="h-4 w-4" />
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Moon className="h-4 w-4" />
      </div>

      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">{fonts[currentFontIndex]?.name || 'Loading...'}</h2>
          <Button onClick={resetSettings} className="p-1" title="Reset settings">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Font Controls */}
        {fonts.length > 0 && (
          <div className="mb-6 space-y-3">
            <div className="flex justify-between items-center gap-4">
              {/* Weight Selector */}
              <select
                value={fontSettings.weight}
                onChange={(e) => setFontSettings(prev => ({ ...prev, weight: e.target.value }))}
                className={`${
                  darkMode 
                    ? 'bg-white text-black' 
                    : 'bg-black text-white'
                } border-stone-200 dark:border-stone-800 rounded-md px-3 py-2 text-sm w-48`}
              >
                {fonts[currentFontIndex]?.weights.map(weight => (
                  <option key={weight} value={weight}>
                    {weight === '400' ? 'Regular' : weight === '700' ? 'Bold' : `Weight ${weight}`}
                  </option>
                ))}
              </select>

              {/* Alignment Controls */}
              <div className="flex justify-start gap-1">
                {(['left', 'center', 'right'] as const).map(align => (
                  <Button
                    key={align}
                    onClick={() => setFontSettings(prev => ({ ...prev, alignment: align }))}
                    className={`p-1.5 rounded-lg ${
                      fontSettings.alignment === align 
                        ? 'bg-black dark:bg-white text-white dark:text-black' 
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                    {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                    {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size and Spacing Sliders */}
            <div className="flex gap-4">
              <Slider
                label="Size"
                value={fontSettings.size}
                onChange={(value) => setFontSettings(prev => ({ ...prev, size: value }))}
                min={12}
                max={120}
                darkMode={darkMode}
              />
              <Slider
                label="Spacing"
                value={fontSettings.spacing}
                onChange={(value) => setFontSettings(prev => ({ ...prev, spacing: value }))}
                min={-10}
                max={50}
                step={1}
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        {fonts.length > 0 && (
          <input
            ref={textRef}
            type="text"
            value={texts[currentFontIndex] || ''}
            onChange={handleTextChange}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center mb-8 w-full bg-transparent focus:outline-none"
            style={{
              wordBreak: 'break-word',
              fontFamily: fonts[currentFontIndex]?.font.style.fontFamily,
              fontSize: `${fontSettings.size}px`,
              letterSpacing: `${fontSettings.spacing}px`,
              fontWeight: fontSettings.weight,
              textAlign: fontSettings.alignment,
            }}
          />
        )}

        <div className="flex flex-row justify-center items-center gap-4 mb-8">
          <Button
            onClick={() => generateImage('png')}
            className={`flex items-center ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-black/80'}`}
          >
            Download PNG <Download className="inline-block ml-2 w-4 h-4" />
          </Button>
          <Button
            onClick={() => generateImage('svg')}
            className={`flex items-center ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-black/80'}`}
          >
            Download SVG <Download className="inline-block ml-2 w-4 h-4" />
          </Button>
        </div>

        {fonts.length > 0 && (
          <Pagination
            currentPage={currentFontIndex}
            totalPages={fonts.length}
            onPageChange={setCurrentFontIndex}
          />
        )}
      </div>

      <form onSubmit={handleAddCustomFont} className="flex flex-col gap-2 mb-4 w-full max-w-xl">
        <div className="flex items-center w-full">
          <input
            type="text"
            value={customFont}
            onChange={(e) => setCustomFont(e.target.value)}
            placeholder="Enter google font name"
            className="px-2 py-1 border-b border-current focus:border-b-2 focus:outline-none bg-transparent placeholder:text-[#767676] w-2/3"
          />
          <Button type="submit" className="w-1/3">Add Font(s)</Button>
        </div>
        <Note variant={`${darkMode ? 'warning' : 'warning'}`}>
          For multi-name fonts, separate names with commas (e.g., "Roboto Slab, Roboto")
        </Note>
      </form>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {isLoading && (
        <div className="text-center">
          <p>Loading fonts...</p>
        </div>
      )}

      {fonts.length > 0 && (
        <div className="mt-8 text-xs text-gray-500 w-full max-w-xl">
          Fonts:
          {fonts.map(({ name }, index) => (
            <span key={name}>
              <Link
                href={`https://fonts.googleapis.com/specimen/${name.replace(/\s+/g, '+')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1A1] hover:text-[#EFEFEF] transition-colors"
              >
                {name}
              </Link>
              {index < fonts.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

