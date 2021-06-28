import Web3 from 'web3'
import { intersection } from 'lodash'

import { VOID_ETHEREUM_ADDRESS } from '../lib/constants'

import logs from './logs'
import contracts from './contracts'

// We don't want to mock utils/helpers from web3 (e.g. sha3)
const _utils = new Web3().utils
const _abi = new Web3().eth.abi

const currentProvider = {
  setMaxListeners: jest.fn(),
}

// arrow functions cannot be called with new
function Contract(abi, address) {
  if (address) return contracts[address] || {}
  return contracts[VOID_ETHEREUM_ADDRESS]
}

const eth = {
  getAccounts: jest.fn(),
  getBlockNumber: jest.fn().mockImplementation(() => 10377970),
  getPastLogs: jest.fn().mockImplementation((args) => {
    const { address, topics } = args
    // address can be both one string and an array
    // https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getpastlogs
    // We have to filter using topics
    // see: https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getpastlogs
    if (!Array.isArray(address)) {
      const lg = logs[address] || []
      return lg.filter(
        (l) => intersection(topics, l.topics).length === topics.length
      )
    }
    const lg = address.flatMap((add) => logs[add]).filter((l) => !!l)
    const found = lg.filter(
      (l) => intersection(topics, l.topics).length === topics.length
    )
    return found
  }),
  net: {
    getId: () => 3, // we use the ropsten addresses
  },
  Contract,
  abi: _abi,
}

const web3 = jest.fn().mockImplementation(() => {
  return { currentProvider, eth, utils: _utils }
})

export default web3
