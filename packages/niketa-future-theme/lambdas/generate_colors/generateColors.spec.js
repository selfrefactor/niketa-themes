import { generateColors } from './generateColors'

test('happy', () => {
  const input = [ '#b7bcbf', '#e9e9e9' ]

  expect(() =>
    generateColors({
      input,
      levels : 60,
    })).not.toThrow()
})
