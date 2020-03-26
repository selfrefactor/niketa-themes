import { generateColors } from './generateColors'

test('happy', () => {
  const input = [ '#d1c2e0', '#ffa0aa' ]

  expect(() =>
    generateColors({
      input,
      label  : '_HAPPY',
      levels : 60,
    })).not.toThrow()
})
 