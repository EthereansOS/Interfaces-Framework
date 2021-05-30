const voidEthereumAddress = '0x0000000000000000000000000000000000000000'

let allContracts = {}

export const resetContracts = () => {
  allContracts = {}
}

export const newContract = (web3, abi, address) => {
  let key = web3.utils.sha3(JSON.stringify(abi))
  const contracts = (allContracts[key] = allContracts[key] || {})
  address = address || voidEthereumAddress
  key = address.toLowerCase()
  contracts[key] =
    contracts[key] ||
    new web3.eth.Contract(
      abi,
      address === voidEthereumAddress ? undefined : address
    )
  return contracts[key]
}
