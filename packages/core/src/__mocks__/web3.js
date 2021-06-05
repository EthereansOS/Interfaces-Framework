import Web3 from 'web3'

import logs from './logs'
import contracts from './contracts'

// We don't want to mock some utils/helpers from web3 (e.g. sha3)
const _utils = new Web3().utils
const _abi = new Web3().eth.abi

const currentProvider = {
  setMaxListeners: jest.fn(),
}

// arrow functions cannot be called with new
function Contract(abi, address) {
  return contracts[address] || {}
}

const eth = {
  getBlockNumber: jest.fn(),
  getAccounts: jest.fn(),
  getPastLogs: jest.fn().mockImplementation((args) => {
    const { address } = args
    return logs[address] || []
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
