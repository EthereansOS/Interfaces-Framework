import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

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
  let useOrganization
  let OrganizationContextProvider
  let mockOrganizationHeader
  let mockUseWeb3

  beforeAll(() => {
    mockOrganizationHeader = jest.fn(() => false)
    mockUseWeb3 = jest.fn(() => false)

    jest.mock('../components/OrganizationHeader', () => mockOrganizationHeader)
    jest.mock('@dfohub/core', () => ({
      useWeb3: mockUseWeb3,
    }))

    OrganizationContextProvider =
      require('../OrganizationContext').OrganizationContextProvider

    useOrganization = require('./useOrganization').default
  })

  it('The component is initialized properly', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => {
      return web3
    })
    const { result } = renderHook(() => useOrganization(), {
      wrapper,
    })

    expect(result.current).toEqual(
      expect.objectContaining({
        organization: undefined,
        organizationHeader: null,
        organizationNotFound: false,
      })
    )
  })

  it('Set existent organization', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => web3)
    const { result } = renderHook(() => useOrganization(), {
      wrapper,
    })

    act(() => {
      result.current.setOrganizationAddress('123')
    })

    expect(result.current.organization).toEqual(web3.list[0])
  })
})