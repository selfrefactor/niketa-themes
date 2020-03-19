import { defaultTo, map, maybe, replace, switcher } from 'rambdax'
import { pascalCase } from 'string-fn'

import { changeColorAnt } from './ants/changeColor'
import { readJsonAnt } from './ants/readJson'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { generateThemeDataBee } from './bees/generateThemeData'

const AMERICAN_BACK = '#1a2b3c'
const HUNGER_BACK = '#1a2b3c'
const SOUTH_BACK = '#1a2b3c'

const listStandard = {
  // in change of themes
  // in the circle of unsaved changes
  // in extensions preview
  'foreground'                       : '#203144',
  'list.activeSelectionBackground'   : '#eae3cd',
  'list.activeSelectionForeground'   : '#252525',
  'list.dropBackground'              : '#999a9d',
  // in change of themes?
  'list.focusBackground'             : '#25252566',
  // 'list.focusBackground'             : '#885f6699',
  'list.highlightForeground'         : '#252525',
  'list.inactiveFocusBackground'     : '#885f66',
  // in autocomplete
  'list.hoverBackground'             : '#334357',
  'list.hoverForeground'             : '#aaa99a',
  'list.inactiveSelectionBackground' : '#c7c5af',
  'list.inactiveSelectionForeground' : '#2d1016',
}
const listStandardx = {
  'list.activeSelectionBackground'   : '#812428',
  'list.activeSelectionForeground'   : '#12a99a',
  'list.dropBackground'              : '#812428',
  'list.focusBackground'             : '#f4581c',
  'list.highlightForeground'         : '#12a99a',
  // list.hoverBackground is visible in autocomplete
  'list.hoverBackground'             : '#f4581c',
  'list.hoverForeground'             : '#812428',
  'list.inactiveSelectionBackground' : '#12a99a',
  'list.inactiveSelectionForeground' : '#f4581c',
}

const sidebarColors = {
  'sideBar.background'              : 'MAIN_COLOR',
  'sideBar.foreground'              : '#e7e7e7',
  'sideBar.border'                  : '#8382ae',
  'sideBarSectionHeader.background' : '#aebabe',
  'sideBarSectionHeader.foreground' : '#2a3343',
  'sideBarTitle.foreground'         : '#cacacc',
}
const sidebarColorsx = {
  'sideBar.background'              : 'MAIN_COLOR',
  'sideBar.foreground'              : '#f4581c',
  'sideBar.border'                  : '#12a99a',
  'sideBarSectionHeader.background' : '#812428',
  'sideBarSectionHeader.foreground' : '#f4581c',
  'sideBarTitle.foreground'         : '#812428',
}

const suggestionsColors = {
  'editorSuggestWidget.background'          : '#c3c1a9',
  'editorSuggestWidget.border'              : '#936776',
  'editorSuggestWidget.foreground'          : '#050523',
  'editorSuggestWidget.highlightForeground' : '#4d0e0b',
  'editorSuggestWidget.selectedBackground'  : '#f6f6f4',
  'editorHoverWidget.background'            : '#344250f2',
  'editorHoverWidget.border'                : '#30322ef2',
  'editorWidget.background'                 : '#fafafaf2',
  'editorWidget.border'                     : '#40c8aef2',
}
const suggestionsColorsx = {
  'editorSuggestWidget.background'          : '#812428',
  'editorSuggestWidget.border'              : '#f4581c',
  'editorSuggestWidget.foreground'          : '#812428',
  'editorSuggestWidget.highlightForeground' : '#f4581c',
  'editorSuggestWidget.selectedBackground'  : '#12a99a',
  'editorHoverWidget.background'            : '#f4581c',
  'editorHoverWidget.border'                : '#12a99a',
  'editorWidget.background'                 : '#f4581c',
  'editorWidget.border'                     : '#812428',
}

