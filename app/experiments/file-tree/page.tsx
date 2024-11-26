import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'File Tree | Black Labs',
  description: 'A file tree that expands, collapses and shows different directories and files.',
  openGraph: {
    title: 'File Tree | Black Labs',
    description: 'A file tree that expands, collapses and shows different directories and files.',
    images: [
      {
        url: '/api/og?experiment=file-tree',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  return <Component />
}


