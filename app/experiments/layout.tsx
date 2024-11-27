import Link from 'next/link'
import { Code } from 'lucide-react'
import BackButton from '../../components/buttons'
import InfoIcon from '../../components/info-icon'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'Explore some experiments done on the web using some things and other things.',
}

export default function ExperimentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const description = metadata.description ?? "No description available."

  return (
    <div className="min-h-screen text-stone-200 font-mono relative z-10">
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 z-40"
      >
        <BackButton variant="dark" />
        <span className="sr-only">Back to Lab</span>
      </Link>

      <div className="absolute top-4 right-4 z-40">
        <InfoIcon 
          tooltip={description} 
          variant="default" 
          side="bottom" 
        />
      </div>

      <main className="-z-10">
        {children}
      </main>
    </div>
  )
}