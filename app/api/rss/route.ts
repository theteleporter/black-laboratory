import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import { NextResponse } from 'next/server';
import { getExperiments } from '../../../utils/getExperiments';

export async function GET() {
  const feed = new Feed({
    title: "Black Labs by The Teleporter",
    description: "Experiments in design engineering that work.",
    id: "https://blacklabs.vercel.app/",
    link: "https://blacklabs.vercel.app/",
    language: "en",
    image: "https://blacklabs.vercel.app/theteleporter_logo.png",
    favicon: "https://blacklabs.vercel.app/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, The Teleporter`,
    author: {
      name: "The Teleporter",
      email: "theteleporter@duck.com",
      link: "https://theteleporter.vercel.app"
    }
  });

  // Fetch experiments
  const experiments = getExperiments();

  // Add experiments to the RSS feed
  experiments.forEach(experiment => {
    const title = experiment.name.replace(/-/g, ' ').toUpperCase();
    const link = `https://blacklabs.vercel.app/experiments/${experiment.name}`;
    const description = `Explore the ${experiment.name.replace(/-/g, ' ')} experiment`;

    feed.addItem({
      title,
      id: link,
      link,
      description,
      date: new Date(),
      image: `https://blacklabs.vercel.app/api/og?experiment=${experiment.name}`,
      ...(experiment.sourceLink ? { source: experiment.sourceLink } : {}) // Add `sourceLink` if it exists
    });
  });

  // Return the RSS feed as a response
  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}