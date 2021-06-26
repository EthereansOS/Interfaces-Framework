import { newContract } from './contracts'
const globalCollections = []

function packCollection({ context, web3 }, address, category, modelAddress) {
  var abi = context[category]
  var contract = newContract({ web3 }, abi, address)
  category = category.substring(0, category.length - 3)
  var key = address
  var collection = globalCollections.filter((it) => it.key === key)[0]
  !collection &&
    globalCollections.push(
      (collection = {
        key,
        address,
        modelAddress,
        category,
        contract,
      })
    )
  return collection
}

export default packCollection
