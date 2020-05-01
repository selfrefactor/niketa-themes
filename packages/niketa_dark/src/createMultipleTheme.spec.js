import { outputJson } from 'fs-extra'
import { init, map, range, shuffle } from 'rambdax'
import { pascalCase } from 'string-fn'

import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeData } from './generateThemeData'

const BACK_COLOR = '#1a2b3c'
const CHROME_COLOR = '#445A63'
const BRIGHT = '#f7faf7'
const FIRST_THEME = 'american.dad'

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

const chromeColors = {
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
  'editor.wordHighlightStrongBackground'      : '#410a0b',
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

export const SETTINGS = {}
const SPIN_LABEL_INDEX = false
// const SPIN_LABEL_INDEX = 3

SETTINGS[ 0 ] = {
  name    : FIRST_THEME,
  COLOR_0 : '#D55975',
  COLOR_1 : '#1cb3b8',
  COLOR_2 : '#BAE67E',
  COLOR_3 : BRIGHT,
  COLOR_4 : '#FFAE57',
}
SETTINGS[ 1 ] = {
  name    : 'aqua.teen.hunger.force',
  COLOR_0 : '#BAE67E',
  COLOR_1 : '#1cb3b8',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#D55975',
  COLOR_4 : '#FFAE57',
}

SETTINGS[ 2 ] = {
  name    : 'archer',
  COLOR_0 : '#D55975',
  COLOR_1 : '#BAE67E',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#FFAE57',
  COLOR_4 : '#1cb3b8',
}

SETTINGS[ 3 ] = {
  name    : 'cleveland.show',
  COLOR_0 : BRIGHT,
  COLOR_1 : '#FFAE57',
  COLOR_2 : '#D55975',
  COLOR_4 : '#BAE67E',
  COLOR_3 : '#1cb3b8',
}

SETTINGS[ 4 ] = {
  name    : 'curb.your.enthusiasm',
  COLOR_0 : '#6faab5',
  COLOR_1 : '#cfe071',
  COLOR_2 : BRIGHT,
  COLOR_3 : '#E07C64',
  COLOR_4 : '#B1365B',
}

SETTINGS[ 5 ] = {
  name    : 'dilbert',
  COLOR_0 : '#e17096',
  COLOR_1 : '#95c4da',
  COLOR_2 : '#f4dada',
  COLOR_3 : '#5699be',
  COLOR_4 : '#DF8E6D',
}

SETTINGS[ 6 ] = {
  name    : 'south.park',
  COLOR_0 : '#DA608E',
  COLOR_1 : '#ebac2a',
  COLOR_2 : '#DF91CA',
  COLOR_3 : BRIGHT,
  COLOR_4 : '#88B1C6',
}

SETTINGS[ 7 ] = {
  name    : 'trip.tank',
  COLOR_0 : '#e17096',
  COLOR_1 : '#7AD3F3',
  COLOR_2 : '#7eb19f',
  COLOR_3 : '#cca152',
  COLOR_4 : BRIGHT,
}
SETTINGS[ 8 ] = {
  name    : 'ugly.americans',
  COLOR_0 : '#9dc6a7',
  COLOR_1 : BRIGHT,
  COLOR_2 : '#cd8d7b',
  COLOR_3 : BRIGHT,
  COLOR_4 : '#fd79a8',
}

const settings = {}

map((x, i) => {
  if (SPIN_LABEL_INDEX !== false && Number(i) === 0){
    const found = SETTINGS[ SPIN_LABEL_INDEX ]
    const randomIndexes = shuffle(range(0, 5))
    let counter = -1
    const randomizedSettings = map((_, foundProp) => {
      if (foundProp === 'name') return FIRST_THEME
      counter++
      const actualProp = `${ init(foundProp) }${ randomIndexes[ counter ] }`
      console.log({
        actualProp,
        foundProp,
        counter,
      })

      return x[ actualProp ]
    })(found)

    const toSave = map(x => x === BRIGHT ? 'BRIGHT' : x)(randomizedSettings)
    console.log(SPIN_LABEL_INDEX)
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
