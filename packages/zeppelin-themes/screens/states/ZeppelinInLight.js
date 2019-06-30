import { identity } from 'rambdax'
import { resolve } from 'path'
import { createPaletteTheme } from './createPaletteTheme'
import { translate, translatex } from './ants/mini/translate'
import { MAX_LEVELS } from './bees/saveTheme'

const RATE = 0.075 // applied to no opacity colors

const MARK = [ '#aa00ff', '#aa00aa' ]
const PALLETE_INDEX = 4 // 29 is max
const PALLETE_RANDOM_FLAG = true

const rules = {
  COLOR_BACK      : '#f3f0e0',
  COLOR_SECONDARY : [ '#cccdc5', translate('back.8') ],
  COLOR_SELECTION : [ '#94525755', '88' ],
  COLOR_0         : '#A0595E', 
  COLOR_2         : '#3782AF',
  COLOR_1         : '#0d8a81', 
}

function createRules(x){
  // const colorOrOpacity = '64'
  const colorOrOpacity = '#455a64'
  const transformFn = colorOrOpacity.length === 2 ?
    whenOpacity :
    identity

  const color0 = [ transformFn(x.COLOR_0), colorOrOpacity ]
  const color1 = [ transformFn(x.COLOR_1), colorOrOpacity ]
  const color2 = [ transformFn(x.COLOR_2), colorOrOpacity ]

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
    publishName  : 'zeppelin.in.light',
    publishIndex : 2,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}

function whenOpacity(x){
  return `${x}FF`
}
