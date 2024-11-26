import fs from 'fs'
import path from 'path'

export function getExperiments(): string[] {
  const experimentsDir = path.join(process.cwd(), 'app/experiments')
  return fs.readdirSync(experimentsDir).filter(file => 
    fs.statSync(path.join(experimentsDir, file)).isDirectory()
  )
}

