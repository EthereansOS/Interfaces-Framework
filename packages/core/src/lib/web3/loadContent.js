import { BASE64_REGEXP, VOID_ETHEREUM_ADDRESS } from '../constants'

import blockchainCall from './blockchainCall'
import { newContract } from './contracts'
import getNetworkElement from './getNetworkElement'
import loadContentMetadata from './loadContentMetadata'

async function loadContent(
  { web3, context, networkId },
  tokenId,
  ocelotAddress,
  raw
) {
  const chains = []
  const ocelot = newContract(
    { web3 },
    context.OcelotAbi,
    !ocelotAddress || ocelotAddress === VOID_ETHEREUM_ADDRESS
      ? getNetworkElement({ context, networkId }, 'defaultOcelotTokenAddress')
      : ocelotAddress
  )
  const metadata = await loadContentMetadata({ context, web3 }, tokenId, ocelot)

  for (let i = 0; i < metadata[0]; i++) {
    const content = await blockchainCall(
      { web3, context },
      ocelot.methods.content,
      tokenId,
      i
    )
    chains.push(i === 0 ? content : content.substring(2))
  }
  let value = chains.join('')
  value = web3.utils.toUtf8(value).trim()
  value = raw ? value : atob(value.substring(value.indexOf(',') + 1))
  const regex = new RegExp(BASE64_REGEXP).exec(value)
  !raw &&
    regex &&
    regex.index === 0 &&
    (value = atob(value.substring(value.indexOf(',') + 1)))
  return value
}

export default loadContent
