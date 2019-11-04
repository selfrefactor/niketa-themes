import { readdirSync } from 'fs'
import { copySync } from 'fs-extra'
import { resolve } from 'path'
import { dotCase, snakeCase } from 'string-fn'
import { sort, pluck } from 'rambdax'
import {contributes} from '../../package.json'

export function populateScreens(){
  const themeNames = contributes.themes.map(({label}) => dotCase(label))
  console.log(themeNames)
  const sortFn = (a, b) => a > b ? 1 : -1
  const base = resolve(__dirname, '../../screens')
  const screens = readdirSync(`${ base }/raw_screens`)
  const sortedScreens = sort(sortFn, screens)
  // const screensSources = sortedScreens.map(x => `${ base }/raw_screens/${ x }`)

  // const themesNames = sort(sortFn, pluck('label', themes))
  // const screenDestinations = themesNames.map(
  //   x => `${ base }/${ dotCase(x) }.png`
  // )
  // const lernaDestinations = themesNames.map(
  //   x => `${ lernaBase }/${ snakeCase(x) }/theme/${ dotCase(x) }.png`
  // )
  // screensSources.forEach((screenPath, i) => {
  //   console.log(i, screenPath)

  //   copySync(screenPath, screenDestinations[ i ])
  //   copySync(screenPath, lernaDestinations[ i ])
  // })
}
