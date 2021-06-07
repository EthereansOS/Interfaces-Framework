import toDecimals from './toDecimals'

describe('toDecimals with scalar values', () => {
  test('transform with no number', () => {
    expect(toDecimals(0)).toEqual('0')
  })

  test('transform with default decimal', () => {
    expect(toDecimals(2)).toEqual('2000000000000000000')
  })

  test('transform with defined decimal and standard decimal length', () => {
    expect(toDecimals(2, 9)).toEqual('2000000000')
  })

  test('transform with defined decimal and float number', () => {
    expect(toDecimals(2.1234, 10)).toEqual('21234000000')
  })

  test('transform with non standard decimal', () => {
    expect(toDecimals(4.1234, 10)).toEqual('41234000000')
  })
})

describe('toDecimals with non scalar values', () => {
  test('transform with no number', () => {
    expect(toDecimals({ value: 0 })).toEqual('0')
  })

  test('transform with default decimal', () => {
    expect(toDecimals({ value: 2 })).toEqual('2000000000000000000')
  })

  test('transform with defined decimal and standard decimal length', () => {
    expect(toDecimals({ value: 2 }, { value: 9 })).toEqual('2000000000')
  })

  test('transform with defined decimal and float number', () => {
    expect(toDecimals({ value: 2.1234 }, { value: 10 })).toEqual('21234000000')
  })

  test('transform with non standard decimal', () => {
    expect(toDecimals({ value: 4.1234 }, { value: 10 })).toEqual('41234000000')
  })
})
