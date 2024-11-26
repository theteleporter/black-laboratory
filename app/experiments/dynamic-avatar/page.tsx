import type { Metadata } from 'next'
import DynamicAvatar from './DynamicAvatar'

export const metadata: Metadata = {
  title: 'Dynamic Avatar | Black Labs',
  description: 'An experiment that generates a dynamic avatar based on email input.',
  openGraph: {
    title: 'Dynamic Avatar | Black Labs',
    description: 'An experiment that generates a dynamic avatar based on email input.',
    images: [
      {
        url: '/api/og?experiment=dynamic-avatar',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  return <DynamicAvatar />
}

