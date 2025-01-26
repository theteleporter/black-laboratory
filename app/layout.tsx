import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Dela_Gothic_One, Rubik_Glitch, Pixelify_Sans, Faster_One, Rubik_Maze, Honk, Bungee_Spice, Lacquer, Kranky, Major_Mono_Display } from 'next/font/google';
import "./globals.css";
import Script from 'next/script';
import CMDK from '../components/cmdk';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const delaGothicOne = Dela_Gothic_One({ weight: '400', subsets: ['latin'], variable: '--font-dela-gothic-one' });
const rubikGlitch = Rubik_Glitch({ weight: '400', subsets: ['latin'], variable: '--font-rubik-glitch' });
const pixelifySans = Pixelify_Sans({ weight: '400', subsets: ['latin'], variable: '--font-pixelify-sans' });
const fasterOne = Faster_One({ weight: '400', subsets: ['latin'], variable: '--font-faster-one' });
const rubikMaze = Rubik_Maze({ weight: '400', subsets: ['latin'], variable: '--font-rubik-maze' });
const honk = Honk({ weight: '400', subsets: ['latin'], variable: '--font-honk' });
const bungeeSpice = Bungee_Spice({ weight: '400', subsets: ['latin'], variable: '--font-bungee-spice' });
const lacquer = Lacquer({ weight: '400', subsets: ['latin'], variable: '--font-lacquer' });
const kranky = Kranky({ weight: '400', subsets: ['latin'], variable: '--font-kranky' });
const majorMonoDisplay = Major_Mono_Display({ weight: '400', subsets: ['latin'], variable: '--font-major-mono-display' });

export const metadata: Metadata = {
  title: "Black Labs by The Teleporter",
  description: "Black Laboratory is reimagining the boundaries of web development by merging bold design aesthetics with cutting-edge technology. We're turning the web into a canvas for innovation.",
  openGraph: {
    title: 'Black Labs by The Teleporter',
    description: "Black Laboratory is reimagining the boundaries of web development by merging bold design aesthetics with cutting-edge technology. We're turning the web into a canvas for innovation.",
    url: 'https://blacklabs.vercel.app',
    siteName: 'Black Labs by The Teleporter',
    images: [
      {
        url: 'https://blacklabs.vercel.app/api/og',
        width: 800,
        height: 400,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="json-ld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Black Labs by The Teleporter",
            "url": "https://blacklabs.vercel.app",
            "description": "Turning the web into a canvas.",
            "author": {
              "@type": "Person",
              "name": "The Teleporter"
            }
          })}
        </Script>
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${inter.variable}
          ${delaGothicOne.variable}
          ${rubikGlitch.variable}
          ${pixelifySans.variable}
          ${fasterOne.variable}
          ${rubikMaze.variable}
          ${honk.variable}
          ${bungeeSpice.variable}
          ${lacquer.variable}
          ${kranky.variable}
          ${majorMonoDisplay.variable}
           antialiased font-mono font-thin selection:bg-[#FFFFFF] selection:text-[#000000]
           `}
      >
      <CMDK />
        {children}
      </body>
    </html>
  );
}

