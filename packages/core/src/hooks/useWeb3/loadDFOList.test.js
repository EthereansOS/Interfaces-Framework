import '@testing-library/jest-dom/extend-expect'

import * as context from '../../../test-data/context.json'
import initWeb3 from '../../lib/web3'

import loadDFOList from './loadDFOList'

describe('loadList', () => {
  beforeAll(async () => {})

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
    // This test is not actually fully testing the function. We need to mock web3.eth.getPastLogs to find the dfo logs.
    // The problem is that this search is recursive, and the address of the subsequent searchs done using the "data" field.
    // This implementation loads ALL the dfo events, then look for the dfo created filtering per topic and using the `data` field to get    // all the others logs recursively, but didn't find any
  })
})
