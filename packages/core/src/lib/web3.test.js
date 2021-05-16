import '@testing-library/jest-dom/extend-expect'

import cw3p from 'create-web3-provider'

import * as context from '../../test/context.json'

import initWeb3, { CONNECTING, CONNECTED } from './web3'

describe('web3', () => {
  beforeAll(async () => {
    // The fastest way to test this si actually using ropsten, mocking a provider
    // is actually a mess.
    window.ethereum = cw3p({ network: 'ropsten' })
  })

  const setState = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('init web3 with the correct functions', async () => {
    const { onEthereumUpdate, connect, updateInfo } = initWeb3(
      context,
      setState
    )
    expect(onEthereumUpdate).toBeInstanceOf(Function)
    expect(connect).toBeInstanceOf(Function)
    expect(updateInfo).toBeInstanceOf(Function)
    expect(setState).not.toHaveBeenCalled()
  })

  describe('connect', () => {
    it('connect using web3', async () => {
      const { connect } = initWeb3(context, setState)
      await connect()
      expect(setState).toHaveBeenCalledTimes(3)
      const firstSetState = setState.mock.calls[0][0]()
      expect(firstSetState.connectionStatus).toEqual(CONNECTING)
      // The second call set the DFO contract, ignoring for the time being.
      const thirdSetState = setState.mock.calls[2][0]()
      expect(thirdSetState.connectionStatus).toEqual(CONNECTED)
    })
  })
})
