import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'Robot Head | Black Labs',
  description: 'An experimental cool 3D Robot head with glasses forked from Teleball. ',
  openGraph: {
    title: 'Robot Head | Black Labs',
    description: 'An experimental cool 3D Robot head with glasses forked from Teleball .',
    images: [
      {
        url: '/api/og?experiment=robot-head',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  return <Component />
}
