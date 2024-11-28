import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'
import { Code } from 'lucide-react'
import './style.css'

export const metadata: Metadata = {
  title: 'File Tree | Black Labs',
  description: 'A file tree that expands, collapses, and shows different directories and files. This component mimics a file explorer interface for navigating nested directories.',
  openGraph: {
    title: 'File Tree | Black Labs',
    description: 'A file tree that expands, collapses, and shows different directories and files. This component mimics a file explorer interface for navigating nested directories.',
    images: [
      {
        url: '/api/og?experiment=file-tree',
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
        href="https://github.com/theteleporter/black-laboratory/tree/main/app/experiments/file-tree"
        className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <Code size={20} />
        <span className="sr-only">Source Code</span>
      </a>
    </>
  )
}
