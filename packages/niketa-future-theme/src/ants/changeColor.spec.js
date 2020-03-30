import { mapToObject } from 'rambdax'

import { changeColorAnt } from './changeColor'
import { writeJsonAnt } from './writeJson'

test('happy', () => {
  const color = '#f26153'

  const modes = [
    'light',
    'lighter',
    'lightest',
    'origin',
    'dark',
    'darker',
    'darkest',
  ]
  const results = mapToObject(mode => ({ [ mode ] : changeColorAnt(color, mode) }))(modes)

  writeJsonAnt('src/ants/changeColor.json', results)
})
