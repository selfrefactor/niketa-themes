import * as chromatism from 'chromatism'
import {
  map,
  piped,
  random,
  shuffle,
  sortBy,
  split,
  splitEvery,
  take,
  tap,
  uniq,
} from 'rambdax'

import { getCombinations } from '../best_triangle/permutation'
import colorsOrigin from './colorsOrigin.json'
const MAX_COLORS = 400

export function findMiddleColor(colorTuple){
  if (colorTuple.length !== 2)
    throw new Error('It needs a tuple of colors')

  return chromatism.mid(colorTuple[ 0 ], colorTuple[ 1 ]).hex
}

export function sortResults(color){
  return chromatism.temperature(color)
}

export function generateColorsOrigin(seed){
  const colorSlices = splitEvery(seed, shuffle(colorsOrigin))
  const colorSliceIndex = random(0, colorSlices.length - 1)
  const currentSlice = colorSlices[ colorSliceIndex ]
  const allCombinations = []
  getCombinations(currentSlice, 2, allCombinations)

  const sortedResult = piped(
    allCombinations,
    map(split(' ')),
    map(findMiddleColor),
    tap(x => console.log(x.length, 'base')),
    uniq,
    sortBy(sortResults)
  )

  expect(take(MAX_COLORS, sortedResult)).toMatchSnapshot()
}
