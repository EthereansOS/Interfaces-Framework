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
  getAccounts: jest.fn(),
  getBlockNumber: jest.fn().mockImplementation(() => 10377970),
  getPastLogs: jest.fn().mockImplementation((args) => {
    const { address } = args
    // address can be both one string and an array
    // https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getpastlogs
    if (!Array.isArray(address)) {
      return logs[address] ? [logs[address]] : []
    }
    // We get all the logs with the same address and the same topic, in order,
    // see: https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#getpastlogs
    const lg = address.map((add) => logs[add]).filter((l) => !!l)
    return lg.filter(
      (l) => JSON.stringify(l.topics) === JSON.stringify(args.topics)
    )
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
