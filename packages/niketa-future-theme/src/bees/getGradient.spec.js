import { getGradientBee } from './getGradient'

test('happy', () => {
  const result = getGradientBee('#AEBABE', '#977D96', 7)
  console.log({ result })
})
