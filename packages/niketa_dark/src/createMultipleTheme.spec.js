import { outputJson } from 'fs-extra'
import { init, map, range, shuffle } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeData } from './generateThemeData'

// #212121
// #181818
// #1b2b3b
// #202124
// #21202E
// #232834
// #25252F
// #1E2129
// #1B222D
// #292C3D
const BACK_COLOR = '#25252A'
const CHROME_COLOR = '#445A63'
const BRIGHT = '#f7faf7'
const FIRST_THEME = 'american.dad'

export const SETTINGS = {}
const SPIN_LABEL_INDEX = false
// const SPIN_LABEL_INDEX = 8

const listColors = {
  // in change of themes
  // in the circle of unsaved changes
  // in extensions preview
  'foreground'                       : '#e7e7e7',
  // on drag and drop of folders
  'list.dropBackground'              : '#db82d6',
  // when select theme, this is active theme background
  'list.focusBackground'             : '#6d50a1',
  'list.highlightForeground'         : '#4d0e0b',
  'list.inactiveFocusBackground'     : '#885f66',
  // when file is selected and then it turns inactive,
  // as code window became active
  'list.inactiveSelectionBackground' : '#1d4f93',
  'list.inactiveSelectionForeground' : '#e7e7e7',
  // in the previous comment, this is when code window is not yet active
  // also when selecting multiple files for delete or move
  'list.activeSelectionBackground'   : '#d1343855',
  // Right click on file in file explorer, this is foreground on hover
  'list.activeSelectionForeground'   : '#e7e7e7',
  // visible in autocomplete, in suggest, change of theme
  'list.hoverForeground'             : '#999966',
  'list.hoverBackground'             : '#ad680055',
}

const suggestionsColors = {
  // in autocomplete box, the active line background
  'editorSuggestWidget.selectedBackground'  : '#2c3d52',
  'editorSuggestWidget.background'          : '#0a0026',
  'editorHoverWidget.background'            : '#282c34',
  // when search with ctrl+f, this is widget chrome color
  'editorWidget.background'                 : CHROME_COLOR,
  // in autocomplete - the color of matched chars
  // i.e. if I write `co`, then suggest will be `const`
  // and the `co` will be in this color
  'editorSuggestWidget.highlightForeground' : '#f38b80',
  // in the above example, this is the color of the rest
  // also most common foreground color in autocomplete and suggestion
  'editorSuggestWidget.foreground'          : '#fafafa',
  'editorSuggestWidget.border'              : '#d78d9f',
  'editorHoverWidget.border'                : '#d78d9f',
  'editorWidget.border'                     : '#d78d9f',
}

const sidebarColors = {
  'sideBar.background'              : CHROME_COLOR,
  // It means the color of files in explorer, not yet modified
  // ============================================
  'sideBar.foreground'              : '#e7e7e7',
  'sideBar.border'                  : '#8382ae',
  'sideBarSectionHeader.background' : '#aebabe',
  'sideBarSectionHeader.foreground' : '#2a3343',
  'sideBarTitle.foreground'         : '#cacacc',
}
const selectionColors = {
  'editor.selectionBackground'          : '#5c677366',
  'editor.selectionHighlightBackground' : '#a1ba4e66',
  'editor.inactiveSelectionBackground'  : '#aaab9c66',
}

const newColorsMissingInLightTheme = {
  'tab.lastPinnedBorder'                          : '#E01C75',
  'gitDecoration.stageDeletedResourceForeground'  : '#e477e4',
  'gitDecoration.stageModifiedResourceForeground' : '#e4e4e4',
}

const chromeColors = {
  ...newColorsMissingInLightTheme,
  ...listColors,
  ...suggestionsColors,
  ...sidebarColors,
  ...selectionColors,
  'editor.background'                         : BACK_COLOR,
  'list.errorForeground'                      : '#859da9',
  'git.color.modified'                        : '#fac761',
  'gitDecoration.addedResourceForeground'     : '#53245b',
  'gitDecoration.modifiedResourceForeground'  : '#f6cbc7',
  'gitDecoration.untrackedResourceForeground' : '#c2aa4d',
  'activityBar.background'                    : '#53245b',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#b65a3d66',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706344',
  'editor.lineHighlightBackground'            : BACK_COLOR,
  'editor.lineHighlightBorder'                : '#5e6062aa',
  // next two
  // When search by word is active or when double click on a word
  'editor.wordHighlightBackground'            : '#35495f',
  'editor.wordHighlightStrongBackground'      : '#b1b1b1f1',
  'editorBracketMatch.background'             : '#41445e',
  'editorBracketMatch.border'                 : '#978373',
  'editorCursor.foreground'                   : '#f9f6f1',
  'editorGroupHeader.tabsBackground'          : CHROME_COLOR,
  'editorLineNumber.foreground'               : '#DD85007a',
  'editorLink.activeForeground'               : '#7a2',
  'errorForeground'                           : '#B1365Bf3',
  'focusBorder'                               : '#525e54',
  'scrollbarSlider.background'                : '#455a64',
  'scrollbarSlider.hoverBackground'           : '#C4BE9D',
  'selection.background'                      : '#db82d6',
  'statusBar.background'                      : CHROME_COLOR,
  'statusBar.foreground'                      : '#fafafa',
  'tab.activeBackground'                      : BACK_COLOR,
  'tab.activeBorder'                          : '#35495f',
  'tab.activeForeground'                      : '#f2aa44',
  'tab.border'                                : CHROME_COLOR,
  'tab.inactiveBackground'                    : CHROME_COLOR,
  'tab.inactiveForeground'                    : '#cfb8cb',
  'tab.unfocusedActiveBackground'             : CHROME_COLOR,
  'tab.unfocusedActiveBorder'                 : CHROME_COLOR,
  'editorGutter.background'                   : CHROME_COLOR,
  'scrollbar.shadow'                          : '#cf6f4b',
  'tab.unfocusedActiveForeground'             : '#aa769b',
  'widget.shadow'                             : '#8382aebb',
}

