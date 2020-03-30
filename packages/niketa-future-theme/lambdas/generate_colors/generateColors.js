import { piped, uniq } from 'rambdax'

import { getGradientBee } from '../../src/bees/getGradient'

export function generateColors({ input, levels = 20 }){
  const [ first, second ] = input

  const colors = piped(getGradientBee(first, second, levels), uniq)
  expect(colors).toMatchSnapshot()
}
