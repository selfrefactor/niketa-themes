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

export function generateThemeData({ palette, paletteColors, themeColors }){
  const translatedColors = mergeAll(map((color, prop) => createPaletteRule(prop, color),themeColors))
  const tokenColors = map(tokenColor => {
    return {
      ...tokenColor,
      settings: {
        ...tokenColor.settings,
        foreground:  translatedColors[ tokenColor.settings.foreground ]
      }
    }
  }, palette.tokenColors)
  const newTheme = {
    ...palette,
    type: 'dark',
    colors      : paletteColors,
    tokenColors,
  }

  return newTheme
}
