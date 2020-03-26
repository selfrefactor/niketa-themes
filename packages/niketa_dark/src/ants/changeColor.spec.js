import { changeColorAnt } from './changeColor'

test('happy', () => {
  const result = changeColorAnt('#4a6f93', 'DARKEST')
  expect(result).toEqual('#385470')
})
