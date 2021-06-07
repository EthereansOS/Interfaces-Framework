import fromDecimals from './fromDecimals'

describe('fromDecimals with scalar values and no transform to money', () => {
  test('transform with no number', () => {
    expect(fromDecimals('0')).toEqual('0')
  })

  test('transform with 18 decimal', () => {
    expect(fromDecimals('2000000000000000000', 18, true)).toEqual('2')
  })

  test('transform with defined decimal and standard decimal length', () => {
    expect(fromDecimals('2000000000', 9, true)).toEqual('2')
  })

  test('transform with defined decimal and float number', () => {
    expect(fromDecimals('21234000000', 10, true)).toEqual('2.1234')
  })

  test('transform with defined decimal and float number', () => {
    expect(fromDecimals('2123400000', 9, true)).toEqual('2.1234')
  })

  test('transform with non standard decimal', () => {
    expect(fromDecimals('41234000000', 10, true)).toEqual('4.1234')
  })
})

describe('fromDecimals with non scalar values', () => {
  test('transform with no number', () => {
    expect(fromDecimals({ value: '0' })).toEqual('0')
  })

  test('transform with 18 decimal', () => {
    expect(
      fromDecimals({ value: '2000000000000000000' }, { value: 18 }, true)
    ).toEqual('2')
  })

  test('transform with defined decimal and standard decimal length', () => {
    expect(fromDecimals({ value: '2000000000' }, { value: 9 }, true)).toEqual(
      '2'
    )
  })

  test('transform with defined decimal and float number', () => {
    expect(fromDecimals({ value: '21234000000' }, { value: 10 }, true)).toEqual(
      '2.1234'
    )
  })

  test('transform with defined decimal and float number', () => {
    expect(fromDecimals({ value: '2123400000' }, { value: 9 }, true)).toEqual(
      '2.1234'
    )
  })

  test('transform with non standard decimal', () => {
    expect(fromDecimals({ value: '41234000000' }, { value: 10 }, true)).toEqual(
      '4.1234'
    )
  })
})

describe('fromDecimals with non scalar values and with format', () => {
  test('transform with no number', () => {
    expect(fromDecimals({ value: '0' })).toEqual('0')
  })

  test('transform with 18 decimal', () => {
    expect(
      fromDecimals({ value: '2000000000000000000' }, { value: 18 })
    ).toEqual('2')
  })

  test('transform with defined decimal and standard decimal length', () => {
    expect(fromDecimals({ value: '2000000000' }, { value: 9 })).toEqual('2')
  })

  test('transform with defined decimal and float number', () => {
    expect(fromDecimals({ value: '21234000000' }, { value: 10 })).toEqual(
      '2.12'
    )
  })

  test('transform with defined decimal and float number', () => {
    expect(fromDecimals({ value: '2123400000' }, { value: 9 })).toEqual('2.12')
  })

  test('transform with non standard decimal', () => {
    expect(fromDecimals({ value: '41234000000' }, { value: 10 })).toEqual(
      '4.12'
    )
  })
})
