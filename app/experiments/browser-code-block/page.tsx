'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from "../../../components/card"
import { Download, Circle, ChevronRight, File } from "lucide-react"
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'

export default function Component() {
  const [isGenerating, setIsGenerating] = useState(false)
  const browserRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      const text = e.clipboardData?.getData('text/plain')
      document.execCommand('insertText', false, text)
    }

    const codeElement = codeRef.current
    if (codeElement) {
      codeElement.addEventListener('paste', handlePaste)
    }

    return () => {
      if (codeElement) {
        codeElement.removeEventListener('paste', handlePaste)
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
    if (!browserRef.current || !codeRef.current) return

    setIsGenerating(true)

    try {
      const dataUrl = await toPng(browserRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })

      const code = codeRef.current.textContent || 'code-snippet'
      const slug = createSlug(code.split('\n')[0])
      const fileName = `${slug}.png`
      saveAs(dataUrl, fileName)
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <Card 
        ref={browserRef} 
        className="w-[720px] bg-[#1a1a1a] shadow-xl rounded-lg overflow-hidden border-0"
      >
        {/* Window Header */}
        <div className="bg-[#2a2a2a] p-2 flex items-center gap-2">
          <div className="flex space-x-2 pl-2">
            <Circle className="w-3 h-3 text-red-500 fill-current" />
            <Circle className="w-3 h-3 text-yellow-500 fill-current" />
            <Circle className="w-3 h-3 text-green-500 fill-current" />
          </div>
          <div className="flex items-center gap-2 px-4 text-[#888]">
            <ChevronRight className="w-3 h-3" />
            <File className="w-3 h-3" />
            <span className="text-xs font-mono">example.tsx</span>
          </div>
        </div>

        {/* Code Editor Area */}
        <div className="flex">
          {/* Line Numbers */}
          <div className="p-4 text-right font-mono text-xs text-[#666] select-none bg-[#1a1a1a] border-r border-[#333]">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i + 1} className="leading-6">
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>

          {/* Code Content */}
          <div
            ref={codeRef}
            contentEditable
            suppressContentEditableWarning
            spellCheck="false"
            className="flex-1 p-4 font-mono text-xs outline-none whitespace-pre text-[#e4e4e4] leading-6"
          >
{`export default function Example() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}`}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#2a2a2a] p-2 flex items-center justify-between text-[#888] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span>TypeScript</span>
            <span className="text-[#666]">|</span>
            <span>UTF-8</span>
          </div>
          <span>Ln 15, Col 1</span>
        </div>
      </Card>

      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="mt-4 flex items-center space-x-2 text-[#888] hover:text-white transition-colors"
        aria-label="Download image"
      >
        <Download className="w-4 h-4" />
        <span className="font-mono text-sm">download image</span>
      </button>
    </div>
  )
        }
