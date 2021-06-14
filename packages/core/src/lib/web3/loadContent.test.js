import loadContent from './loadContent'
import blockchainCall from './blockchainCall'
import { newContract } from './contracts'
import loadContentMetadata from './loadContentMetadata'

const base64 = 'data:text/plain;base64,dW4gdGVzdA=='
const decodedBase64 = 'un test'

jest.mock('./blockchainCall', () => jest.fn())
jest.mock('./contracts', () => ({
  newContract: jest.fn(),
}))
jest.mock('./getNetworkElement', () => jest.fn())
jest.mock('./loadContentMetadata', () => jest.fn())

describe('loadContent', () => {
  test('should call loadContent and return the correct decoded string', async () => {
    const mockToUtf8 = jest.fn(() => base64)
    const mockWeb3 = { utils: { toUtf8: mockToUtf8 } }
    const mockedEnvironment = {
      context: { OcelotAbi: 'testOcelotAbi' },
      web3: mockWeb3,
    }
    const mockedContract = {
      methods: {
        content: 'content',
      },
    }

    newContract.mockReturnValue(mockedContract)
    loadContentMetadata.mockResolvedValueOnce([1])
    blockchainCall.mockResolvedValueOnce(base64)

    const res = await loadContent(mockedEnvironment, 'testTokenId')

    expect(blockchainCall).toBeCalledWith(
      mockedEnvironment,
      mockedContract.methods.content,
      'testTokenId',
      0
    )
    expect(mockToUtf8).toBeCalledWith(base64)
    expect(loadContentMetadata).toBeCalled()
    expect(res).toBe(decodedBase64)
  })
})
