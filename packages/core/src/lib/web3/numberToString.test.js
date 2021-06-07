import numberToString from './numberToString'

describe('numberToString', () => {
  test('undefined value', () => {
    expect(numberToString()).toEqual('0')
  })
  test('null value', () => {
    expect(numberToString(null)).toEqual('0')
  })

  test('very big number', () => {
    expect(numberToString(238123098123098)).toEqual('238123098123098')
  })

  test('very big float number', () => {
    expect(numberToString(0.238123098123098)).toEqual('0.238123098123098')
  })

  test('exp number', () => {
    expect(numberToString(0.34e-2)).toEqual('0.0034')
  })
})
