import { Metadata } from 'next';
import Link from 'next/link';
import { Code } from 'lucide-react';
import BackButton from '../../components/buttons';

type ExperimentLayoutProps = {
  children: React.ReactNode;
  params: { experiment: string };
};

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'Explore some experiments done on the web using some things and other things.',
};

async function getExperimentMetadata(experimentName: string) {
  try {
    const configPath = `./app/experiments/${experimentName}/config.json`;
    const response = await fetch(configPath);
    const config = await response.json();
    return { sourceLink: config.sourceLink || null };
  } catch (err) {
    console.error(err);
    return { sourceLink: null };
  }
}

export default async function ExperimentLayout({
  children,
  params,
}: ExperimentLayoutProps) {
  const experimentData = await getExperimentMetadata(params.experiment);

  return (
    <div className="min-h-screen text-stone-200 font-mono relative z-10">
      <Link
        href="/"
        className="absolute top-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 z-40"
      >
        <BackButton variant="dark" />
        <span className="sr-only">Back to Lab</span>
      </Link>

      <main className="-z-10">{children}</main>

      {experimentData.sourceLink && (
        <Link
          href={experimentData.sourceLink}
          className="absolute bottom-4 left-4 text-stone-400 hover:text-stone-200 transition-colors duration-200 flex items-center gap-2 z-40"
        >
          <Code size={24} />
          <span className="sr-only">Source Code</span>
        </Link>
      )}
    </div>
  );
}