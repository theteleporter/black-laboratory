import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';

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

export const metadata: Metadata = {
  title: "Black Labs by The Teleporter",
  description: "Welcome to my labs. Here you'll find experiments and work I've done. I love designing and drawing things so I just explore ideas that will give me advanced knowledge in certain concepts.",
  openGraph: {
    title: 'Black Labs by The Teleporter',
    description: 'Black Labs is a studio lab that showcases crafts and experiments done by The Teleporter while exploring various fields in the web eco system.',
    url: 'https://lab.theteleporter.me',
    siteName: 'Black Labs by The Teleporter',
    images: [
      {
        url: 'https://lab.theteleporter.me/api/og',
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
            "url": "https://lab.theteleporter.me",
            "description": "Experiments in design and technology",
            "author": {
              "@type": "Person",
              "name": "The Teleporter"
            }
          })}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono font-thin`}
      >
        {children}
      </body>
    </html>
  );
}

