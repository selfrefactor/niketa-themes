import { generateColors } from './generateColors'

test('happy', () => {
  const input = [ '#e2f118', '#F0F4C3' ]

  expect(() =>
    generateColors({
      input,
      label  : '_HAPPY',
      levels : 60,
    })).not.toThrow()
})
