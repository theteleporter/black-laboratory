import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'Word Art | Black Labs',
  description: 'An content editable 2D word art forked from rauchg and a guy in Asia.',
  openGraph: {
    title: 'Word Art | Black Labs',
    description: 'An content editable 2D word art forked from rauchg and a guy in Asia.',
    images: [
      {
        url: '/api/og?experiment=word-art',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  return <Component />
}

