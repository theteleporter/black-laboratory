import { Metadata } from 'next'
import Component from './Component'
import InfoIcon from '../../../components/info-icon'

export const metadata: Metadata = {
  title: 'Avatar Micro Service | Black Labs',
  description: 'A micro service experiment that generates a dynamic avatar based on email input and enables the user to download the avatar.',
  openGraph: {
    title: 'Avatar Micro Service | Black Labs',
    description: 'A micro service experiment that generates a dynamic avatar based on email input and enables the user to download the avatar.',
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
  return (
        <>
        <div className="absolute top-4 right-4 z-40">
        <InfoIcon 
          tooltip={metadata.description} 
          variant="default" 
          side="bottom" 
        />
      </div>
        <Component />
	</>
	)
}
