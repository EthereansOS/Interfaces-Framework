import { VOID_ETHEREUM_ADDRESS } from '../constants'

import { newContract } from './contracts'
import getNetworkElement from './getNetworkElement'
import blockchainCall from './blockchainCall'
import split from './split'

async function mint(
  { web3, context, networkId, ethosEvents },
  inputs,
  ocelotAddress,
  silent,
  firstChunkCallback,
  tokenId,
  start
) {
  const ocelot = newContract(
    { web3 },
    context.OcelotAbi,
    ocelotAddress || !ocelotAddress || ocelotAddress === VOID_ETHEREUM_ADDRESS
      ? getNetworkElement({ context, networkId }, 'defaultOcelotTokenAddress')
      : ocelotAddress
  )
  inputs =
    (typeof inputs).toLowerCase() === 'string'
      ? split({ context }, inputs)
      : inputs
  for (let i = start || 0; i < inputs.length; i++) {
    const input = inputs[i]
    !silent &&
      ethosEvents.publish(
        'message',
        'Minting ' + (i + 1) + ' of ' + inputs.length + ' tokens',
        'info'
      )
    const method =
      ocelot.methods[
        'mint' +
          (i === inputs.length - 1 ? 'AndFinalize' : '') +
          (i === 0 ? '' : '(uint256,bytes)')
      ]
    const args = [method]
    i > 0 && args.push(tokenId)
    args.push(input)
    const txReceipt = await blockchainCall.apply(null, [
      { web3, context },
      ...args,
    ])
    if (!tokenId) {
      tokenId = parseInt(txReceipt.events.Minted.returnValues.tokenId)
      firstChunkCallback && firstChunkCallback(tokenId)
    }
  }
  return tokenId
}

export default mint
