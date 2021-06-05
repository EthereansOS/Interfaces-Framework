import '@testing-library/jest-dom/extend-expect'

import * as context from '../../../test-data/context.json'
import initWeb3 from '../../lib/web3'

import loadDFOList from './loadDFOList'

describe('loadList', () => {
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
    await loadDFOList(methods, () => initialState, setState)()
    // TODO: complete
    // expect(setState).toHaveBeenCalledTimes(4)
    // const firstCallState = setState.mock.calls[0][0](initialState)
    // // TODO: add more significative assertions
    // expect(Object.keys(firstCallState.list).length).toEqual(2)
  })
})
