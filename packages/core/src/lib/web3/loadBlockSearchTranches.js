import numberToString from './numberToString'
import getNetworkElement from './getNetworkElement'

async function loadBlockSearchTranches({ web3, context, networkId }) {
  var startBlock = parseInt(
    numberToString(
      getNetworkElement({ context, networkId }, 'deploySearchStart') || '0'
    )
  )
  var endBlock = parseInt(numberToString(await web3.eth.getBlockNumber()))
  var limit = context.blockSearchLimit || 50000
  var toBlock = endBlock
  var fromBlock = endBlock - limit
  fromBlock = fromBlock < startBlock ? startBlock : fromBlock
  var blocks = []
  while (true) {
    blocks.push([numberToString(fromBlock), numberToString(toBlock)])
    if (fromBlock === startBlock) {
      break
    }
    toBlock = fromBlock - 1
    fromBlock = toBlock - limit
    fromBlock = fromBlock < startBlock ? startBlock : fromBlock
  }
  return blocks
}

export default loadBlockSearchTranches
