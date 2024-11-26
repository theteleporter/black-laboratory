import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'Logo Experiments | Black Labs',
  description: 'An experiment showcasing logos and a content editable field that can be used to generate logos on the fly. Also custom fonts are also supported. ',
  openGraph: {
    title: 'Logo Experiments | Black Labs',
    description: 'An experiment showcasing logos and a content editable field that can be used to generate logos on the fly. Also custom fonts are also supported .',
    images: [
      {
        url: '/api/og?experiment=logo-experiments',
        width: 800,
        height: 400,
      },
    ],
  },
}
