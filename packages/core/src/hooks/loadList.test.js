import '@testing-library/jest-dom/extend-expect'

import cw3p from 'create-web3-provider'

import * as context from '../../test-data/context.json'
import initWeb3 from '../lib/web3'

import loadList from './loadList'

describe('loadList', () => {
  beforeAll(async () => {
    window.ethereum = cw3p({ network: 'ropsten' })
  })

  let stateFn = () => {}
  const setInitialState = (f) => (stateFn = f)

  const setState = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Load the list of organizations', async () => {
    const methods = initWeb3(context, setInitialState)
    await methods.connect()
    const initialState = stateFn()
    await loadList(methods, initialState, setState)()
    expect(setState).toHaveBeenCalledTimes(4)
    // Her we should assert that setState has benn called with the correct items
    // const firstSetState = setState.mock.calls[0][0](initialState)
  }, 25000)
})
