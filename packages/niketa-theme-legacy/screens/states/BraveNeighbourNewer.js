import { resolve } from 'path'
import { createPaletteTheme } from './createPaletteTheme'
import { translate, translatex } from './ants/mini/translate'
import { MAX_LEVELS } from './bees/saveTheme'
import { FetchTargetColor } from './ants/mini/fetchTargetColor'

const targetOptions = {
  targetIndex : TARGET_INDEX(),
  opacityFlag : TARGET_OPACITY(),
  targets     : [ OPACITY_TARGETS(), TARGETS() ],
}

const FetchTargetColorI = new FetchTargetColor(targetOptions)

const fetchZero = FetchTargetColorI.is(0)
const fetchOne = FetchTargetColorI.is(TARGET_ONLY_FIRST_FLAG() ? 0 : 1)
const RATE = 0.065 // applied to no opacity colors

function OPACITY_TARGETS(){
  return [ [ '39', '90' ], [ 'f1', '77' ], [ 'a0', 'c9' ], [ 'ba', 'ed' ] ]
}
const MARK = [ '#aa00ff', '#aa00aa' ]
function TARGETS(){
  return [
    [ 'dark.brown.3', 'random.2' ],
    [ 'dark.0', 'grey.5' ],
    [ 'dark.red.6', 'dark.pink.7' ],
    [ 'dark.green.10', 'dark.purple.4' ],
    [ 'dark.pink.7', 'navy.7' ],
    [ 'teal.1', 'teal.1' ],
    [ 'dark.blue.8', 'blue.8' ],
    [ 'dark.green.10', 'dark.blue.2' ],
    [ 'navy.4', 'dark.blue.2' ],
    [ 'light.red.0', 'red.0' ],
    [ 'orange.6', 'navy.0' ],
    [ 'secondary.5', 'ochra.0' ], // for darker themes
    [ 'navy.7', 'dark.1' ], // for darker themes
    [ 'dark.blue.9', 'dark.3' ], // for darker themes
    [ 'dark.1', 'dark.4' ], // for darker themes
    [ 'dark.purple.3', 'dark.purple.3' ],
    [ 'dark.purple.0', 'dark.purple.1' ],
    [ 'grey.0', 'dark.brown.2' ],
    [ 'pink.2', 'dark.pink.3' ],
    [ 'green.2', 'dark.green.3' ],
    [ 'dark.purple.1', 'purple.2' ],
  ]
}

function TARGET_OPACITY(){
  return true
}
function TARGET_ONLY_FIRST_FLAG(){
  return true
}
function TARGET_INDEX(){
  return 2
}
const PALLETE_INDEX = 8 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rulesx = {
  COLOR_BACK      : [ '#303b45', '#305b45' ],
  COLOR_SECONDARY : [ translate('random.3'), translate('back.8') ],
  COLOR_SELECTION : [ translate('back.opacity.10'), fetchZero ],
  COLOR_0         : [ '#15a1ae', '#fafafa' ],
  COLOR_1         : [ '#ebea8b', translate('random.2') ],
  COLOR_2         : [ '#f47d4fff', '77' ],
  COLOR_3         : [ '#E5AA83', '#E5AA83' ],
  COLOR_4         : [ '#15b8ae', '#1541ae' ],
  COLOR_5         : [ '#ec6dcdf6', '44' ],
}

const rules = {
  COLOR_BACK      : [ '#f9f6f2', '#f9f6f2' ],
  COLOR_SECONDARY : [ '#EEE6DA', '#CBC8C6' ],
  COLOR_SELECTION : [ '#b0e4d5', '#FAFAFA' ],
  COLOR_0         : [ '#AA6064', '#8D4B4F' ],
  COLOR_5         : [ '#8D4B4F', '#AA6064' ],
  COLOR_3         : [ '#567c73', '#4A6B63' ],
  COLOR_2         : [ '#d95361', '#D13141' ],
  COLOR_4         : [ '#D13141', '#d95361' ],
  COLOR_1         : [ '#328CC9', '#268bd2' ], //d33682
}

const base = resolve(__dirname, '../palettes')

test('happy', () => {
  createPaletteTheme({
    showList : false,
    complex  : true,
    filePath : PALLETE_RANDOM_FLAG ?
      getFilePathRandom(PALLETE_INDEX) :
      `${ base }/generated/boring.json`,
    rules,
    levels : MAX_LEVELS,
    rate   : RATE,
    // publishName  : 'led.immigrant.song',
    // publishIndex : 4,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}
