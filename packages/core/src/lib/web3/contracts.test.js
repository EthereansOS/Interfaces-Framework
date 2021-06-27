import Web3 from 'web3'

import { newContract, resetContracts, getAllContracts } from './contracts'

describe('newContract', () => {
  const web3 = new Web3()
  const context = {
    web3,
  }
  test('creates a contract for an abi and an address', () => {
    const abi = 'MY_CONTRACT_ABI'
    const address = '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B'
    const contract = newContract(context, abi, address)
    expect(contract.name).toEqual('TEST')
    const allContracts = getAllContracts()
    expect(Object.keys(allContracts).length).toEqual(1)
  })

  test('creates a contract for an abi and a empty ETH address', () => {
    const abi = 'MY_CONTRACT_ABI'
    const contract = newContract(context, abi)
    expect(contract.name).toEqual('EMPTY_ETH_ADDRESS')
    const allContracts = getAllContracts()
    expect(Object.keys(allContracts).length).toEqual(1)
  })
})

describe('resetContracts', () => {
  const web3 = new Web3()
  const context = {
    web3,
  }
  test('reset all contracts cache', () => {
    const abi = 'MY_CONTRACT_ABI'
    const address = '0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B'
    const contract = newContract(context, abi, address)
    expect(contract.name).toEqual('TEST')
    const allContracts = getAllContracts()
    expect(Object.keys(allContracts).length).toEqual(1)
    resetContracts()
    const allContractsAfter = getAllContracts()
    expect(Object.keys(allContractsAfter).length).toEqual(0)
  })
})
