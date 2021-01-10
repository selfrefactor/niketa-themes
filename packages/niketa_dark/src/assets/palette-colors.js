import { listColors } from './list-colors'
import { BACK_COLOR } from './back-color'
import { suggestionsColors } from './suggestions-colors'
import { sidebarColors } from './sidebar-colors'
import { SOFT_WARNING, CHROME_COLOR } from './common'

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
  'sash.hoverBorder'             : '#387b54',
  'editorUnnecessaryCode.border' : SOFT_WARNING,
}

export const paletteColors = {
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
  'editor.wordHighlightBackground'            : '#4F4355',
  'editor.wordHighlightStrongBackground'      : '#db45a280',
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
