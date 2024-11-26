import { Feed } from 'feed';
import { NextResponse } from 'next/server';
import { getExperiments } from '../../../utils/getExperiments';

export async function GET() {
  const feed = new Feed({
    title: "Black Labs by The Teleporter",
    description: "Experiments in design engineering that work.",
    id: "https://lab.theteleporter.me/",
    link: "https://lab.theteleporter.me/",
    language: "en",
    image: "https://lab.theteleporter.me/theteleporter_logo.png",
    favicon: "https://lab.theteleporter.me/favicon.ico",
    copyright: `All rights reserved ${new Date().getFullYear()}, The Teleporter`,
    author: {
      name: "The Teleporter",
      email: "theteleporter@duck.com",
      link: "https://theteleporter.me"
    }
  });

  // Fetch experiments
  const experiments = getExperiments();

  // Normalize experiments to string slugs
  const experimentSlugs = experiments.map(experiment => 
    typeof experiment === 'object' && 'slug' in experiment
      ? experiment.slug
      : String(experiment) // Fallback for unexpected types
  );

  // Add experiments to the RSS feed
  experimentSlugs.forEach(slug => {
    feed.addItem({
      title: slug.replace(/-/g, ' ').toUpperCase(),
      id: `https://lab.theteleporter.me/experiments/${slug}`,
      link: `https://lab.theteleporter.me/experiments/${slug}`,
      description: `Explore the ${slug.replace(/-/g, ' ')} experiment`,
      date: new Date(),
      image: `https://lab.theteleporter.me/api/og?experiment=${slug}`
    });
  });

  // Return the RSS feed as a response
  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}