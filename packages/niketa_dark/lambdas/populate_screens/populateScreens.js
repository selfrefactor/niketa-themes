import { readdirSync } from 'fs'
import { copySync } from 'fs-extra'
import { resolve } from 'path'
import { dotCase, snakeCase } from 'string-fn'
import { sort, pluck } from 'rambdax'
import {contributes} from '../../package.json'

export function populateScreens(){
  const themesNamesRaw = contributes.themes.map(({label}) => dotCase(label))
  const sortFn = (a, b) => a > b ? 1 : -1
  const base = resolve(__dirname, '../../screens')
  const screens = readdirSync(`${ base }/raw_screens`)
  const sortedScreens = sort(sortFn, screens)
  const screensSources = sortedScreens.map(x => `${ base }/raw_screens/${ x }`)

  const themesNames = sort(sortFn, themesNamesRaw)
  const screenDestinations = themesNames.map(
    x => `${ base }/${ x }.png`
  )

  screensSources.forEach((screenPath, i) => {
    copySync(screenPath, screenDestinations[ i ])
  })
}
