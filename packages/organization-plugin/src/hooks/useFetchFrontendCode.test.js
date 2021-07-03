import { renderHook } from '@testing-library/react-hooks'

import useFetchFrontendCode from './useFetchFrontendCode'

const mockedWeb3 = {
  web3: {},
  networkId: 1,
}

let mockedLoadContent
let mockedContext
const mockedDecCode = 'decCode'
const mockedDistrCode = 'distrCode'

jest.mock('@dfohub/core', () => {
  mockedLoadContent = jest.fn()
  mockedContext = {
    foo: 'bar',
  }
  return {
    useWeb3: () => mockedWeb3,
    useEthosContext: () => mockedContext,
    loadContent: mockedLoadContent,
  }
})

window.fetch = jest.fn(async () => ({
  json: jest.fn(async () => mockedDistrCode),
}))

describe('useFetchFrontendCode', () => {
  it('Should fetch both the decentralized and distributed code', async () => {
    const orgIndex = 1
    const orgLink = 'test'

    mockedLoadContent.mockResolvedValueOnce(mockedDecCode)

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchFrontendCode(orgIndex, orgLink)
    )

    await waitForNextUpdate()

    expect(mockedLoadContent).toBeCalledWith(
      { context: mockedContext, ...mockedWeb3 },
      orgIndex
    )
    expect(window.fetch).toBeCalledWith(orgLink, { mode: 'no-cors' })

    expect(result.current).toEqual({
      distributedCode: mockedDistrCode,
      decentralizedCode: mockedDecCode,
    })
  })
})
