import { VOID_ETHEREUM_ADDRESS } from '../constants'

let allContracts = {}

export const resetContracts = () => {
  allContracts = {}
}

export const newContract = ({ web3 }, abi, address = VOID_ETHEREUM_ADDRESS) => {
  const abiKey = web3.utils.sha3(JSON.stringify(abi))
  const contracts = (allContracts[abiKey] = allContracts[abiKey] || {})
  const key = address.toLowerCase()
  contracts[key] =
    contracts[key] ||
    new web3.eth.Contract(
      abi,
      address === VOID_ETHEREUM_ADDRESS ? undefined : address
    )
  return contracts[key]
}

export const getAllContracts = () => allContracts
