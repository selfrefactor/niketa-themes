import { readJsonAnt } from './readJson'
import { writeJsonAnt } from './writeJson'

export function saveToPackageJsonAnt(partialJson){
  const packageJson = readJsonAnt('package.json')
  const newPackageJson = {
    ...packageJson,
    contributes : { themes : partialJson },
  }
  writeJsonAnt('package.json', newPackageJson)
}
