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

