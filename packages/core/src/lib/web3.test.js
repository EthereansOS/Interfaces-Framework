import '@testing-library/jest-dom/extend-expect'

import * as context from '../../test-data/context.json'

import initWeb3, { CONNECTING, CONNECTED } from './web3'

jest.mock('./web3/initConnection', () =>
  jest.fn(() => ({
    web3: {},
  }))
)

describe('web3', () => {
  const setState = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('init web3 with the correct functions', async () => {
    const { onEthereumUpdate, connect } = initWeb3(context, setState)
    expect(onEthereumUpdate).toBeInstanceOf(Function)
    expect(connect).toBeInstanceOf(Function)
    expect(setState).not.toHaveBeenCalled()
  })

  describe('connect', () => {
    it('specify the correct status when connecting', async () => {
      const { connect } = initWeb3(context, setState)
      await connect()
      expect(setState).toHaveBeenCalledTimes(2)
      const firstSetState = setState.mock.calls[0][0]()
      expect(firstSetState.connectionStatus).toEqual(CONNECTING)
      const thirdSetState = setState.mock.calls[1][0]()
      expect(thirdSetState.connectionStatus).toEqual(CONNECTED)
      expect(thirdSetState.web3).toBeTruthy()
    })

    it('set the web3 object when connecting', async () => {
      const { connect } = initWeb3(context, setState)
      await connect()
      expect(setState).toHaveBeenCalledTimes(2)
      const thirdSetState = setState.mock.calls[1][0]()
      expect(thirdSetState.web3).toBeTruthy()
    })
  })
})
