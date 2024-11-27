import Balancer from "react-wrap-balancer"

interface NoteProps {
  children: React.ReactNode
  variant?: 'default' | 'error' | 'ghost' | 'success' | 'violet' | 'cyan' | 'warning'
}

const variants = {
  default: {
    bg: '#0A0A0A',
    text: '#A1A1A1',
    border: '#2E2E2E'
  },
  error: {
    bg: '#3C1618',
    text: '#FF6166',
    border: '#671E21'
  },
  ghost: {
    bg: '#202020',
    text: '#888888',
    border: '#2E2E2E'
  },
  success: {
    bg: '#10233D',
    text: '#3C7BBE',
    border: '#0D3868'
  },
  violet: {
    bg: '#2E1938',
    text: '#BF7AF0',
    border: '#4F2768'
  },
  cyan: {
    bg: '#062822',
    text: '#0AB7A5',
    border: '#053D35'
  },
  warning: {
    bg: '#341C00',
    text: '#F1A10D',
    border: '#352108'
  }
}

const InfoIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 mt-0.95 md:mt-0.5 shrink-0 rotate-180"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

export default function Note({ children, variant = 'warning' }: NoteProps) {
  const { bg, text, border } = variants[variant]

  return (
    <div 
      className="w-full rounded-lg p-2" 
      style={{ backgroundColor: bg, borderColor: border, borderWidth: '1px', borderStyle: 'solid', color: text }}
    >
      <div className="flex gap-2 items-start">
        <InfoIcon color={text} />
        <Balancer ratio={0.00} preferNative={false} className="text-[13px]" style={{ color: text }}>{children}</Balancer>
      </div>
    </div>
  )
}

