import { flatten, piped, uniq } from 'rambdax'

import { translate } from '../../src/ants/mini/translate'
import { writeJsonAnt } from '../../src/ants/writeJson'
import { getGradientBee } from '../../src/bees/getGradient'
const base = 'lambdas/generate_colors/colors'

export function generateColors({ input, levels = 20, label = '' }){
  const [ firstRaw, secondRaw ] = input
  const OUTPUT = `${ base }/${ label }_COLORS.json`

  const first = firstRaw.startsWith('#') ? firstRaw : translate(firstRaw)

  const second = secondRaw.startsWith('#') ? secondRaw : translate(secondRaw)

  const colors = piped(getGradientBee(
    first, second, levels
  ), uniq)
  // log({ OUTPUT })

  return writeJsonAnt(OUTPUT, flatten(colors))
}