/*
latest suggestions
#FFD484
#D1675A
#EECF90
#68AEC9

#D58FDB
#85e89d
#fdaeb7
#79b8ff
#ffea7f
Bearded theme
#22ECDB
#FF738A
#FF955C
#69C3FF
#6DBBFF
#D1F1A9

// Several suggestions

#2ee8bb
#008f00
#eddd59
#8edacc
#e6daa6
#fb607f
#3a797e
#bb7766
#99ccee
#89d178
#fefe33
#fcfcda
#b53389
#E9CA5C
*/

// #C586C0
SETTINGS[ 0 ] = {
  name    : FIRST_THEME,
  // COLOR_0 : '#EDECEE',
  COLOR_0 : '#C5DBF2',
  COLOR_1 : '#A277FF',
  COLOR_2 : '#61FFCA',
  COLOR_3 : '#FF955C',
  COLOR_4 : '#FF79C6',
}
SETTINGS[ 1 ] = {
  name    : 'aqua.teen.hunger.force',
  // COLOR_0 : '#22ECDB',
  COLOR_0 : '#DBD9D2',
  COLOR_1 : '#FFAE57',
  COLOR_2 : '#1cb3b8',
  COLOR_3 : '#BAE67E',
  COLOR_4 : '#d97397',
  // COLOR_4 : '#D55975',
  // COLOR_3 : BRIGHT,
  // COLOR_0 : '#D1F1A9',
  // COLOR_1 : '#FF955C',
  // COLOR_2 : '#a87ca1',
  // COLOR_4 : '#57B6CD',
}

SETTINGS[ 2 ] = {
  name    : 'archer',
  COLOR_0 : '#EFEEEA',
  COLOR_1 : '#A277FF',
  COLOR_2 : '#E83B57',
  COLOR_3 : '#a3be8c',
  COLOR_4 : '#00B0FF',
  // COLOR_2 : '#f98fab',
  // COLOR_0 : '#EECF90',
  // COLOR_4 : '#68AEC9',
  // COLOR_4 : '#69C3FF',
  // COLOR_4 : BRIGHT,
}

SETTINGS[ 3 ] = {
  name    : 'cleveland.show',
  COLOR_0 : '#80DEEA',
  COLOR_1 : '#FBCFBD',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#fdd365',
  COLOR_4 : '#D1675A',
  // COLOR_1 : '#b8a0af',
  // COLOR_2 : '#D8EACC',
  // COLOR_4 : '#D55975',
  // COLOR_4 : '#ff6f7b',
}

SETTINGS[ 4 ] = {
  name    : 'curb.your.enthusiasm',
  COLOR_0 : '#00B0FF',
  COLOR_1 : '#E07C64',
  COLOR_2 : '#FBEECA',
  COLOR_3 : '#cfe071',
  COLOR_4 : '#AD82CB',
}

SETTINGS[ 5 ] = {
  name    : 'dilbert',
  COLOR_0 : BRIGHT,
  COLOR_1 : '#2ee8bb',
  COLOR_2 : '#fb607f',
  COLOR_3 : '#fefe33',
  COLOR_4 : '#50FA7B',
}

SETTINGS[ 6 ] = {
  name    : 'south.park',
  COLOR_0 : '#FFAE57',
  COLOR_1 : '#00C14E',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#BF616A',
  COLOR_4 : '#B48EAD',
}

SETTINGS[ 7 ] = {
  name    : 'trip.tank',
  COLOR_0 : '#e2f118',
  COLOR_1 : '#e17096',
  COLOR_2 : '#7AD3F3',
  COLOR_3 : BRIGHT,
  COLOR_4 : '#7eb19f',
}

SETTINGS[ 8 ] = {
  name    : 'ugly.americans',
  COLOR_0 : '#a87ca1',
  COLOR_1 : '#edf3a6',
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
      chrome : chromeColors,
      colors,
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
