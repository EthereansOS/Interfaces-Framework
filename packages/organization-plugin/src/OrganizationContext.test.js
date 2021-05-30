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

describe('OrganizationContext', () => {
  let OrganizationContextProvider
  let useOrganizationContext
  let mockOrganizationHeader
  let mockUseWeb3

  beforeAll(() => {
    mockOrganizationHeader = jest.fn(() => false)
    mockUseWeb3 = jest.fn(() => false)

    jest.mock('./components/OrganizationHeader', () => mockOrganizationHeader)
    jest.mock('@dfohub/core', () => ({
      useWeb3: mockUseWeb3,
    }))

    OrganizationContextProvider =
      require('./OrganizationContext').OrganizationContextProvider
    useOrganizationContext =
      require('./OrganizationContext').useOrganizationContext
  })

  it('The component is initialized properly', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => {
      return { list: [] }
    })
    const { result } = renderHook(() => useOrganizationContext(), {
      wrapper,
    })

    expect(result.current).toEqual(
      expect.objectContaining({
        isEditMode: false,
        organization: undefined,
        organizationHeader: null,
        organizationNotFound: false,
      })
    )
  })

  it('Switch between edit and view mode', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => {
      return { list: [] }
    })
    const { result } = renderHook(() => useOrganizationContext(), {
      wrapper,
    })

    act(() => {
      result.current.setEditMode()
    })

    expect(result.current.isEditMode).toBeTruthy()

    act(() => {
      result.current.setViewMode()
    })

    expect(result.current.isEditMode).toBeFalsy()
  })

  it('Set existent organization', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => web3)
    const { result } = renderHook(() => useOrganizationContext(), {
      wrapper,
    })

    act(() => {
      result.current.setOrganizationAddress('123')
    })

    expect(result.current.organization).toEqual(web3.list[0])
  })

  it('Set non existent organization', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => web3)
    const { result } = renderHook(() => useOrganizationContext(), {
      wrapper,
    })

    act(() => {
      result.current.setOrganizationAddress('890')
    })

    expect(result.current.organization).toBeUndefined()
    expect(result.current.organizationNotFound).toBeTruthy()
  })

  it('Unset organization', async () => {
    const wrapper = ({ children }) => (
      <OrganizationContextProvider>{children}</OrganizationContextProvider>
    )

    mockUseWeb3.mockImplementation(() => web3)
    const { result } = renderHook(() => useOrganizationContext(), {
      wrapper,
    })

    act(() => {
      result.current.setOrganizationAddress('123')
    })

    expect(result.current.organization).toEqual(web3.list[0])

    act(() => {
      result.current.unsetOrganization()
    })

    expect(result.current.organization).toBeUndefined()
    expect(result.current.organizationNotFound).toBeFalsy()
  })
})
