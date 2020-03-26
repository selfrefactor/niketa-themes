import Color from 'color'
import { switcher } from 'rambdax'

function whenNoOpacity({ color, change, mode }){
  return Color(color)[ mode ](change)
    .hex()
}

const BASE = 0.08

export function changeColorAnt(
  color, modeInput, base = BASE
){
  const { mode, change } = switcher(modeInput)
    .is('DARKEST', {
      mode   : 'darken',
      change : base * 3,
    })
    .is('DARKER', {
      mode   : 'darken',
      change : base * 2,
    })
    .is('DARK', {
      mode   : 'darken',
      change : base,
    })
    .is('LIGHTEST', {
      mode   : 'lighten',
      change : base * 3,
    })
    .is('LIGHTER', {
      mode   : 'lighten',
      change : base * 2,
    })
    .is('LIGHT', {
      mode             : 'lighten',
      change           : base,
      opacityChange    : 30,
      opacityDirection : 'minus',
    })
    .default({})

  if (!mode) return color

  return whenNoOpacity({
    color,
    change,
    mode,
  })
}
