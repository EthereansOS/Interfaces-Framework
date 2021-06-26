import nameHash from 'eth-ens-namehash'
import { newContract, getNetworkElement, blockchainCall } from '@dfohub/core'

import loadDFO from './loadDFO'

async function initDFO(environment) {
  const { context, networkId, web3, web3ForLogs, proxyChangedTopic } =
    environment

  let dfoHubENSResolver

  // window.loadOffChainWallets();
  const ENSController = newContract(
    { web3 },
    context.ENSAbi,
    context.ensAddress
  )
  try {
    dfoHubENSResolver = newContract(
      { web3 },
      context.resolverAbi,
      await blockchainCall(
        { web3, context },
        ENSController.methods.resolver,
        nameHash.hash(nameHash.normalize('dfohub.eth'))
      )
    )
  } catch (e) {}

  const dfo = await loadDFO(
    { web3, web3ForLogs, context, networkId, proxyChangedTopic },
    getNetworkElement({ context, networkId }, 'dfoAddress')
  )

  const dfoHub = {
    key: 'DFO',
    dFO: dfo,
    startBlock: getNetworkElement({ context, networkId }, 'deploySearchStart'),
  }

  return {
    dfoHub,
    dfoHubENSResolver,
  }
}

export default initDFO
