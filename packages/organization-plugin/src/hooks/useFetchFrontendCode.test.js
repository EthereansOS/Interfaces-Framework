import { renderHook, act } from '@testing-library/react-hooks'

import useFetchFrontendCode from './useFetchFrontendCode'

const mockWeb3 = {
  loadContent: jest.fn(),
}
const mockedDecCode = 'decCode'
const mockedDistrCode = 'distrCode'

jest.mock('@dfohub/core', () => ({
  useWeb3: () => mockWeb3,
}))

window.fetch = jest.fn(async () => ({
  json: jest.fn(async () => mockedDistrCode),
}))

describe('useFetchFrontendCode', () => {
  it('Should fetch both the decentralized and distributed code', async () => {
    const orgIndex = 1
    const orgLink = 'test'

    mockWeb3.loadContent.mockResolvedValueOnce(mockedDecCode)

    const { result } = renderHook(() => useFetchFrontendCode(orgIndex, orgLink))

    let state
    act(() => {
      state = result.current
    })

    expect(mockWeb3.loadContent).toBeCalledWith(orgIndex)
    expect(window.fetch).toBeCalledWith(orgLink, { mode: 'no-cors' })

    expect(state).toEqual({
      distributedCode: mockedDistrCode,
      decentralizedCode: mockedDecCode,
    })
  })
})
