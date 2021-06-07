import toEthereumSymbol from './toEthereumSymbol'

describe('toEthereumSymbol', () => {
  test('transform to symbol', () => {
    expect(toEthereumSymbol(2)).toBeUndefined()
    expect(toEthereumSymbol(0)).toEqual('wei')
    expect(toEthereumSymbol(3)).toEqual('kwei')
    expect(toEthereumSymbol(6)).toEqual('mwei')
    expect(toEthereumSymbol(9)).toEqual('gwei')
    expect(toEthereumSymbol(12)).toEqual('szabo')
    expect(toEthereumSymbol(15)).toEqual('finney')
    expect(toEthereumSymbol(18)).toEqual('ether')
    expect(toEthereumSymbol(21)).toEqual('kether')
    expect(toEthereumSymbol(24)).toEqual('mether')
    expect(toEthereumSymbol(27)).toEqual('gether')
    expect(toEthereumSymbol(30)).toEqual('tether')
  })
})
