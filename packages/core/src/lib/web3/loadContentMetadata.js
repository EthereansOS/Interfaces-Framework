import blockchainCall from './blockchainCall'

const loadContentMetadata = async (
  { context, web3 },
  tokenId,
  ocelotContract
) => {
  const metadata = await blockchainCall(
    { web3, context },
    ocelotContract.methods.metadata,
    tokenId
  )
  metadata[0] = parseInt(metadata[0])
  metadata[1] = parseInt(metadata[1]) * 2 + 4
  return metadata
}

export default loadContentMetadata
