import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'Explore some experiments done on the web using some things and other things.',
}

export default function ExperimentLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { experiment: string }
}) {
  // This is a placeholder. In a real app, you'd determine this based on the actual experiment.
  const hasSourceCode = true

  return (
    <div className="min-h-screen bg-[#161616] text-stone-200 p-4 font-mono relative">
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200"
      >
        <ArrowLeft size={24} />
        <span className="sr-only">Back to Lab</span>
      </Link>
      
      <main className="pt-16 pb-16">
        {children}
      </main>

      {hasSourceCode && (
        <Link 
          href={`/experiments/${params.experiment}/source`} 
          className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2"
        >
          <Code size={24} />
          <span className="text-sm">Source Code</span>
        </Link>
      )}
    </div>
  )
}

