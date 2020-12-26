import { outputJson } from 'fs-extra'
import { init, map, range, shuffle } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeData } from './generateThemeData'

const SOFT_WARNING = '#aafafa'

/*
  Suggestions:
  #261D45
  #04212F
*/

// #181818
// #1B222D
// #1E2129
// #1b2b3b
// #202124
// #21202E
// #212121
// #232834
// #25252A
// #25252F
// #292C3D
// #2D3654
// #242530
// #262A33
// #263238
// #1F1D2E
const BACK_COLOR = '#1D1D26'
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
  'editor.selectionBackground'          : '#5c6773',
  'editor.selectionHighlightBackground' : '#a1ba4e99',
  'editor.inactiveSelectionBackground'  : '#aaab9caa',
}

const newColorsMissingInLightTheme = {
  'tab.lastPinnedBorder'                          : '#E01C75',
  'gitDecoration.stageDeletedResourceForeground'  : '#e477e4',
  'gitDecoration.stageModifiedResourceForeground' : '#e4e4e4',
}

const newColors = {
  'sash.hoverBorder': '#387b54',
  'editorUnnecessaryCode.border': SOFT_WARNING
}

const chromeColors = {
  ...newColors,
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
  "editor.wordHighlightBackground": "#4F4355",
  "editor.wordHighlightStrongBackground": "#db45a280",
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
#008f00
#00EFF6
#00FFC8
#2196f3
#22ECDB
#2ee8bb
#36f9f6
#3a797e
#61FFCA
#68AEC9
#69C3FF
#6DBBFF
#72f1b8
#79b8ff
#85e89d
#89d178
#8edacc
#99ccee
#BD93F9
#C586C0
#D1675A
#D1F1A9
#D58FDB
#E9CA5C
#EDECEE
#EECF90
#F1FA8C
#F92672
#FC644D
#FF5680
#FF6E6E
#FF738A
#FF79C6
#FF79C6
#FF955C
#FF9F2E
#FFAA00
#FFD484
#b53389
#bb7766
#e6daa6
#eddd59
#f97e72
#fb607f
#fcfcda
#fdaeb7
#fe4450
#fede5d
#fefe33
#ff7edb
#ff8b39
#ffea7f

  Below are colors that were published but later removed

#22ECDB
#50FA7B
#57B6CD
#7AD3F3
#80DEEA
#82AAFF
#BF616A
#D1F1A9
#D55975
#D8EACC
#F3F99D
#FF955C
#FFAE57
#a87ca1
#b8a0af
#edf3a6
#f98fab
#fdd365
#ff6f7b
*/

SETTINGS[ 0 ] = {
  name    : FIRST_THEME,
  COLOR_0 : '#C5DBF2',
  COLOR_1 : '#A277FF',
  // COLOR_2 : '#72F1B8', 
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
  // COLOR_0 : '#94D0FF', // test
  COLOR_0 : '#3E8FB0', 
  COLOR_1 : '#E07C64',
  COLOR_2 : '#FBEECA',
  COLOR_3 : '#cfe071',
  COLOR_4 : '#AD82CB',
}

SETTINGS[ 5 ] = {
  name    : 'dilbert',
  // COLOR_0 : '#fb607f',
  COLOR_0 : '#EA9A97',
  COLOR_1 : '#EA80FC',
  COLOR_2 : '#1DE9B6',
  COLOR_3 : '#FFA000',
  COLOR_4 : '#B2FF59',
}

SETTINGS[ 6 ] = {
  // COLOR_0 : '#FFAE57', test
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
  // COLOR_1 : '#FEDE5D', 
  COLOR_1 : '#FFCC66', 
  COLOR_2 : '#fcfcfc',
  COLOR_3 : '#F25F25',
  COLOR_4 : '#FF3399', 
  // COLOR_4 : '#FF3EBF', 
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
