'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from "../../../components/card"
import { Download } from "lucide-react"
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'

export default function Component() {
  const [isGenerating, setIsGenerating] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const commandRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      const text = e.clipboardData?.getData('text/plain')
      document.execCommand('insertText', false, text)
    }

    const commandElement = commandRef.current
    if (commandElement) {
      commandElement.addEventListener('paste', handlePaste)
    }

    return () => {
      if (commandElement) {
        commandElement.removeEventListener('paste', handlePaste)
      }
    }
  }, [])

  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const handleDownload = async () => {
    if (!cardRef.current || !commandRef.current) return

    setIsGenerating(true)

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })

      const command = commandRef.current.textContent || 'next-build'
      const slug = createSlug(command)
      const fileName = `${slug}.png`
      saveAs(dataUrl, fileName)
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="relative">
        <Card 
          ref={cardRef} 
          className="w-[90vw] max-w-[600px] h-auto aspect-[600/314] bg-black border-[#333] border flex items-center justify-center"
        >
          <div className="font-mono text-2xl text-white flex items-center space-x-2">
            <span className="text-[#888888]">▲ ~/</span>
            <span
              ref={commandRef}
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              className="outline-none whitespace-nowrap min-w-[1ch]"
              spellCheck="false"
            >
              npx rage-ui init
            </span>
            <span className="w-3 h-7 bg-[#FF00FF]"></span>
          </div>
        </Card>
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="absolute bottom-[-40px] right-0 flex items-center space-x-2 text-[#999] hover:text-white transition-colors"
          aria-label="Download image"
        >
          <Download className="w-4 h-4" />
          <span className="font-mono text-sm">download image</span>
        </button>
      </div>
    </div>
  )
}