const selectionsColors = {
  'editor.selectionBackground'          : '#5c677366',
  'editor.selectionHighlightBackground' : '#aebabe66',
  'editor.inactiveSelectionBackground'  : '#aaab9c66',
}
const selectionsColorsx = {
  'editor.selectionBackground'          : '#12a99a',
  'editor.selectionHighlightBackground' : '#f4581c',
  'editor.inactiveSelectionBackground'  : '#812428',
}
const OPACITY = 'd1'
export const baseColors = {
  ...suggestionsColors,
  ...sidebarColors,
  ...selectionsColors,
  'gitDecoration.addedResourceForeground'     : '#53245b',
  'git.color.modified'                        : '#fac761',
  'list.errorForeground'                      : '#859da9',
  'gitDecoration.modifiedResourceForeground'  : '#f39990',
  'gitDecoration.untrackedResourceForeground' : '#f39c12',
  'activityBar.background'                    : '#53245b',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#b65a3d66',
  // 'editor.findMatchHighlightBackground'       : '#525e5466',
  // 'editor.findRangeHighlightBackground'       : '#30345488',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706344',
  'editor.lineHighlightBackground'            : 'BACK_COLOR',
  'editor.lineHighlightBorder'                : '#5e6062aa',
  'editor.wordHighlightBackground'            : '#bacfd644',
  'editor.wordHighlightStrongBackground'      : '#7c848977',
  'editorBracketMatch.background'             : '#41445e',
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
// 'editor.selectionHighlightBackground' : '#f4581c',
// 'editor.inactiveSelectionBackground'  : '#812428',
const baseColorsx = {
  ...suggestionsColors,
  ...sidebarColors,
  ...selectionsColors,
  'git.color.modified'                        : '#12a99a',
  'list.errorForeground'                      : '#12a99a',
  'gitDecoration.modifiedResourceForeground'  : '#12a99a',
  'gitDecoration.untrackedResourceForeground' : `#f39990${ OPACITY }`,
  'activityBar.background'                    : '#54a',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#d0c7b5',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : 'BACK_COLOR',
  'editor.lineHighlightBorder'                : '#5e6062ea',
  'editor.wordHighlightBackground'            : '#bacfd655',
  'editor.wordHighlightStrongBackground'      : '#7c8489aa',
  'editorBracketMatch.background'             : '#41445e',
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

  const darker = changeColorAnt(
    chromeMainColor, 'DARK', 0.3
  )

  const currentBase = {
    ...baseColors,
    ...listStandard,
  }
  const withMainDarkColor = map(color => replace(
    'MAIN_COLOR_DARK', darker, color
  ))(currentBase)

  const withMainColor = map(color => replace(
    'MAIN_COLOR', chromeMainColor, color
  ))(withMainDarkColor)

  return map(color => replace(
    'BACK_COLOR', actualBack, color
  ))(withMainColor)
}

export const SETTINGS = {}

SETTINGS[ 0 ] = {
  mode    : 'american',
  label   : 'alien',
  COLOR_0 : '#FFAE57',
  COLOR_1 : '#D9D7CE',
  COLOR_2 : '#BAE67E',
  COLOR_3 : '#D55975',
  COLOR_4 : '#1cb3b8',
  COLOR_5 : '#bb8f7e',
}
SETTINGS[ 1 ] = {
  mode    : 'american',
  label   : 'dad',
  COLOR_0 : '#f6f6bb',
  COLOR_1 : '#57B6CD',
  COLOR_2 : '#cca152',
  COLOR_3 : '#57B6CD',
  COLOR_4 : '#a87ca1',
  COLOR_5 : '#a6cc70',
}

SETTINGS[ 2 ] = {
  mode    : 'american',
  label   : 'spy',
  COLOR_0 : '#F0F4C3',
  COLOR_1 : '#f98fab',
  COLOR_2 : '#50d0ff',
  COLOR_3 : '#a3be8c',
  COLOR_4 : '#bbdefb',
}

SETTINGS[ 3 ] = {
  mode    : 'hunger',
  label   : 'epiphany',
  COLOR_0 : '#df8543',
  COLOR_1 : '#0e9bd1',
  COLOR_2 : '#9abc69',
  COLOR_3 : '#80DEEA',
  COLOR_4 : '#fdd365',
}

SETTINGS[ 4 ] = {
  mode    : 'hunger',
  label   : 'force',
  COLOR_0 : '#6faab5',
  COLOR_1 : '#cfe071',
  COLOR_2 : '#f4f0e6',
  COLOR_3 : '#E07C64',
  COLOR_4 : '#dfe6e9',
  COLOR_5 : '#eccc68',
}

SETTINGS[ 5 ] = {
  mode    : 'hunger',
  label   : 'shake',
  COLOR_0 : '#e17096',
  COLOR_1 : '#95c4da',
  COLOR_2 : '#5699be',
  COLOR_3 : '#b8a0af',
  COLOR_4 : '#DF8E6D',
  COLOR_5 : '#f4dada',
}

SETTINGS[ 6 ] = {
  mode    : 'south',
  label   : 'authority',
  COLOR_0 : '#DA608E',
  COLOR_1 : '#ebac2a',
  COLOR_2 : '#DF91CA',
  COLOR_3 : '#88B1C6',
  COLOR_4 : '#F7DDB2',
  COLOR_5 : '#d4f8e8',
}
SETTINGS[ 7 ] = {
  mode    : 'south',
  label   : 'park',
  COLOR_0 : '#e17096',
  COLOR_1 : '#7AD3F3',
  COLOR_2 : '#7eb19f',
  COLOR_3 : '#cca152',
  COLOR_4 : '#dcedc1',
}
SETTINGS[ 8 ] = {
  mode    : 'south',
  label   : 'tegridy',
  COLOR_0 : '#9dc6a7',
  COLOR_1 : '#fd79a8',
  COLOR_2 : '#f8dc88',
  COLOR_3 : '#E06C75',
  COLOR_4 : '#cd8d7b',
  COLOR_5 : '#ffd1bd',
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
      colors.COLOR_4 ? 'five' : maybe(
        colors.COLOR_3, 'four', 'three'
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
  })(SETTINGS)

  saveToPackageJsonAnt(allThemes)
})
