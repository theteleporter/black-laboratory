"use client"

import * as React from "react"
import InfoIcon from "./info-icon"

interface SectionInfoProps {
  title: string
  tooltip: string
  children: React.ReactNode
  variant?: 'default' | 'error' | 'ghost' | 'success' | 'violet' | 'cyan' | 'warning'
  tooltipSide?: "top" | "right" | "bottom" | "left"
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

export default function SectionInfo({ title, tooltip, children, variant = 'default', tooltipSide = "top" }: SectionInfoProps) {
  const { bg, text, border } = variants[variant]

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: bg, borderWidth: 0 }}>
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-xs font-normal" style={{ color: text }}>{title}</h2>
        <InfoIcon tooltip={tooltip} variant={variant} side={tooltipSide} />
      </div>
      <div className="text-sm font-normal" style={{ color: text }}>
        {children}
      </div>
    </div>
  )
}

