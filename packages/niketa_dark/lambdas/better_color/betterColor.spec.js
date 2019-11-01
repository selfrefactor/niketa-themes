import { betterColor } from './betterColor.js'
const COLOR_0 = '#B97444'
const COLOR_1 = '#ff5177'
const BACKGROUND = '#355d80'
const BATCH = 300
const COLOR_TOLERANCE = 1
const BACKGROUND_TOLERANCE = 1.5

test('happy', () => {

  betterColor({
    backgroundTolerance : BACKGROUND_TOLERANCE,
    colorTolerance      : COLOR_TOLERANCE,
    batch               : BATCH,
    colorOne            : COLOR_0,
    colorTwo            : COLOR_1,
    background          : BACKGROUND,
  })
})

// American back - #2A3343
// Hunger back - #355d80
// South back - #d8d5c9
