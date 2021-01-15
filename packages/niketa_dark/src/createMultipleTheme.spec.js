import { outputJson } from 'fs-extra'
import { init, map, range, shuffle } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeData } from './generateThemeData'
import { paletteColors } from './assets/palette-colors'
import { BRIGHT, FIRST_THEME } from './assets/common'

export const SETTINGS = {}
const SPIN_LABEL_INDEX = false
// const SPIN_LABEL_INDEX = 8

SETTINGS[ 0 ] = {
  name    : FIRST_THEME,
  COLOR_0 : '#C5DBF2',
  COLOR_1 : '#A277FF',
  COLOR_2 : '#00D364',
  COLOR_3 : '#A1887F',
  COLOR_4 : '#FF85B8',
}
SETTINGS[ 1 ] = {
  name    : 'aqua.teen.hunger.force',
  COLOR_0 : '#DBD9D2',
  COLOR_1 : '#FF8B39',
  COLOR_2 : '#1cb3b8',
  COLOR_3 : '#BAE67E',
  COLOR_4 : '#d97397',
}

SETTINGS[ 2 ] = {
  name    : 'archer',
  COLOR_0 : '#EFEEEA',
  COLOR_1 : '#A277FF',
  COLOR_2 : '#E83B57',
  COLOR_3 : '#a3be8c',
  COLOR_4 : '#00B0FF',
}

SETTINGS[ 3 ] = {
  name    : 'cleveland.show',
  COLOR_0 : '#2196f3',
  COLOR_1 : '#FBCFBD',
  COLOR_2 : '#ff7edb',
  COLOR_3 : '#72f1b8',
  COLOR_4 : '#D1675A',
}

SETTINGS[ 4 ] = {
  name    : 'curb.your.enthusiasm',
  COLOR_0 : '#94D0FF',
  COLOR_1 : '#E07C64',
  COLOR_2 : '#FBEECA',
  COLOR_3 : '#cfe071',
  COLOR_4 : '#AD82CB',
}

SETTINGS[ 5 ] = {
  name    : 'dilbert',
  COLOR_0 : '#EA9A97',
  COLOR_1 : '#EA80FC',
  COLOR_2 : '#1DE9B6',
  COLOR_3 : '#FFA000',
  COLOR_4 : '#B2FF59',
}

SETTINGS[ 6 ] = {
  name    : 'south.park',
  COLOR_0 : '#F6C177',
  COLOR_1 : '#00C14E',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#FF7EDB',
  COLOR_4 : '#B48EAD',
}

SETTINGS[ 7 ] = {
  name    : 'trip.tank',
  COLOR_0 : '#e2f118',
  COLOR_1 : '#e17096',
  COLOR_2 : '#36F9F6',
  COLOR_3 : BRIGHT,
  COLOR_4 : '#7eb19f',
}

SETTINGS[ 8 ] = {
  name    : 'ugly.americans',
  COLOR_0 : '#a87ca1',
  COLOR_1 : '#FFCC66',
  COLOR_2 : '#fcfcfc',
  COLOR_3 : '#F25F25',
  COLOR_4 : '#FF3EBF',
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
})(SETTINGS)

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
      themeColors: colors,
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
