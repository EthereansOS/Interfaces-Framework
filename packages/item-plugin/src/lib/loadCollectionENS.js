import { blockchainCall, getLogs } from '@ethereansos/interfaces-core'
async function loadCollectionENS(
  { web3, web3ForLogs, context, networkId, contracts },
  item
) {
  if (item.ens !== undefined && item.ens !== null) {
    return
  }
  const info = {}
  info.ens = ''
  try {
    const address = await blockchainCall(
      { web3, context },
      contracts.ethItemOrchestrator.methods.ENSController
    )
    const ensEvent = 'ENSAttached(address,string,string)'
    const topics = [
      web3.utils.sha3(ensEvent),
      web3.eth.abi.encodeParameter('address', item.address),
    ]

    const logs = await getLogs(
      { web3, web3ForLogs, context, networkId },
      {
        address,
        topics,
      },
      true
    )
    for (const log of logs) {
      const subdomain = web3.eth.abi.decodeParameter('string', log.data)
      info.ens = `${subdomain}.${context.ensDomainName}`
    }
  } catch (e) {
    console.error('loadCollectionENS', e)
  }

  return info
}

export default loadCollectionENS
