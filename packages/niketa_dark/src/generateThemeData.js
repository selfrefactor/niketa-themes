import { map, mergeAll } from 'rambdax'

import { changeColorAnt } from './ants/changeColor'

function createPaletteRule(
  prop, colorBase, rate = 0.045
){
  const willReturn = {}
  const modes = [ 'DARKEST', 'DARKER', 'LIGHTER', 'LIGHTEST', 'DARK', 'LIGHT' ]
  modes.forEach(mode => {
    const newColor = changeColorAnt(
      colorBase, mode, rate
    )

    willReturn[ `${ prop }_${ mode }` ] = newColor
  })

  willReturn[ prop ] = colorBase

  return willReturn
}

export function generateThemeData({ palette, chrome, colors }){
  const translatedColors = mergeAll(map((color, prop) => createPaletteRule(prop, color))(colors))
  const newTokenColors = map(tokenColor => {
    if (tokenColor.name === 'source.json'){
    }
    tokenColor.settings.foreground =
      translatedColors[ tokenColor.settings.foreground ]

    if (tokenColor.name === 'source.json'){
    }

    return tokenColor
  })(palette.tokenColors)
  const newTheme = {
    ...palette,
    type: 'dark',
    colors      : chrome,
    tokenColors : newTokenColors,
  }

  return newTheme
}
