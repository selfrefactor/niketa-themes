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
const PALLETE_INDEX = 18 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : '#f3f0e0',
  COLOR_SECONDARY : [ '#cccdc5', translate('back.8') ],
  COLOR_SELECTION : [ translate('back.opacity.10'), fetchZero ],
  COLOR_0         : '#89325fd6',
  COLOR_1         : '#356a6de9',
  COLOR_2         : '#b56e30ff',
}

function createRules(x){
  const colorOrOpacity = '8a'
  const color0 = [ x.COLOR_0, colorOrOpacity ]
  const color1 = [ x.COLOR_1, colorOrOpacity ]
  const color2 = [ x.COLOR_2, colorOrOpacity ]

  return {
    ...x,
    COLOR_BACK : [ x.COLOR_BACK, x.COLOR_BACK ],
    COLOR_0    : color0,
    COLOR_3    : color0,
    COLOR_1    : color1,
    COLOR_4    : color1,
    COLOR_2    : color2,
    COLOR_5    : color2,
  }
}

const base = resolve(__dirname, '../palettes')

test('happy', () => {
  createPaletteTheme({
    complex  : true,
    filePath : PALLETE_RANDOM_FLAG ?
      getFilePathRandom(PALLETE_INDEX) :
      `${ base }/generated/boring.json`,
    rules        : createRules(rules),
    levels       : MAX_LEVELS,
    rate         : RATE,
    publishName  : 'zeppelin.tea.for',
    publishIndex : 0,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}
