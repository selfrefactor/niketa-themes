import { saveToPackageJson } from './ants/saveToPackageJson'
import { writeJsonAnt } from './ants/writeJson'
import { pascalCase } from 'string-fn'
import { saveToPackageJsonAnt } from './ants/saveToPackageJson'
import { generateThemeDataBee } from './bees/generateThemeData'
import { readJsonAnt } from './ants/readJson'
import { maybe, map, defaultTo, replace, switcher } from 'rambdax'

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
  'activityBar.background'                    : '#C4BE9D',
  'badge.background'                          : '#aaa',
  'badge.foreground'                          : '#fafafa',
  'diffEditor.insertedTextBackground'         : '#9c824a55',
  'diffEditor.removedTextBackground'          : '#64B5F655',
  'editor.background'                         : '#FAF8F3',
  'editor.findMatchBackground'                : '#95a5a677',
  'editor.findMatchHighlightBackground'       : '#71aac355',
  'editor.findRangeHighlightBackground'       : '#3f706366',
  'editor.lineHighlightBackground'            : 'MAIN_COLOR25',
  'editor.lineHighlightBorderx'               : '#9a9b9411',
  'editor.selectionBackground'                : 'MAIN_COLOR55',
  'editor.selectionHighlightBackground'       : 'MAIN_COLOR88',
  'editor.wordHighlightBackground'            : 'MAIN_COLORaa',
  'editor.wordHighlightStrongBackground'      : 'MAIN_COLORdd',
  'editorBracketMatch.background'             : '#B1365Bf3',
  'editorBracketMatch.border'                 : '#9F7E6Bf3',
  'editorCursor.foreground'                   : '#544',
  'editorGroupHeader.tabsBackground'          : 'MAIN_COLOR',
  'editorLineNumber.foreground'               : '#2a3343a9',
  'editorLink.activeForeground'               : '#034694',
  'errorForeground'                           : '#B1365Bf3',
  'focusBorder'                               : '#525e54',
  'scrollbarSlider.background'                : 'MAIN_COLOR',
  'scrollbarSlider.hoverBackground'           : '#C4BE9D',
  'selection.background'                      : '#ebe6d9',
  'sideBar.background'                        : 'MAIN_COLOR',
  'sideBar.border'                            : '#445250c1',
  'sideBar.foreground'                        : '#f9f4f4',
  'sideBarSectionHeader.background'           : '#aebabee9',
  'sideBarSectionHeader.foreground'           : '#2a3343e9',
  'sideBarTitle.foreground'                   : '#30322ed1',
  'statusBar.background'                      : 'MAIN_COLOR',
  'statusBar.foreground'                      : '#35495f',
  'tab.activeBackground'                      : 'BACK_COLOR',
  'tab.activeBorder'                          : '#35495f',
  'tab.activeForeground'                      : '#35495f',
  'tab.border'                                : 'MAIN_COLOR',
  'tab.inactiveBackground'                    : 'MAIN_COLOR',
  'tab.inactiveForeground'                    : '#fff',
  'tab.unfocusedActiveBackground'             : 'MAIN_COLOR',
  'tab.unfocusedActiveBorder'                 : 'MAIN_COLOR',
  'tab.unfocusedActiveForeground'             : '#fff',
  'widget.shadow'                             : '#8382aebb',
}

function getBaseColors(mode, actualBack){
  const chromeMainColor = switcher(mode)
    .is('advanced', '#bdc3c7')
    .is('brave', '#bbc0c4')
    .is('circus', '#b7bcbf')
    .default('#b0b4b4')

  const listChrome = mode === 'hunger' ?
    listBlue :
    listStandard

  const currentBase = {
    ...baseColors,
    ...listChrome,
  }
  const withMainColor = map(
    color => replace('MAIN_COLOR', chromeMainColor, color)
  )(currentBase)

  return map(
    color => replace('BACK_COLOR', actualBack, color)
  )(withMainColor)
}

export const SETTINGS = {}

SETTINGS[ 0 ] = {
  mode    : 'american',
  label   : 'dad',
  COLOR_0 : '#480032',
  COLOR_1 : '#20639b',
  COLOR_2 : '#CF6F4B',
  COLOR_3 : '#8F1C3D',
}
SETTINGS[ 1 ] = {
  mode    : 'american',
  label   : 'alien',
  COLOR_0 : '#5a6598fa',
  COLOR_1 : '#B45948f1',
  COLOR_2 : '#6E3E53C6',
  COLOR_3 : '#861D4FCF',
  COLOR_4 : '#4381A8E9',
}
SETTINGS[ 2 ] = {
  mode    : 'american',
  label   : 'spy',
  COLOR_0 : '#af3564fa',
  COLOR_1 : '#C26F63fa',
  COLOR_2 : '#533963f1',
  COLOR_3 : '#7F8E52f1',
}

SETTINGS[ 3 ] = {
  mode    : 'hunger',
  label   : 'force',
  COLOR_0 : '#1E416E',
  COLOR_1 : '#38978D',
  COLOR_2 : '#B97444',
}

SETTINGS[ 4 ] = {
  mode    : 'hunger',
  label   : 'epiphany',
  COLOR_0 : '#c03546',
  COLOR_5 : '#614ad3',
  COLOR_4 : '#906387',
  COLOR_3 : '#9e596f',
  COLOR_1 : '#835095',
  COLOR_2 : '#bb4741',
}
SETTINGS[ 5 ] = {
  mode    : 'hunger',
  label   : 'shake',
  COLOR_0 : '#063672',
  COLOR_1 : '#ff5177',
  COLOR_2 : '#b76144',
  COLOR_3 : '#0068a8',
}

SETTINGS[ 6 ] = {
  mode    : 'south',
  label   : 'park',
  COLOR_0 : '#2b8fb3',
  COLOR_1 : '#a0512c',
  COLOR_2 : '#BD2E63',
  COLOR_3 : '#E9630D',
  COLOR_4 : '#508546',
  COLOR_5 : '#880e4f',
}
SETTINGS[ 7 ] = {
  mode    : 'south',
  label   : 'authority',
  COLOR_0 : '#D27837',
  COLOR_1 : '#cf455c',
  COLOR_2 : '#6a3951',
  COLOR_3 : '#3b6160',
}
SETTINGS[ 8 ] = {
  mode    : 'south',
  label   : 'tegridy',
  COLOR_0 : '#884b50',
  COLOR_1 : '#3782AF',
  COLOR_2 : '#c4773b',
  COLOR_3 : '#B84251',
  COLOR_4 : '#406F64',
}

export function getChrome(mode, back){
  if (mode === 'american'){
    const actualBack = defaultTo('#1A1813', back)
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }
  if (mode === 'hunger'){
    const actualBack = defaultTo('#1a5aaa', back)
    const baseToApply = getBaseColors(mode, actualBack)

    return {
      ...baseToApply,
      'editor.background' : actualBack,
    }
  }

  const actualBack = defaultTo('#182222', back)
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
