import { changeColorAnt } from './ants/changeColor'
import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { generateThemeDataBee } from './bees/generateThemeData'
import { readJsonAnt } from './ants/readJson'
import { maybe, map, defaultTo, replace, switcher } from 'rambdax'

const AMERICAN_BACK = '#2A3343'
const HUNGER_BACK = '#2c3d52'
const SOUTH_BACK = '#1b2d41'

const listStandard = {
  'list.activeSelectionBackground'   : '#eae3cd',
  'list.activeSelectionForeground'   : '#30322e',
  'list.dropBackground'              : '#999a9d',
  'list.focusBackground'             : '#885f66aa',
  'list.highlightForeground'         : '#89345d',
  'list.hoverBackground'             : '#e5e9f0',
  'list.hoverForeground'             : '#bf616a',
  'list.inactiveSelectionBackground' : '#30322e',
  'list.inactiveSelectionForeground' : '#f7f2f2',
}
 
const sidebarColors = {
  'sideBar.background'                        : 'MAIN_COLOR',
  'sideBar.foreground'                        : '#e7e7e7',
  'sideBar.border'                            : '#8382ae',
  'sideBarSectionHeader.background'           : '#aebabe',
  'sideBarSectionHeader.foreground'           : '#2a3343',
  'sideBarTitle.foreground'                   : '#cacacc',
}

const suggestionsColors = {
  "editorSuggestWidget.background": "#c3c1a9",
  "editorSuggestWidget.border": "#936776e9",
  "editorSuggestWidget.foreground": "#344250",
  "editorSuggestWidget.highlightForeground":"#4d0e0b",
  "editorSuggestWidget.selectedBackground":"#aebabe",
  "editorHoverWidget.background": "#344250",
  "editorHoverWidget.border": "#30322e",
  "editorWidget.background": "#fafafa",
  "editorWidget.border": "#40c8ae", 
}

const selectionsColors = {
  'editor.selectionBackground': "#cacacc",
"editor.selectionHighlightBackground": "#977d96",
"editor.inactiveSelectionBackground":"#b06775"
}

export const baseColors = {
  ...suggestionsColors,
  ...sidebarColors,
  ...selectionsColors,
  'git.color.modified'                        : '#b65a3d',
  'list.errorForeground'                      : '#859da9',
  'gitDecoration.modifiedResourceForeground'  : '#b06775',
  'gitDecoration.untrackedResourceForeground' : '#f39990f1',
  'activityBar.background'                    : '#54a',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#fafafa',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : 'MAIN_COLOR_DARK',
  'editor.lineHighlightBorderx'               : '#9a9b9411',
  'editor.wordHighlightBackground'            : '#bacfd6',
  'editor.wordHighlightStrongBackground'      : '#ffe0e0',
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
  "scrollbar.shadow": "#cf6f4b",  
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
  const withMainDarkColor = map(
    color => replace('MAIN_COLOR_DARK', darker, color)
  )(currentBase)

  const withMainColor = map(
    color => replace('MAIN_COLOR', chromeMainColor, color)
  )(withMainDarkColor)

  return map(
    color => replace('BACK_COLOR', actualBack, color)
  )(withMainColor)
}

export const SETTINGS = {}

SETTINGS[ 0 ] = {
  mode    : 'american',
  label   : 'alien',
  COLOR_0 : '#E3E278',
  COLOR_1 : '#DAEEF1',
  COLOR_2 : '#ac7c7c',
}
SETTINGS[ 1 ] = {
  mode    : 'american',
  label   : 'dad',
  COLOR_0 : '#FBFBBF',
  COLOR_1 : '#8ac6d1',
  COLOR_2 : '#DD8500',
}
SETTINGS[ 2 ] = {
  mode    : 'american',
  label   : 'spy',
  COLOR_0 : '#cd7856',
  COLOR_1 : '#ff7bb0',
  COLOR_2 : '#7eb19f',
}

SETTINGS[ 3 ] = {
  mode    : 'hunger',
  label   : 'force',
  COLOR_0 : '#dadedb',
  COLOR_1 : '#a76a72',
  COLOR_2 : '#8994bd',
}

SETTINGS[ 4 ] = { 
  mode    : 'hunger',
  label   : 'epiphany',
  COLOR_0 : '#a3be8c',
  COLOR_1 : '#827717',
  COLOR_2 : '#9cbbd0',
}
SETTINGS[ 5 ] = {
  mode    : 'hunger',
  label   : 'shake',
  COLOR_0 : '#eec2bb',
  COLOR_1 : '#95c4da',
  COLOR_2 : '#b76144',
}

SETTINGS[ 6 ] = {
  mode    : 'south',
  label   : 'park',
  COLOR_0 : '#2b8fb3',
  COLOR_1 : '#ae7a6d',
  COLOR_2 : '#c0c5c9',
}
SETTINGS[ 7 ] = {
  mode    : 'south',
  label   : 'authority',
  COLOR_0 : '#D27837',
  COLOR_1 : '#cf455c',
  COLOR_2 : '#f2b999',
}
SETTINGS[ 8 ] = {
  mode    : 'south',
  label   : 'tegridy',
  COLOR_0 : '#f38b80',
  COLOR_1 : '#3782AF',
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
  map(
    val => {
      const { mode, label, back, ...colors } = val
      const paletteMode = maybe(
        colors.COLOR_5,
        'six',
        colors.COLOR_4 ? 'five' : maybe(
          colors.COLOR_3,
          'four',
          'three'
        )
      )
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
    }
  )(SETTINGS)

  saveToPackageJsonAnt(allThemes)
})
