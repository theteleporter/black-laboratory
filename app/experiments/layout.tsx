import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import { Code } from 'lucide-react';
import BackButton from '../../components/buttons';

export async function generateStaticParams() {
  const experimentsDir = path.join(process.cwd(), 'app/experiments');
  const folders = fs.readdirSync(experimentsDir).filter((file) => {
    return fs.statSync(path.join(experimentsDir, file)).isDirectory();
  });

  return folders.map((folder) => ({
    experiment: folder,
  }));
}

async function getExperimentMetadata(experimentName: string) {
  const configPath = path.join(process.cwd(), `app/experiments/${experimentName}/config.json`);
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return {
      sourceLink: config.sourceLink || null,
    };
  }
  return { sourceLink: null };
}

export const metadata: Metadata = {
  title: 'Black Labs | Experiment',
  description: 'Explore some experiments done on the web using some things and other things.',
};

export default async function ExperimentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { experiment: string };
}) {
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