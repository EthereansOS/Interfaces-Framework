import tokenPercentage from './tokenPercentage'

describe('tokenPercentage', () => {
  test('with no amount', () => {
    expect(tokenPercentage(null, 20)).toBe('0%')
  })
  test('with 50% amount', () => {
    expect(tokenPercentage(10, 20)).toBe('50%')
  })
  test('with full amount', () => {
    expect(tokenPercentage(20, 20)).toBe('100%')
  })
  test('with string amount', () => {
    expect(tokenPercentage('20', 20)).toBe('100%')
  })
  test('with object total supply amount', () => {
    expect(tokenPercentage('10', { value: 20 })).toBe('50%')
  })
})
