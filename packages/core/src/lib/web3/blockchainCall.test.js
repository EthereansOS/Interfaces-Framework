import Web3 from 'web3'

import blockchainCall from './blockchainCall'

const web3 = new Web3()
const context = {
  web3,
  context: { foo: 'bar' },
}
let mockedGetSendingOptions
let mockedSendBlockchainTransaction
jest.mock('./getSendingOptions', () => {
  mockedGetSendingOptions = jest.fn()
  return mockedGetSendingOptions
})
jest.mock('./sendBlockchainTransaction', () => {
  mockedSendBlockchainTransaction = jest.fn()
  return mockedSendBlockchainTransaction
})

describe('blockchainCall', () => {
  beforeEach(() => {
    mockedGetSendingOptions && mockedGetSendingOptions.mockReset()
    mockedGetSendingOptions && mockedSendBlockchainTransaction.mockReset()
  })

  test('Call the blockchain without a function without implementation', async () => {
    mockedGetSendingOptions.mockReturnValueOnce({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    const mockedMethod = { call: jest.fn() }
    mockedMethod._method = { stateMutability: 'view' }
    mockedMethod.call.mockReturnValueOnce('foo')

    const value = jest.fn().mockReturnValueOnce(mockedMethod)

    const result = await blockchainCall(context, value)

    expect(value).toHaveBeenCalledWith()
    expect(mockedMethod.call).toHaveBeenCalledWith({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    expect(result).toEqual('foo')
  })

  test('Call the blockchain without a function with implementation get', async () => {
    mockedGetSendingOptions.mockReturnValueOnce({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    const mockedMethod = { call: jest.fn() }
    mockedMethod._method = { stateMutability: 'view' }
    mockedMethod.call.mockReturnValueOnce('foo')

    const value = {
      implementation: true,
      get: () => mockedMethod,
    }

    const result = await blockchainCall(context, value)

    expect(mockedMethod.call).toHaveBeenCalledWith({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    expect(result).toEqual('foo')
  })

  test('Call the blockchain without a function with implementation new', async () => {
    mockedGetSendingOptions.mockReturnValueOnce({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    const mockedMethod = { call: jest.fn() }
    mockedMethod._method = { stateMutability: 'pure' }
    mockedMethod.call.mockReturnValueOnce('foo')

    const value = {
      new: () => mockedMethod,
    }

    const result = await blockchainCall(context, value)

    expect(mockedMethod.call).toHaveBeenCalledWith({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    expect(result).toEqual('foo')
  })

  test('Call the blockchain without a function and sendBlockchainTransaction', async () => {
    mockedGetSendingOptions.mockReturnValueOnce({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    mockedSendBlockchainTransaction.mockReturnValueOnce('bar')

    const mockedMethod = { call: jest.fn() }
    mockedMethod._method = {}
    mockedMethod.call.mockReturnValueOnce('foo')

    const value = {
      new: () => mockedMethod,
    }

    const result = await blockchainCall(context, value)

    expect(mockedSendBlockchainTransaction).toHaveBeenCalledWith(
      context,
      undefined,
      mockedMethod
    )

    expect(result).toEqual('bar')
  })

  test('Call the blockchain with a value and a function', async () => {
    mockedGetSendingOptions.mockReturnValueOnce({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    mockedSendBlockchainTransaction.mockReturnValueOnce('bar')

    const mockedMethod = { call: jest.fn() }
    mockedMethod._method = {}
    mockedMethod.call.mockReturnValueOnce('foo')

    const oldFunction = {
      new: () => mockedMethod,
    }
    const value = 10
    const result = await blockchainCall(context, value, oldFunction)

    expect(mockedSendBlockchainTransaction).toHaveBeenCalledWith(
      context,
      value,
      mockedMethod
    )

    expect(result).toEqual('bar')
  })

  test('Call the blockchain with additional args', async () => {
    mockedGetSendingOptions.mockReturnValueOnce({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    const mockedMethod = { call: jest.fn() }
    mockedMethod._method = { stateMutability: 'view' }
    mockedMethod.call.mockReturnValueOnce('foo')

    const value = jest.fn().mockReturnValueOnce(mockedMethod)

    const additionalArg1 = 'new arg 1'
    const additionalArg2 = 'new arg 2'
    const additionalArg3 = 'new arg 3'
    const result = await blockchainCall(
      context,
      value,
      null,
      additionalArg1,
      additionalArg2,
      additionalArg3
    )

    expect(value).toHaveBeenCalledWith(
      additionalArg1,
      additionalArg2,
      additionalArg3
    )
    expect(mockedMethod.call).toHaveBeenCalledWith({
      from: '0x123123123',
      gas: '99999999',
      walletAddress: '0xD4484b2eE230f4f5372c41513e34a6e8DA63d276',
    })

    expect(result).toEqual('foo')
  })
})
