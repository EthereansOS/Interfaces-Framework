import {
  newContract,
  getNetworkElement,
  blockchainCall,
  getLogs,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

async function loadDFO(
  { web3, web3ForLogs, context, networkId, proxyChangedTopic },
  address,
  allAddresses
) {
  allAddresses = allAddresses || []
  allAddresses.push(address)
  const dfo = newContract({ web3 }, context.proxyAbi, address)
  let votingToken

  try {
    let delegates = await web3.eth.call({
      to: document.element.dFO.options.address,
      data: document.element.dFO.methods.getDelegates().encodeABI(),
    })
    try {
      delegates = web3.eth.abi.decodeParameter('address[]', delegates)
    } catch (e) {
      delegates = web3.eth.abi.decodeParameters(
        ['address', 'address', 'address', 'address', 'address', 'address'],
        delegates
      )
    }
    votingToken = delegates[0]
  } catch (e) {
    votingToken = undefined
  }

  if (!votingToken || votingToken === VOID_ETHEREUM_ADDRESS) {
    try {
      votingToken = await blockchainCall(
        { web3, context },
        dfo.methods.getToken
      )
    } catch (e) {}
  }

  try {
    const tokenContract = newContract(
      { web3, web3ForLogs },
      context.votingTokenAbi,
      votingToken
    )

    await blockchainCall({ web3, context }, tokenContract.methods.name)
  } catch (e) {
    votingToken = undefined
  }

  if (!votingToken || votingToken === VOID_ETHEREUM_ADDRESS) {
    const logs = await getLogs(
      { web3, context, web3ForLogs, networkId },
      {
        address,
        topics: [proxyChangedTopic],
        fromBlock: getNetworkElement(
          { context, networkId },
          'deploySearchStart'
        ),
        toBlock: 'latest',
      },
      true
    )
    // This codes assumes that the dfo is always found
    return await loadDFO(
      { web3, web3ForLogs, context, networkId, proxyChangedTopic },
      web3.eth.abi.decodeParameter('address', logs?.[0]?.topics?.[1]),
      allAddresses
    )
  }
  dfo.options.originalAddress = allAddresses[0]
  dfo.options.allAddresses = allAddresses
  try {
    dfo.metadataLink = web3.eth.abi.decodeParameter(
      'string',
      await blockchainCall(
        { web3, context },
        dfo.methods.read,
        'getMetadataLink',
        '0x'
      )
    )
  } catch (e) {}
  return dfo
}

export default loadDFO
