import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'Letter Graveyard | Black Labs',
  description: 'A textarea containing text that when deleted falls down on a letter graveyard .',
  openGraph: {
    title: 'Letter Graveyard | Black Labs',
    description: 'A textarea containing text that when deleted falls down on a letter graveyard .',
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
  return <Component />
}
