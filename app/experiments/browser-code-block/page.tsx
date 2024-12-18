import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'
import { Code } from 'lucide-react'
import './style.css'

export const metadata: Metadata = {
  title: 'Browser Code Block | Black Labs',
  description: 'A browser code block that is content editable, and the image can be downloaded as a PNG. This component allows you to edit code within a styled browser-like block and save the content as an image.',
  openGraph: {
    title: 'Browser Code Block | Black Labs',
    description: 'A browser code block that is content editable, and the image can be downloaded as a PNG. This component allows you to edit code within a styled browser-like block and save the content as an image.',
    images: [
      {
        url: '/api/og?experiment=browser-code-block',
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
        href="https://github.com/theteleporter/black-laboratory/tree/main/app/experiments/browser-code-block"
        className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <Code size={20} />
        <span className="sr-only">Source Code</span>
      </a>
    </>
  )
}
