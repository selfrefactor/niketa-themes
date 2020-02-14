import { defaultTo, map, maybe, replace, switcher } from 'rambdax'
import { pascalCase } from 'string-fn'

import { changeColorAnt } from './ants/changeColor'
import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeDataBee } from './bees/generateThemeData'

/*
  First iteration:
  const AMERICAN_BACK_ORIGINAL = '#2A3343'
  const HUNGER_BACK_ORIGINAL_BLUE = '#2c3d52'
  const SOUTH_BACK_ORIGINAL = '#1b2d41'
  const AMERICAN_BACK = '#24283b'

  Second iteration:
  const AMERICAN_BACK = '#261b2c'
  const HUNGER_BACK = '#2c3d52'
  const SOUTH_BACK = '#263246'

  Third iteration:
  const AMERICAN_BACK = '#261b2c'
  const HUNGER_BACK = '#2c3d52'
  const SOUTH_BACK = '#263246'

  Fourth: 

  const AMERICAN_BACK = '#0a0026'
*/
const AMERICAN_BACK = '#212733'
const HUNGER_BACK = '#263246'
const SOUTH_BACK = '#263246'

/*
  SUGGESTIONS:
  #000720
  #2C2B2A
  #232834
  #080c11
  #0d1016
  #5c6773
  #011627
  #050523
  #1e1d1c

  #0a0026
  #24283b
  #252525
  #282828
  #2C2B2A
  #daa520
	#5ac95a
	#f64747
  #6ba9ff
  #68a14e
	#7e995b
  #cca152
  #ca5050
  #527ecc
  #7e2e7e
  #95e6cb
  #b871d0
  #249ef5
  #3dc7b9
  #f5e447
  #a6cc70
  #fac761
  #f29668
  #e6b450
  #ed8274
  #e17096
  #9b5fe0
  #d8b7fd
  #fed888
  #90e1c6
  #b4df51
  #35ba66
  #e15d97
  #cbccc6
  #ffa759
  #f07178
  selection "#ca5010",
*/

const listStandard = {
  'list.activeSelectionBackground'   : '#eae3cd',
  'list.activeSelectionForeground'   : '#30322e',
  'list.dropBackground'              : '#999a9d',
  'list.focusBackground'             : '#885f66',
  'list.highlightForeground'         : '#89345d',
  'list.hoverBackground'             : '#e5e9f0',
  'list.hoverForeground'             : '#bf616a',
  'list.inactiveSelectionBackground' : '#4c896a',
  'list.inactiveSelectionForeground' : '#f7f2f2',
}

const sidebarColors = {
  'sideBar.background'              : 'MAIN_COLOR',
  'sideBar.foreground'              : '#e7e7e7',
  'sideBar.border'                  : '#8382ae',
  'sideBarSectionHeader.background' : '#aebabe',
  'sideBarSectionHeader.foreground' : '#2a3343',
  'sideBarTitle.foreground'         : '#cacacc',
}

const suggestionsColors = {
  'editorSuggestWidget.background'          : '#c3c1a9f1',
  'editorSuggestWidget.border'              : '#93677699',
  'editorSuggestWidget.foreground'          : '#344250f2',
  'editorSuggestWidget.highlightForeground' : '#4d0e0bf2',
  'editorSuggestWidget.selectedBackground'  : '#aebabef2',
  'editorHoverWidget.background'            : '#344250f2',
  'editorHoverWidget.border'                : '#30322ef2',
  'editorWidget.background'                 : '#fafafaf2',
  'editorWidget.border'                     : '#40c8aef2',
}

