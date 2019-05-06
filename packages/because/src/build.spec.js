const { build } = require('./build')

test('happy', () => {
  console.log(build())
  expect(1).toBe(1)
})
