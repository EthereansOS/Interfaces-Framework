import {
  newContract,
  formatLink,
  extractHTMLDescription,
  blockchainCall,
  getLogs,
} from '@dfohub/core'

async function loadSurvey(
  { context, web3, web3ForLogs, networkId, walletAddress },
  organization,
  survey,
  currentBlock
) {
  const set = await getLogs(
    { web3, web3ForLogs, context, networkId },
    {
      address: organization.dFO.options.allAddresses,
      topics: [
        context.proposalSetTopic,
        web3.eth.abi.encodeParameter('address', survey.address),
      ],
      fromBlock: organization.startBlock,
      toBlock: currentBlock,
    }
  )

  survey.checkedTimes = set.length
  survey.terminated = set.length > 0
  set.length > 0 && (survey.terminationData = set[0])

  const checkedTimes = await getLogs(
    { web3, web3ForLogs, context, networkId },
    {
      address: organization.dFO.options.allAddresses,
      topics: [
        context.proposalCheckedTopic,
        web3.eth.abi.encodeParameter('address', survey.address),
      ],
      fromBlock: organization.startBlock,
      toBlock: currentBlock,
    }
  )

  survey.checkedTimes = checkedTimes.length
  checkedTimes.length > 0 &&
    (survey.lastCheckedBlock =
      checkedTimes[checkedTimes.length - 1].blockNumber)
  !survey.checkedTimes && survey.terminated && (survey.checkedTimes = 1)

  try {
    if (!survey.contract) {
      survey.contract = newContract(
        { web3 },
        context.propsalAbi,
        survey.address
      )
      survey.contract.data = survey

      let data = await blockchainCall(
        { web3, context },
        survey.contract.methods.toJSON
      )

      data = JSON.parse(
        data
          .split('"returnAbiParametersArray":,')
          .join('"returnAbiParametersArray":[],')
      )

      survey = { ...survey, ...data }
    }

    try {
      survey.metadataLink = formatLink(
        { context },
        await blockchainCall(
          { web3, context },
          newContract({ web3 }, context.IFunctionalityAbi, survey.location)
            .methods.getMetadataLink
        )
      )

      const res = await fetch(survey.metadataLink)
      survey.metadata = await res.json()

      Object.entries(survey.metadata).forEach((it) => (survey[it[0]] = it[1]))

      survey.description = extractHTMLDescription(
        { context },
        survey.description || survey.code,
        true
      )
    } catch (e) {}

    survey.surveyEnd = survey.endBlock <= currentBlock + 1

    const allVotes = await blockchainCall(
      { web3, context },
      survey.contract.methods.getVotes
    )

    survey.accepted = web3.utils.toBN(allVotes[0]).toString()
    survey.refused = web3.utils.toBN(allVotes[1]).toString()
    survey.allVotes = web3.utils
      .toBN(allVotes[0])
      .add(web3.utils.toBN(allVotes[1]))
      .toString()

    const myVotes = !walletAddress
      ? ['0', '0']
      : await blockchainCall(
          { web3, context },
          survey.contract.methods.getVote,
          walletAddress
        )

    survey.myAccepts = web3.utils.toBN(myVotes[0]).toString()
    survey.myRefuses = web3.utils.toBN(myVotes[1]).toString()
    survey.myVotes = web3.utils
      .toBN(myVotes[0])
      .add(web3.utils.toBN(myVotes[1]))
      .toString()

    if (!survey.surveyEnd || !survey.terminationData) {
      survey.leading = false
      try {
        survey.leading = await blockchainCall(
          { web3, context },
          organization.dFO.methods.read,
          'checkSurveyResult',
          web3.eth.abi.encodeParameter('address', survey.address)
        )

        survey.leading = web3.eth.abi.decodeParameter('bool', survey.leading)
        survey.hardCapReached = await blockchainCall(
          { web3, context },
          survey.contract.methods.isVotesHardCapReached
        )
      } catch (e) {}
    }
    if (survey.checkedTimes > 0) {
      survey.terminationData &&
        (survey.terminationTransactionHash =
          survey.terminationData.transactionHash)
      survey.terminationData &&
        (survey.result = web3.eth.abi.decodeParameter(
          'bool',
          survey.terminationData.data
        ))
      survey.terminationData &&
        (survey.resultBlock = survey.terminationData.blockNumber)
      if (survey.withdrawed === undefined && parseInt(survey.myVotes) > 0) {
        survey.withdrawed = true
        if (
          walletAddress &&
          survey.raisedBy === organization.dFO.options.address.toLowerCase()
        ) {
          const transfer = await getLogs(
            { web3, web3ForLogs, context, networkId },
            {
              address: organization.token.options.address,
              topics: [
                context.transferTopic,
                web3.eth.abi.encodeParameter('address', survey.address),
                web3.eth.abi.encodeParameter('address', walletAddress),
              ],
              fromBlock: survey.startBlock,
            }
          )

          survey.withdrawed = transfer.length > 0
        }
      }
    }
    return survey
  } catch (e) {
    console.error(e)
  }
}

export default loadSurvey
