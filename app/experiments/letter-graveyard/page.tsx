import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'
import { Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Letter Graveyard | Black Labs',
  description: 'A textarea that allows text to fall into a letter graveyard when deleted.',
  openGraph: {
    title: 'Letter Graveyard | Black Labs',
    description: 'A textarea that allows text to fall into a letter graveyard when deleted.',
    images: [
      {
        url: '/api/og?experiment=letter-graveyard',
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
        href="https://github.com/theteleporter/black-laboratory/tree/main/app/experiments/letter-graveyard"
        className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <Code size={20} />
        <span className="sr-only">Source Code</span>
      </a>
    </>
  )
}
