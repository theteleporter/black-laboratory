import type { Metadata } from 'next'
import Component from './Component'

export const metadata: Metadata = {
  title: 'Browser Code Block | Black Labs',
  description: 'A browser code block that is content editable and the image can be downloaded as a png.',
  openGraph: {
    title: 'Browser Code Block | Black Labs',
    description: 'A browser code block that is content editable and the image can be downloaded as a png.',
    images: [
      {
        url: '/api/og?experiment=browser-code-block',
        width: 800,
        height: 400,
      },
    ],
  },
}

export default function Page() {
  return <Component />
}
