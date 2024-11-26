import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'Command Card | Black Labs',
  description: 'A beautiful content editable command card that is downloadable in png format.',
  openGraph: {
    title: 'Command Card | Black Labs',
    description: 'A beautiful content editable command card that is downloadable in png format.',
    images: [
      {
        url: '/api/og?experiment=command-card',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  return <Component />
}


