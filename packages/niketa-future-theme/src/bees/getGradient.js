import * as chromatism from 'chromatism'

export function getGradientBee(from, to, levels = 5){
  return chromatism.fade(levels, from, to).hex
}
