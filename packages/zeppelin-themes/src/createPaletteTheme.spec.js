import { identity } from 'rambdax'
import { resolve } from 'path'
import { createPaletteTheme } from './createPaletteTheme'
import { translate, translatex } from './ants/mini/translate'
import { MAX_LEVELS } from './bees/saveTheme'

const RATE = 0.048 // applied to no opacity colors

const MARK = [ '#aa00ff', '#aa00aa' ]
// Need to import from threeColors.json
// ============================================
const PALLETE_INDEX = 18 // Need to import from threeColors.json
const PALLETE_RANDOM_FLAG = true

const THE_X_FLAG = true

const rules = {
  COLOR_BACK      : '#f4f1e6',
  COLOR_SECONDARY : [ '#cccdc5', translate('back.8') ],
  COLOR_SELECTION : [ '#94525755', '88' ],
  COLOR_1         : '#ae8d60',
  COLOR_2         : '#7e9a64',
  COLOR_0         : '#612e5d',
}

const rulesx = {
  ...rules,
  COLOR_0 : '#096165',
  COLOR_1 : '#085B5E',
  COLOR_2 : '#c80051',
  COLOR_3 : '#b7004b',
  COLOR_4 : '#9C8058',
  COLOR_5 : '#9C8058',
}

function createRules(x){
  const colorOrOpacity = '64'
  // const colorOrOpacity = '#771166'
  const transformFn = colorOrOpacity.length === 2 ? whenOpacity : identity

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

function createRulesx(x){
  const color0 = [ x.COLOR_0, x.COLOR_1 ]
  const color5 = [ x.COLOR_1, x.COLOR_0 ]
  const color1 = [ x.COLOR_2, x.COLOR_3 ]
  const color3 = [ x.COLOR_3, x.COLOR_2 ]
  const color2 = [ x.COLOR_4, x.COLOR_5 ]
  const color4 = [ x.COLOR_5, x.COLOR_4 ]

  return {
    ...x,
    COLOR_BACK : [ x.COLOR_BACK, x.COLOR_BACK ],
    COLOR_0    : color0,
    COLOR_1    : color1,
    COLOR_2    : color2,
    COLOR_3    : color3,
    COLOR_4    : color4,
    // COLOR_5    : color5,
  }
}

const base = resolve(__dirname, '../palettes')

test('happy', () => {
  const actualRules = THE_X_FLAG ?
    createRulesx(rulesx) :
    createRules(rules)

  createPaletteTheme({
    complex  : true,
    // Need to import from threeColors.json
    // ============================================
    filePath : PALLETE_RANDOM_FLAG ?
      getFilePathRandom(PALLETE_INDEX) :
      `${ base }/generated/boring.json`,
    rules  : actualRules,
    levels : MAX_LEVELS,
    rate   : RATE,
    // publishName  : 'zeppelin.in.light',
    // publishIndex : 2,
  })
})

function getFilePathRandom(index){
  const found = `${ base }/generated/_${ index }.json`

  return found
}

function whenOpacity(x){
  return `${ x }FF`
}
