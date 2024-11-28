import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'
import { Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Word Art | Black Labs',
  description: 'A content editable 2D word art, forked from rauchg and a guy in Asia, that allows interactive text manipulation.',
  openGraph: {
    title: 'Word Art | Black Labs',
    description: 'A content editable 2D word art, forked from rauchg and a guy in Asia, that allows interactive text manipulation.',
    images: [
      {
        url: '/api/og?experiment=word-art',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  const description = metadata.description ?? "No description available."

  return (
    <>
      <div className="absolute top-4 right-4 z-40">
        <InfoIcon 
          tooltip={description} 
          variant="default" 
          side="bottom" 
        />
      </div>
      <Component />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/theteleporter/black-laboratory/tree/main/app/experiments/word-art"
        className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <Code size={20} />
        <span className="sr-only">Source Code</span>
      </a>
    </>
  )
}
