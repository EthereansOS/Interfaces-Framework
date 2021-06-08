import { VOID_ETHEREUM_ADDRESS } from '../constants'

let allContracts = {}

export const resetContracts = () => {
  allContracts = {}
}

export const newContract = ({ web3 }, abi, address) => {
  let key = web3.utils.sha3(JSON.stringify(abi))
  const contracts = (allContracts[key] = allContracts[key] || {})
  address = address || VOID_ETHEREUM_ADDRESS
  key = address.toLowerCase()
  contracts[key] =
    contracts[key] ||
    new web3.eth.Contract(
      abi,
      address === VOID_ETHEREUM_ADDRESS ? undefined : address
    )
  return contracts[key]
}
