import * as chromatism from 'chromatism'
import { switcher } from 'rambdax'

export function changeColorAnt(color, modeInput){
  const change = switcher(modeInput.toUpperCase())
    .is('DARKEST', -11)
    .is('DARKER', -8)
    .is('DARK', -5)
    .is('LIGHTEST', 11)
    .is('LIGHTER', 8)
    .is('LIGHT', 5)
    .default(0)

  const hasOpacity = color.length === 9
  if (!change || hasOpacity) return color

  return chromatism.brightness(change, color).hex
}