const selectionsColors = {
  'editor.selectionBackground'          : '#f699d9',
  'editor.selectionHighlightBackground' : '#b48ead',
  'editor.inactiveSelectionBackground'  : '#eec2bb',
}
const OPACITY = 'd1'
export const baseColors = {
  ...suggestionsColors,
  ...sidebarColors,
  ...selectionsColors,
  'git.color.modified'                        : `#b65a3d${ OPACITY }`,
  'list.errorForeground'                      : '#859da9',
  'gitDecoration.modifiedResourceForeground'  : `#c0c5c9${ OPACITY }`,
  'gitDecoration.untrackedResourceForeground' : `#f39990${ OPACITY }`,
  'activityBar.background'                    : '#54a',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#282c34',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : 'MAIN_COLOR_DARK',
  'editor.lineHighlightBorderx'               : '#9a9b9411',
  'editor.wordHighlightBackground'            : '#bacfd6',
  'editor.wordHighlightStrongBackground'      : '#7c8489',
  'editorBracketMatch.background'             : '#B1365B',
  'editorBracketMatch.border'                 : '#978373',
  'editorCursor.foreground'                   : '#f9f6f1',
  'editorGroupHeader.tabsBackground'          : 'MAIN_COLOR',
  'editorLineNumber.foreground'               : '#DD85007a',
  'editorLink.activeForeground'               : '#7a2',
  'errorForeground'                           : '#B1365Bf3',
  'focusBorder'                               : '#525e54',
  'scrollbarSlider.background'                : '#455a64',
  'scrollbarSlider.hoverBackground'           : '#C4BE9D',
  'selection.background'                      : '#ebe6d9',
  'statusBar.background'                      : 'MAIN_COLOR',
  'statusBar.foreground'                      : '#fafafa',
  'tab.activeBackground'                      : 'BACK_COLOR',
  'tab.activeBorder'                          : '#35495f',
  'tab.activeForeground'                      : '#f2aa44',
  'tab.border'                                : 'MAIN_COLOR',
  'tab.inactiveBackground'                    : 'MAIN_COLOR',
  'tab.inactiveForeground'                    : '#b48ead',
  'tab.unfocusedActiveBackground'             : 'MAIN_COLOR',
  'tab.unfocusedActiveBorder'                 : 'MAIN_COLOR',
  'editorGutter.background'                   : 'MAIN_COLOR',
  'scrollbar.shadow'                          : '#cf6f4b',
  'tab.unfocusedActiveForeground'             : '#aa769b',
  'widget.shadow'                             : '#8382aebb',
}

function getBaseColors(mode, actualBack){
  const chromeMainColor = switcher(mode)
    .is('american', '#445A63')
    .is('hunger', '#445A63')
    .default('#4d607b')

  const darker = changeColorAnt(chromeMainColor, 'DARK', 0.3)

  const currentBase = {
    ...baseColors,
    ...listStandard,
  }
  const withMainDarkColor = map(color =>
    replace('MAIN_COLOR_DARK', darker, color)
  )(currentBase)

  const withMainColor = map(color =>
    replace('MAIN_COLOR', chromeMainColor, color)
  )(withMainDarkColor)

  return map(color => replace('BACK_COLOR', actualBack, color))(
    withMainColor
  )
}

export const SETTINGS = {}

SETTINGS[ 0 ] = {
  mode    : 'american',
  label   : 'alien',
  COLOR_2 : '#5CCFE6CC',
  COLOR_1 : '#D9D7CE',
  COLOR_0 : '#FFAE57',
  COLOR_3 : '#BAE67E',
  COLOR_4 : '#F07178',
  // COLOR_4 : '#ff605a',
}
/*
  SETTINGS[ 0 ] = {
  mode    : 'american',
  label   : 'alien',
  COLOR_2 : '#95c4da',
  COLOR_1 : '#f9f6f1',
  COLOR_0 : '#ca5010',
  COLOR_3 : '#f9f6f1',
  COLOR_4 : '#ca5010',
}

*/
SETTINGS[ 1 ] = {
  mode    : 'american',
  label   : 'dad',
  COLOR_0 : '#f6f6bb',
  COLOR_1 : '#8ac6d1',
  COLOR_2 : '#e4a445',
  COLOR_3 : '#8ac6d1',
  COLOR_4 : '#e4a445',
  COLOR_5 : '#a6cc70',
  // COLOR_5 : '#699a47',
}
// SETTINGS[ 2 ] = {
//   mode    : 'american',
//   label   : 'spy',
//   COLOR_2 : '#7eb19f',
//   COLOR_0 : '#cd7856',
//   COLOR_1 : '#c5930e',
//   COLOR_4 : '#cd7856',
//   COLOR_3 : '#c5930e',
// }

