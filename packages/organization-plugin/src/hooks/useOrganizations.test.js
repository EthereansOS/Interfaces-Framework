import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { WEB3_CONNECTED } from '@dfohub/core'

const web3 = {
  list: [
    {
      id: 1,
      walletAddress: '123',
    },
    {
      id: 2,
      walletAddress: 'abc',
    },
  ],
}

describe('useOrganization', () => {
  let useOrganizations
  let OrganizationContextProvider
  let mockOrganizationHeader
  let mockUseWeb3

  beforeAll(() => {
    mockOrganizationHeader = jest.fn(() => false)
    mockUseWeb3 = jest.fn(() => false)

    jest.mock('../components/OrganizationHeader', () => mockOrganizationHeader)
    jest.mock('@dfohub/core', () => ({
      useWeb3: mockUseWeb3,
      WEB3_CONNECTED: 'connected',
    }))

    OrganizationContextProvider =
      require('../OrganizationContext').OrganizationContextProvider

    useOrganizations = require('./useOrganizations').default
  })

  it('The component is initialized properly', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    const mockWeb3 = {
      ...web3,
      loadOrganizationList: jest.fn(),
      updateInfo: jest.fn(),
      isDFOInit: true,
      connectionStatus: 'connected',
      initDFO: jest.fn(),
    }

    mockUseWeb3.mockImplementation(() => {
      return mockWeb3
    })
    const { result } = renderHook(() => useOrganizations(), {
      wrapper,
    })

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(mockWeb3.initDFO).toHaveBeenCalledTimes(1)
    expect(mockWeb3.loadOrganizationList).toHaveBeenCalledTimes(1)
    expect(result.current).toEqual(
      expect.objectContaining({
        organizations: web3.list,
      })
    )
  })
})
