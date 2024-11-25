import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'Explore some experiments done on the web using some things and other things.',
}

export default function ExperimentLayout({
  children
}: {
  children: React.ReactNode
}) {
  // This is a placeholder. In a real app, you'd determine this based on the actual experiment.
 // const hasSourceCode = true

  return (
    <div className="min-h-screen text-stone-200 font-mono relative z-10">
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 z-40"
      >
        <ArrowLeft size={24} />
        <span className="sr-only">Back to Lab</span>
      </Link>
      
      <main className="-z-10">
        {children}
      </main>

        <Link 
          href={`https://github.com/theteleporter/lab`} 
          className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
        >
          <Code size={24} />
         {/** <span className="text-sm">Source Code</span>**/}
        </Link>
    </div>
  )
}
