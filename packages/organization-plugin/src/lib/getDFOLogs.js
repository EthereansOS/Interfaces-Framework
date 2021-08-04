// Get the DFO event setting as topic `dfoEvent`.
import { getLogs } from '@ethereansos/interfaces-core'

import formatDFOLogs from './formatDFOLogs'

const getDFOLogs = async (
  { web3, web3ForLogs, context, networkId, dfoEvent },
  args
) => {
  const event =
    dfoEvent || web3.utils.sha3('Event(string,bytes32,bytes32,bytes)')
  const logArgs = {
    topics: [event],
    fromBlock: '0',
    toBlock: 'latest',
  }
  // if there is an address, set it
  args.address && (logArgs.address = args.address)
  args.event &&
    logArgs.topics.push(
      args.event.indexOf('0x') === 0 ? args.event : web3.utils.sha3(args.event)
    )
  args.topics && logArgs.topics.push(...args.topics)
  args.fromBlock && (logArgs.fromBlock = args.fromBlock)
  args.toBlock && (logArgs.toBlock = args.toBlock)
  const logs = await getLogs({ web3, web3ForLogs, context, networkId }, logArgs)
  const formattedLogs = formatDFOLogs(
    { dfoEvent, web3 },
    logs,
    args.event && args.event.indexOf('0x') === -1 ? args.event : undefined
  )
  return formattedLogs
}

export default getDFOLogs
