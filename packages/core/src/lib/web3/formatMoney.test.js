import formatMoney from './formatMoney'

describe('formatMoney', () => {
  test('format numbers with default values', () => {
    expect(formatMoney(0)).toEqual('0')
    expect(formatMoney(10)).toEqual('10')
    expect(formatMoney(150)).toEqual('150')
    expect(formatMoney(1523)).toEqual('1,523')
    expect(formatMoney(152.3)).toEqual('152.3')
    expect(formatMoney(152.3123)).toEqual('152.31')
    expect(formatMoney(152.3183)).toEqual('152.32')
    expect(formatMoney(123152.3123)).toEqual('123,152.31')
  })

  test('format numbers with decimals', () => {
    expect(formatMoney(0, 3)).toEqual('0')
    expect(formatMoney(10, 3)).toEqual('10')
    expect(formatMoney(150, 3)).toEqual('150')
    expect(formatMoney(1523, 3)).toEqual('1,523')
    expect(formatMoney(152.3, 3)).toEqual('152.3')
    expect(formatMoney(152.3123, 3)).toEqual('152.312')
    expect(formatMoney(152.3183, 3)).toEqual('152.318')
    expect(formatMoney(123152.3123, 3)).toEqual('123,152.312')
  })

  test('format numbers with decimals and separatora', () => {
    expect(formatMoney(0, 3, '-', '!')).toEqual('0')
    expect(formatMoney(10, 3, '-', '!')).toEqual('10')
    expect(formatMoney(150, 3, '-', '!')).toEqual('150')
    expect(formatMoney(1523, 3, '-', '!')).toEqual('1-523')
    expect(formatMoney(152.3, 3, '-', '!')).toEqual('152!3')
    expect(formatMoney(152.3123, 3, '-', '!')).toEqual('152!312')
    expect(formatMoney(152.3183, 3, '-', '!')).toEqual('152!318')
    expect(formatMoney(123152.3123, 3, '-', '!')).toEqual('123-152!312')
  })
})
