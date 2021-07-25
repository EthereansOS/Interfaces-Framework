import { blockchainCall, sendGeneratedProposal } from '@dfohub/core'

import validateDFOMetadata from './validateDFOMetadata'

async function proposeNewMetadataLink(
  { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
  element,
  metadata,
  noValidation
) {
  var metadataLink = !noValidation
    ? await validateDFOMetadata({ ipfsHttpClient, context }, metadata)
    : null
  var originalMetadataLink = null
  try {
    originalMetadataLink = await blockchainCall(
      { web3, context },
      element.dFO.methods.read,
      'getMetadataLink',
      '0x'
    )
    originalMetadataLink = web3.eth.abi.decodeParameter(
      'string',
      originalMetadataLink
    )
  } catch (e) {}
  if (originalMetadataLink === metadataLink) {
    return
  }
  var descriptions = [
    'DFO Hub - Utilities - Get Metadata Link',
    'The metadata located at this link contains all info about the DFO like name, short description, discussion link and many other info.',
  ]
  var updates = !metadataLink
    ? ['Clearing Votes Hard Cap']
    : ['Setting metadata link to ' + metadataLink]
  originalMetadataLink && descriptions.push(updates[0])
  var template = !metadataLink
    ? undefined
    : JSON.parse(
        JSON.stringify(context.simpleValueProposalTemplate)
          .split('type')
          .join('string memory')
          .split('value')
          .join('\\"' + metadataLink + '\\"')
      )
  return sendGeneratedProposal(
    { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
    element,
    {
      title: updates[0],
      functionalityName: metadataLink ? 'getMetadataLink' : '',
      functionalityMethodSignature: metadataLink ? 'getValue()' : '',
      functionalitySubmitable: false,
      functionalityReplace: originalMetadataLink ? 'getMetadataLink' : '',
      functionalityOutputParameters: metadataLink ? '["string"]' : '',
    },
    template,
    undefined,
    descriptions,
    updates
  )
}

export default proposeNewMetadataLink
