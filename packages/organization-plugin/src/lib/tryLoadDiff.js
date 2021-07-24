import { blockchainCall, loadContent } from '@dfohub/core'

async function tryLoadDiff(
  { context, web3, networkId },
  organization,
  proposal
) {
  if (!proposal.replaces || proposal.replacesCode !== undefined) {
    return
  }

  try {
    var sourceLocationId = proposal.replacedCodeSourceLocationId
    var sourceLocation = proposal.replacedCodeSourceLocation
    if (!proposal.terminated) {
      const functionalityData = await blockchainCall(
        { web3, context },
        organization.functionalitiesManager.methods.getFunctionalityData,
        proposal.replaces
      )
      sourceLocation = functionalityData[3]
      sourceLocationId = functionalityData[4]
    } else {
      const transactionReceipt = await web3.eth.getTransactionReceipt(
        proposal.terminationTransactionHash
      )
      for (let log of transactionReceipt.logs) {
        if (
          log.topics[0].toLowerCase() !==
          context.functionalitySetTopic.toLowerCase()
        ) {
          continue
        }
        var data = web3.eth.abi.decodeParameters(
          [
            'string',
            'string',
            'address',
            'uint256',
            'bool',
            'string',
            'bool',
            'bool',
          ],
          log.data
        )
        sourceLocation = data[2]
        sourceLocationId = data[3]
        break
      }
    }

    let replacesCode
    try {
      replacesCode = await loadContent(
        { web3, context, networkId },
        sourceLocationId,
        sourceLocation
      )
    } catch (ex) {
      replacesCode = null
    }

    return { replacesCode }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default tryLoadDiff
