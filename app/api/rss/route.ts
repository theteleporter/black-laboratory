import { Feed } from 'feed'
import { NextResponse } from 'next/server'
import { getExperiments } from '../../../utils/getExperiments'

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

  const experiments = getExperiments()

  experiments.forEach(experiment => {
    feed.addItem({
      title: experiment.replace(/-/g, ' ').toUpperCase(),
      id: `https://lab.theteleporter.me/experiments/${experiment}`,
      link: `https://lab.theteleporter.me/experiments/${experiment}`,
      description: `Explore the ${experiment.replace(/-/g, ' ')} experiment`,
      date: new Date(),
      image: `https://lab.theteleporter.me/api/og?experiment=${experiment}`
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

