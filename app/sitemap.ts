import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const experimentsDir = path.join(process.cwd(), 'app/experiments');
  const folders = fs.readdirSync(experimentsDir).filter((file) => {
    return fs.statSync(path.join(experimentsDir, file)).isDirectory();
  });

  const baseUrl = 'https://blacklabs.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...folders.map((folder) => ({
      url: `${baseUrl}/experiments/${folder}`,
      lastModified: new Date(),
    })),
  ];
}