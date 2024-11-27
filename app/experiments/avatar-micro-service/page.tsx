import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'

export const metadata: Metadata = {
  title: 'Avatar Micro Service | Black Labs',
  description: 'The avatar microservice dynamically generates unique, avatars for user profiles. It can create consistent designs based on user data (e.g., usernames or emails). A request is made to https://lab.theteleporter.me/api/avatar?email=user@example.com&format=png',
  openGraph: {
    title: 'Avatar Micro Service | Black Labs',
    description: 'The avatar microservice dynamically generates unique, avatars for user profiles. It can create consistent designs based on user data (e.g., usernames or emails). A request is made to https://lab.theteleporter.me/api/avatar?email=user@example.com&format=png.',
    images: [
      {
        url: '/api/og?experiment=avatar-micro-service',
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
	</>
	)
}
