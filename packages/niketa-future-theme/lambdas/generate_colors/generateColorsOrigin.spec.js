import { findMiddleColor, generateColorsOrigin } from './generateColorsOrigin.js'

test('happy', () => {
  console.time('generateColors')
  generateColorsOrigin(70)
  console.timeEnd('generateColors')
})

test.skip('findMiddleColor', () => {
  const result = findMiddleColor([ '#433daa', '#aadaa5' ])
  expect(result).toBe('#6cc7c5')
})
