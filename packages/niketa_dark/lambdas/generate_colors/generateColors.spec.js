import { generateColors } from './generateColors'

test('happy', () => {
  const input = [ '#88B1C6', '#0a0a0a' ]

  expect(() =>
    generateColors({
      input,
      label  : '_HAPPY',
      levels : 60,
    })).not.toThrow()
})
