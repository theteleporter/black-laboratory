import React from 'react'
import { cn } from "../utils/funcs"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline'
}

export const Kbd: React.FC<KbdProps> = ({
  children,
  className,
  size = 'md',
  variant = 'default',
  ...props
}) => {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-sm font-mono font-medium",
        "transition-all duration-200",
        "shadow-[inset_0_-2px_0_0_rgba(0,0,0,0.2)]",
        {
          'text-xs px-1.5 py-0.5': size === 'sm',
          'text-sm px-2 py-1': size === 'md',
          'text-base px-2.5 py-1.5': size === 'lg',
        },
        {
          'bg-[#2a2a2a] text-[#e0e0e0] border border-[#3a3a3a]': variant === 'default',
          'bg-transparent text-[#e0e0e0] border border-[#3a3a3a]': variant === 'outline',
        },
        "hover:bg-[#3a3a3a] active:bg-[#4a4a4a]",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a4a4a] focus:ring-offset-[#161616]",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

