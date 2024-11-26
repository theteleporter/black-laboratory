import { Feed } from 'feed'
import { NextResponse } from 'next/server'

export async function GET() {
  const feed = new Feed({
    title: "Black Labs by The Teleporter",
    description: "Experiments in design and technology",
    id: "https://lab.theteleporter.me/",
    link: "https://lab.theteleporter.me/",
    language: "en",
    image: "https://lab.theteleporter.me/logo.png",
    favicon: "https://lab.theteleporter.me/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, The Teleporter`,
    author: {
      name: "The Teleporter",
      email: "hello@theteleporter.me",
      link: "https://theteleporter.me"
    }
  });

  feed.addItem({
    title: "Dynamic Avatar",
    id: "https://lab.theteleporter.me/experiments/dynamic-avatar",
    link: "https://lab.theteleporter.me/experiments/dynamic-avatar",
    description: "Generate dynamic avatars based on email input",
    date: new Date(),
    image: "https://lab.theteleporter.me/api/og?experiment=dynamic-avatar"
  });

  feed.addItem({
    title: "Avatar Generator",
    id: "https://lab.theteleporter.me/experiments/avatar-generator",
    link: "https://lab.theteleporter.me/experiments/avatar-generator",
    description: "Generate avatars using email addresses",
    date: new Date(),
    image: "https://lab.theteleporter.me/api/og?experiment=avatar-generator"
  });

  // Add more items for other experiments

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