SETTINGS[ 2 ] = {
  mode    : 'american',
  label   : 'spy',
  COLOR_2 : '#a3be8c',
  COLOR_1 : '#f98fab',
  COLOR_0 : '#9cbbd0',
  COLOR_3 : '#9cbbd0',
  COLOR_4 : '#cbccc6',
  // COLOR_4 : '#dec9bd',
}

SETTINGS[ 3 ] = {
  mode    : 'hunger',
  label   : 'epiphany',
  COLOR_2 : '#9abc69',
  // // COLOR_2 : '#fed888',
  COLOR_0 : '#f07b73',
  COLOR_1 : '#d8b7fd',
  COLOR_4 : '#f07b73',
  // COLOR_4 : '#f07178',
  // COLOR_4 : '#cd7856',
  COLOR_3 : '#d8b7fd',
}

SETTINGS[ 4 ] = {
  mode    : 'hunger',
  label   : 'force',
  COLOR_0 : '#6faab5',
  COLOR_1 : '#cfe071',
  COLOR_2 : '#eff0f2',
  COLOR_3 : '#E07C64',
  COLOR_4 : '#6faab5',
  COLOR_5 : '#E07C64',
}

SETTINGS[ 5 ] = {
  mode    : 'hunger',
  label   : 'shake',
  COLOR_0 : '#e17096',
  COLOR_1 : '#95c4da',
  COLOR_2 : '#5699be',
  COLOR_3 : '#b8a0af',
  COLOR_4 : '#eea6a4',
}

SETTINGS[ 6 ] = {
  mode    : 'south',
  label   : 'authority',
  COLOR_0 : '#DA608E',
  COLOR_1 : '#ebac2a',
  COLOR_2 : '#E284A8',
  COLOR_3 : '#88B1C6',
  COLOR_4 : '#F7DDB2',
  COLOR_5 : '#88B1C6',
}
SETTINGS[ 7 ] = {
  mode    : 'south',
  label   : 'park',
  COLOR_0 : '#2b8fb3',
  COLOR_1 : '#ae7a6d',
  COLOR_2 : '#c0c5c9',
}
SETTINGS[ 8 ] = {
  mode    : 'south',
  label   : 'tegridy',
  COLOR_0 : '#f38b80',
  COLOR_1 : '#7ba9c6',
  COLOR_2 : '#c4773b',
}

export function getChrome(mode, back){
  if (mode === 'american'){
    const actualBack = defaultTo(AMERICAN_BACK, back)
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }
  if (mode === 'hunger'){
    const actualBack = defaultTo(HUNGER_BACK, back)
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }

  const actualBack = defaultTo(SOUTH_BACK, back)
  const baseToApply = getBaseColors(mode, actualBack)

  return {
    ...baseToApply,
    'editor.background' : actualBack,
  }
}

test('happy', () => {
  const allThemes = []
  map(val => {
    const { mode, label, back, ...colors } = val
    const paletteMode = maybe(
      colors.COLOR_5,
      'six',
      colors.COLOR_4 ? 'five' : maybe(colors.COLOR_3, 'four', 'three')
    )
    // console.log({paletteMode})
    const chrome = getChrome(mode, back)
    const palette = readJsonAnt(`palettes/${ paletteMode }.json`)
    const themeData = generateThemeDataBee({
      palette,
      chrome,
      colors,
    })
    themeData.name = pascalCase(`${ mode }.${ label }`)

    writeJsonAnt(`themes/${ themeData.name }.json`, themeData)

    allThemes.push({
      label   : themeData.name,
      uiTheme : 'vs-dark',
      path    : `./themes/${ themeData.name }.json`,
    })
  })(SETTINGS)

  saveToPackageJsonAnt(allThemes)
})
