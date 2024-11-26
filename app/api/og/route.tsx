What about this sitemap, og route and the layout 

Sitemap

import { MetadataRoute } from 'next'
import { getExperiments } from '../utils/getExperiments'

export default function sitemap(): MetadataRoute.Sitemap {
  const experiments = getExperiments()
  const baseUrl = 'https://lab.theteleporter.me'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...experiments.map(experiment => ({
      url: `${baseUrl}/experiments/${experiment}`,
      lastModified: new Date(),
    }))
  ]
}

Layout 

import type { Metadata } from 'next'
import Link from 'next/link'
import { Code } from 'lucide-react'
import BackButton from '../../components/buttons'

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'Explore some experiments done on the web using some things and other things.',
}

export default function ExperimentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-stone-200 font-mono relative z-10">
      <Link 
        href="/" 
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 z-40"
      >
        <BackButton variant="dark" />
        <span className="sr-only">Back to Lab</span>
      </Link>

      <main className="-z-10">
        {children}
      </main>

      <Link 
        href="https://github.com/theteleporter/lab"
        className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
      >
        <Code size={24} />
        <span className="sr-only">Source Code</span>
      </Link>
    </div>
  )
}

Og

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url$$(.+)$$ format$$'(opentype|truetype)'$$/);
  if (!resource) throw new Error('Failed to load font');
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const experiment = searchParams.get('experiment');

  const title = experiment ? experiment.replace(/-/g, ' ').toUpperCase() : 'BLACK LABS';
  const description = experiment 
    ? `Explore the ${experiment.replace(/-/g, ' ')} experiment`
    : 'Experiments in design and technology';
  const creator = '@theteleporter';

  const fontData = await loadGoogleFont('Geist+Mono', title + description + creator);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#161616',
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 16 }}>{creator}</div>
        <svg
          width="75"
          height="75"
          viewBox="0 0 75 75"
          fill="#fff"
          style={{ margin: '0 75px 3px' }}
        >
          <rect x="0" y="0" width="75" height="75" />
        </svg>
        <div style={{ marginTop: 40, fontSize: 48 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 24, maxWidth: '80%', textAlign: 'center' }}>{description}</div>
      </div>
    ),
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}