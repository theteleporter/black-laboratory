"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

interface InfoIconProps {
  tooltip: string
  variant?: 'default' | 'error' | 'ghost' | 'success' | 'violet' | 'cyan' | 'warning'
  side?: "top" | "right" | "bottom" | "left"
}

const variants = {
  default: { bg: '#0A0A0A', text: '#A1A1A1', border: '#2E2E2E' },
  error: { bg: '#3C1618', text: '#FF6166', border: '#671E21' },
  ghost: { bg: '#202020', text: '#888888', border: '#2E2E2E' },
  success: { bg: '#10233D', text: '#3C7BBE', border: '#0D3868' },
  violet: { bg: '#2E1938', text: '#BF7AF0', border: '#4F2768' },
  cyan: { bg: '#062822', text: '#0AB7A5', border: '#053D35' },
  warning: { bg: '#341C00', text: '#F1A10D', border: '#352108' }
}

const InfoIcon = ({ tooltip, variant = 'default', side = "top" }: InfoIconProps) => {
  const { text, bg, border } = variants[variant]

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild>
          <button className={`rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-${text}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={text}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={`max-w-xs rounded-lg px-3 py-2 text-xs shadow-lg`}
            style={{ backgroundColor: bg, color: text, borderColor: border, borderWidth: 1 }}
            sideOffset={5}
            side={side}
          >
            {tooltip}
            <TooltipPrimitive.Arrow style={{ fill: bg }} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default InfoIcon

