import {
  getNetworkElement,
  BLOCK_SEARCH_SIZE,
  DFO_DEPLOYED_EVENT,
  NEW_DFO_DEPLOYED_EVENT,
} from '@dfohub/core'

// Chiama getEventLogs due volte fino a che
// toBlock === window.getNetworkElement('deploySearchStart')
import getDFOLogs from './getDFOLogs'

const getEventLogs = async (
  { dfoHub, web3, web3ForLogs, context, networkId, dfoEvent },
  fromBlock,
  toBlock,
  event,
  topics
) => {
  return getDFOLogs(
    { web3, web3ForLogs, context, networkId, dfoEvent },
    {
      address: dfoHub.dFO.options.allAddresses,
      topics,
      event,
      fromBlock: '' + fromBlock,
      toBlock: '' + toBlock,
    }
  )
}

async function loadDFOList(
  { dfoHub, web3, web3ForLogs, context, networkId, dfoEvent },
  topics,
  toBlock,
  lastBlockNumber
) {
  if (
    toBlock === getNetworkElement({ context, networkId }, 'deploySearchStart')
  ) {
    return []
  }
  const lastEthBlock = await web3.eth.getBlockNumber()
  const lastBlockNumberNew = lastBlockNumber || lastEthBlock
  const toBlockNew = toBlock || lastBlockNumberNew

  let fromBlock = toBlockNew - BLOCK_SEARCH_SIZE
  const startBlock = getNetworkElement(
    { context, networkId },
    'deploySearchStart'
  )
  fromBlock = fromBlock > startBlock ? startBlock : toBlockNew
  // We get all the DFP logs related with the event
  const res = await Promise.all([
    getEventLogs(
      { dfoHub, web3, web3ForLogs, context, networkId, dfoEvent },
      fromBlock,
      toBlockNew,
      NEW_DFO_DEPLOYED_EVENT
    ),
    getEventLogs(
      { dfoHub, web3, web3ForLogs, context, networkId, dfoEvent },
      fromBlock,
      toBlockNew,
      DFO_DEPLOYED_EVENT
    ),
  ])

  const nextList = await loadDFOList(
    { web3, context, networkId },
    topics,
    fromBlock,
    lastBlockNumberNew
  )

  return [...res[0], ...res[1], ...(nextList || [])]
}

export default loadDFOList
