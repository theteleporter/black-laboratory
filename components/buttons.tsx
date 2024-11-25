import { ChevronLeft } from 'lucide-react'

interface BackButtonProps {
  variant: 'light' | 'dark'
  className?: string
  onClick?: () => void
}

export default function BackButton({ variant, className, onClick }: BackButtonProps) {
  if (variant === 'light') {
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-2 bg-[#E6E6E6] rounded-full py-0 pr-2 ${className}`}
      >
        <div className="bg-[#9E9E9E] rounded-full p-0">
          <ChevronLeft className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
        <span className="text-[#4D4D4D] font-semibold text-sm font-mono">Back</span>
      </button>
    )
  }

  if (variant === 'dark') {
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-2 bg-[#161616] rounded-full py-0 pr-2 ${className}`}
        style={{
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.5)'
        }}
      >
        <div className="bg-[#232323] rounded-full p-0">
          <ChevronLeft className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
        <span className="text-[#6E6E6E] font-semibold text-sm font-mono">Back</span>
      </button>
    )
  }

  return null
}

