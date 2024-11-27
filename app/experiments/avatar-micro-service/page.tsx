import { Metadata } from 'next'
import Component from './Component'

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
  return <Component />
}