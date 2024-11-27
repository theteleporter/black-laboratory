import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'
import { Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Avatar Micro Service | Black Labs',
  description: 'This microservice dynamically generates unique, avatars for user profiles. It creates consistent designs based on user data (e.g., usernames or emails), by making a request to `/api/avatar?email=user@example.com`',
  openGraph: {
    title: 'Avatar Micro Service | Black Labs',
    description: 'This microservice dynamically generates unique, avatars for user profiles. It creates consistent designs based on user data (e.g., usernames or emails), by making a request to `/api/avatar?email=user@example.com`',
    images: [
      {
        url: '/api/og',
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
href="https://github.com/theteleporter/lab/blob/main/app/experiments/avatar-micro-service"
        className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <Code size={20} />
        <span className="sr-only">Source Code</span>
      </a>
	</>
	)
}
