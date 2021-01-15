import { outputJson } from 'fs-extra'
import { init, map, range, shuffle } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { BRIGHT, FIRST_THEME } from './assets/common'
import { paletteColors } from './assets/palette-colors'
import { generateThemeData } from './generateThemeData'

export const SETTINGS = {}
const SPIN_LABEL_INDEX = false
// const SPIN_LABEL_INDEX = 8

SETTINGS[ 0 ] = {
  name    : FIRST_THEME,
  COLOR_0 : '#00D364',
  COLOR_1 : '#ee3311',
  COLOR_2 : '#e1dce9',
  COLOR_3 : '#A277FF',
  COLOR_4 : '#FF85B8',
}
SETTINGS[ 1 ] = {
  name    : 'aqua.teen.hunger.force',
  COLOR_0 : '#ff63e9',
  COLOR_1 : '#1cb3b8',
  COLOR_2 : '#C5DBF2',
  COLOR_3 : '#FF8B39',
  COLOR_4 : '#BAE67E',
}

SETTINGS[ 2 ] = {
  name    : 'archer',
  COLOR_0 : '#EFEEEA',
  COLOR_1 : '#ff832b',
  COLOR_2 : '#E83B57',
  COLOR_3 : '#a3be8c',
  COLOR_4 : '#00B0FF',
}

SETTINGS[ 3 ] = {
  name    : 'cleveland.show',
  COLOR_0 : '#2196f3',
  COLOR_1 : '#d97397',
  COLOR_2 : '#76b995',
  COLOR_3 : BRIGHT,
  COLOR_4 : '#cf875f',
}

SETTINGS[ 4 ] = {
  name    : 'curb.your.enthusiasm',
  COLOR_0 : '#FBEECA',
  COLOR_1 : '#72f1b8',
  COLOR_2 : '#E07C64',
  COLOR_3 : '#94D0FF',
  COLOR_4 : '#AD82CB',
}

SETTINGS[ 5 ] = {
  name    : 'dilbert',
  COLOR_0 : '#D1675A',
  COLOR_1 : '#1DE9B6',
  COLOR_2 : '#EA9A97',
  COLOR_3 : '#ee5396',
  COLOR_4 : '#FFA000',
}

SETTINGS[ 6 ] = {
  name    : 'south.park',
  COLOR_0 : '#B48EAD',
  COLOR_1 : '#F6C177',
  COLOR_2 : '#DBD9D2',
  COLOR_3 : '#FF7EDB',
  COLOR_4 : '#00C14E',
}

SETTINGS[ 7 ] = {
  name    : 'trip.tank',
  COLOR_0 : '#e17096',
  COLOR_1 : '#dd14ab',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#e2f118',
  COLOR_4 : '#7eb19f',
}

SETTINGS[ 8 ] = {
  name    : 'ugly.americans',
  COLOR_0 : '#fe486c',
  COLOR_1 : '#3E8FB0',
  COLOR_2 : '#fdaeb7',
  COLOR_3 : '#EA80FC',
  COLOR_4 : BRIGHT,
}

const settings = {}

map((x, i) => {
  if (SPIN_LABEL_INDEX !== false && Number(i) === 0){
    const found = SETTINGS[ SPIN_LABEL_INDEX ]
    console.log({ found })
    const randomIndexes = shuffle(range(0, 5))
    let counter = -1

    const randomizedSettings = map((xFound, foundProp) => {
      if (foundProp === 'name') return FIRST_THEME
      counter++
      const actualProp = `${ init(foundProp) }${ randomIndexes[ counter ] }`

      return found[ actualProp ]
    })(found)

    const toSave = map(x => x === BRIGHT ? 'BRIGHT' : x)(randomizedSettings)

    outputJson(
      `${ __dirname }/spinned.json`,
      { [ SETTINGS[ SPIN_LABEL_INDEX ].name ] : toSave },
      { spaces : 2 }
    )

    return settings[ i ] = randomizedSettings
  }

  settings[ i ] = x
}, SETTINGS)

test('happy', () => {
  const allThemes = []

  map(val => {
    const { name, back, ...colors } = val
    if (!colors.COLOR_4){
      throw new Error('All themes require 6 colors')
    }
    const palette = readJsonAnt('src/palette.json')
    const themeData = generateThemeData({
      palette,
      paletteColors,
      themeColors : colors,
    })
    themeData.name = pascalCase(name)

    writeJsonAnt(`themes/${ themeData.name }.json`, themeData)

    allThemes.push({
      label   : themeData.name,
      uiTheme : 'vs-dark',
      path    : `./themes/${ themeData.name }.json`,
    })
  })(settings)

  saveToPackageJsonAnt(allThemes)
})
