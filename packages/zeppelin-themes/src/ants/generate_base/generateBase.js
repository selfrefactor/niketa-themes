import { resolve } from 'path'
import { outputFileSync } from 'fs-extra'
import { switcher, random, remove, replace, shuffle, map, findIndex } from 'rambdax'

import { baseData, baseBase } from '../../../palettes/baseData'

const UNDERLINE = '.UNDERLINE'
const extensions = [ '.jsx', '.ts', '.tsx' ]

function save(label, data){
  const output = resolve(
    __dirname,
    `../../../palettes/generated/${ label }.json`
  )
  outputFileSync(output, JSON.stringify(data, null, 2))
}

export function randomShade(color){
  const seed = random(3, 20)

  const shade = switcher(seed)
    .is(20, `${ color }_LIGHTEST`)
    .is(19, `${ color }_LIGHTER`)
    .is(17, `${ color }_LIGHT`)
    .is(16, `${ color }_LIGHT`)
    .is(15, `${ color }_DARK`)
    .is(14, `${ color }_DARK`)
    .is(18, `${ color }_DARK`)
    .is(12, `${ color }_DARKER`)
    .is(11, `${ color }_DARKEST`)
    .default(color)

  return shade
}

function pushToTokenColors({ syntaxInstance, underline, tokenColors, color }){
  const tokenColor = {
    name     : syntaxInstance,
    scope    : syntaxInstance,
    settings : {
      ...underline,
      foreground : randomShade(color),
    },
  }

  tokenColors.push(tokenColor)

  if (syntaxInstance.endsWith('.js')){
    const plainSyntaxInstance = remove('.js', syntaxInstance)

    extensions.forEach(extension => {
      const tokenColorExtension = {
        name     : `${ plainSyntaxInstance }${ extension }`,
        scope    : `${ plainSyntaxInstance }${ extension }`,
        settings : {
          ...underline,
          foreground : randomShade(color),
        },
      }
      tokenColors.push(tokenColorExtension)
    })
  }
  if (syntaxInstance.endsWith('.begin.js')){
    const endSyntaxInstance = replace(
      '.begin.js',
      '.end.js',
      syntaxInstance
    )
    pushToTokenColors({
      syntaxInstance : endSyntaxInstance,
      underline,
      tokenColors,
      color,
    })
  }
}

export function generateBase(label, baseDataValue = baseData){
  const tokenColors = []

  Object.entries(baseDataValue)
    .forEach(([ color, syntaxInstances ]) => {
      syntaxInstances
        .forEach(syntaxInstanceRaw => {
          const syntaxInstance = remove(UNDERLINE, syntaxInstanceRaw)

          const underline = syntaxInstanceRaw.endsWith(UNDERLINE) ?
            { fontStyle : 'underline' } :
            {}

          pushToTokenColors({
            syntaxInstance,
            underline,
            color,
            tokenColors,
          })
        })
    })

  const themeBase = {
    ...baseBase,
    tokenColors,
  }

  save(label, themeBase)
}

const colorsKeys = [
  'COLOR_0',
  'COLOR_1',
  'COLOR_2',
  'COLOR_3',
]

export function generateBaseRandom(label, setOfRandoms){
  const colorsHash = { ...baseData }

  const newColorsKeys = setOfRandoms ? setOfRandoms : shuffle(colorsKeys)

  const sk = map((_, prop) => {
    const foundIndex = findIndex(
      x => x === prop
    )(newColorsKeys)
    const foundKey = colorsKeys[ foundIndex ]

    return colorsHash[ foundKey ]
  })(colorsHash)

  generateBase(label, sk)
}

