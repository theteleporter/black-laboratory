import Link from 'next/link'
import { Code } from 'lucide-react'
import BackButton from '../../components/buttons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'No bigs just some experiments done on the web using some things and other things also.',
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

      <main className="-z-10">
        {children}
      </main>
    </div>
  )
}