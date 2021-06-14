import blockchainCall from './blockchainCall'
import loadContentMetadata from './loadContentMetadata'

jest.mock('./blockchainCall', () => jest.fn())

describe('loadContentMetadata', () => {
  test('should call loadContentMetadata and return the correct integers', async () => {
    const resolvedValue = ['1', '2']
    const expected = [1, 8]
    const mockedEnvironment = {
      context: {},
      web3: {},
    }
    const mockedContract = {
      methods: { metadata: 'metadata' },
    }

    blockchainCall.mockResolvedValueOnce(resolvedValue)

    const res = await loadContentMetadata(
      mockedEnvironment,
      'testTokenId',
      mockedContract
    )

    expect(blockchainCall).toBeCalledWith(
      mockedEnvironment,
      mockedContract.methods.metadata,
      'testTokenId'
    )
    expect(res).toEqual(expected)
  })
})
