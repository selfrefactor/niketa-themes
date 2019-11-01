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
  'list.activeSelectionForeground'   : '#677d7f',
  'list.dropBackground'              : '#999a9d',
  'list.focusBackground'             : '#885f66aa',
  'list.highlightForeground'         : '#89345d',
  'list.hoverBackground'             : '#999a9d',
  'list.hoverForeground'             : '#f5f4e8',
  'list.inactiveSelectionBackground' : '#eae3cd55',
  'list.inactiveSelectionForeground' : '#30322e',
}
const listBlue = {
  ...listStandard,
  'list.activeSelectionBackground'   : '#cacacc',
  'list.activeSelectionForeground'   : '#445a63',
  'list.focusBackground'             : '#978373d2',
  'list.highlightForeground'         : '#861d4f',
  'list.inactiveSelectionBackground' : '#d1d3d4aa',
}

export const baseColors = {
  'git.color.modified'                        : '#a50044',
  'list.errorForeground'                      : '#a50044',
  'gitDecoration.modifiedResourceForeground'  : '#eae3cd',
  'gitDecoration.untrackedResourceForeground' : '#a50044',
  'activityBar.background'                    : '#a11',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.findMatchBackground'                : '#95a5a677',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : 'MAIN_COLOR_DARK',
  'editor.lineHighlightBorderx'               : '#9a9b9411',
  'editor.selectionBackground'                : 'MAIN_COLOR55',
  'editor.selectionHighlightBackground'       : 'MAIN_COLOR88',
  'editor.wordHighlightBackground'            : 'MAIN_COLORaa',
  'editor.wordHighlightStrongBackground'      : 'MAIN_COLORdd',
  'editorBracketMatch.background'             : '#B1365Bf3',
  'editorBracketMatch.border'                 : '#9F7E6Bf3',
  'editorCursor.foreground'                   : '#54a',
  'editorGroupHeader.tabsBackground'          : 'MAIN_COLOR',
  'editorLineNumber.foreground'               : '#DD85007a',
  'editorLink.activeForeground'               : '#7a2',
  'errorForeground'                           : '#B1365Bf3',
  'focusBorder'                               : '#525e54',
  'scrollbarSlider.background'                : '#455a64',
  'scrollbarSlider.hoverBackground'           : '#C4BE9D',
  'selection.background'                      : '#ebe6d9',
  'sideBar.background'                        : 'MAIN_COLOR',
  'sideBar.border'                            : '#445250c1',
  'sideBar.foreground'                        : '#525',
  'sideBarSectionHeader.background'           : '#aebabee9',
  'sideBarSectionHeader.foreground'           : '#2a3343e9',
  'sideBarTitle.foreground'                   : '#00a',
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
  'tab.unfocusedActiveForeground'             : '#aa769b',
  'widget.shadow'                             : '#8382aebb',
}

function getBaseColors(mode, actualBack){
  const chromeMainColor = switcher(mode)
    .is('american', '#445A63')
    .is('hunger', '#445A63')
    .default('#4d607b')

  const darker = changeColorAnt(chromeMainColor, 'DARK', 0.3)
  const listChrome = mode === 'hunger' ?
    listBlue :
    listStandard

  const currentBase = {
    ...baseColors,
    ...listChrome,
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
  label   : 'dad',
  COLOR_0 : '#FBFBBF',
  COLOR_1 : '#8ac6d1',
  COLOR_2 : '#DD8500',
}
SETTINGS[ 1 ] = {
  mode    : 'american',
  label   : 'alien',
  COLOR_0 : '#E3E278',
  COLOR_1 : '#DAEEF1',
  COLOR_2 : '#ac7c7c',
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
  COLOR_0 : '#9eb4ad',
  COLOR_1 : '#bf616a',
  COLOR_2 : '#8994bd',
}

SETTINGS[ 4 ] = {
  mode    : 'hunger',
  label   : 'epiphany',
  COLOR_0 : '#a3be8c',
  COLOR_5 : '#827717',
  COLOR_4 : '#906387',
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
  COLOR_1 : '#a0512c',
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
