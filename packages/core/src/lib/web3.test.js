import '@testing-library/jest-dom/extend-expect'

import cw3p from 'create-web3-provider'

import * as context from '../../test-data/context.json'

import initWeb3, { CONNECTING, CONNECTED } from './web3'

describe('web3', () => {
  beforeAll(async () => {
    // The fastest way to test this is actually using ropsten, mocking a provider
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
    it('specify the correct status when connecting', async () => {
      const { connect } = initWeb3(context, setState)
      await connect()
      expect(setState).toHaveBeenCalledTimes(3)
      const firstSetState = setState.mock.calls[0][0]()
      expect(firstSetState.connectionStatus).toEqual(CONNECTING)
      const thirdSetState = setState.mock.calls[2][0]()
      expect(thirdSetState.connectionStatus).toEqual(CONNECTED)
      expect(thirdSetState.web3).toBeTruthy()
    })

    it('set the DFO contract data when connecting', async () => {
      const { connect } = initWeb3(context, setState)
      await connect()
      expect(setState).toHaveBeenCalledTimes(3)
      const secondSetState = setState.mock.calls[1][0]()
      expect(secondSetState.list.DFO.key).toEqual('DFO')
      expect(secondSetState.list.DFO.dFO).toBeTruthy()
      expect(secondSetState.list.DFO.startBlock).toBeTruthy()
    })

    it('set the web3 object when connecting', async () => {
      const { connect } = initWeb3(context, setState)
      await connect()
      expect(setState).toHaveBeenCalledTimes(3)
      const thirdSetState = setState.mock.calls[2][0]()
      expect(thirdSetState.web3).toBeTruthy()
    })
  })

  describe('loadList', () => {
    it('Load the list of organizations', async () => {
      const { loadList, connect } = initWeb3(context, setState)
      await connect()
      setState.mockClear()
      await loadList()
      expect(setState).toHaveBeenCalledTimes(4)
      // TODO: add assert on state changes
    })
  })
})
