import fs from 'fs'
import path from 'path'

type Experiment = {
  name: string;
  sourceLink?: string;
}

export function getExperiments(): Experiment[] {
  const experimentsDir = path.join(process.cwd(), 'app/experiments')
  const experiments = fs.readdirSync(experimentsDir).filter(file => 
    fs.statSync(path.join(experimentsDir, file)).isDirectory()
  )

  return experiments.map(experiment => {
    const experimentPath = path.join(experimentsDir, experiment)
    const configPath = path.join(experimentPath, 'config.json')
    
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      return {
        name: experiment,
        sourceLink: config.sourceLink
      }
    }

    return { name: experiment }
  })
}

