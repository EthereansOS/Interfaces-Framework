import makeBlockie from 'ethereum-blockies-base64'
import {
  newContract,
  formatLink,
  blockchainCall,
  refreshBalances,
} from '@ethereansos/interfaces-core'

async function getInfo(
  {
    web3,
    context,
    dfoHub,
    dfoHubENSResolver,
    walletAddress,
    uniswapV2Router,
    wethAddress,
  },
  element
) {
  let votingTokenAddress
  let stateHolderAddress
  let functionalitiesManagerAddress

  const newElement = { ...element }
  newElement.walletAddress = newElement.dFO.options.address

  try {
    var delegates = await web3.eth.call({
      to: newElement.dFO.options.address,
      data: newElement.dFO.methods.getDelegates().encodeABI(),
    })
    try {
      delegates = web3.eth.abi.decodeParameter('address[]', delegates)
    } catch (e) {
      delegates = web3.eth.abi.decodeParameters(
        ['address', 'address', 'address', 'address', 'address', 'address'],
        delegates
      )
    }
    votingTokenAddress = delegates[0]
    stateHolderAddress = delegates[2]
    functionalitiesManagerAddress = delegates[4]
    newElement.walletAddress = delegates[5]
    newElement.doubleProxyAddress = delegates[6]
  } catch (e) {
    console.log('getInfo - delegates', e)
  }

  if (!votingTokenAddress) {
    votingTokenAddress = await blockchainCall(
      { web3, context },
      newElement.dFO.methods.getToken
    )
    stateHolderAddress = await blockchainCall(
      { web3, context },
      newElement.dFO.methods.getStateHolderAddress
    )
    functionalitiesManagerAddress = await blockchainCall(
      { web3, context },
      newElement.dFO.methods.getMVDFunctionalitiesManagerAddress
    )
    try {
      newElement.walletAddress = await blockchainCall(
        { web3, context },
        newElement.dFO.methods.getMVDWalletAddress
      )
    } catch (e) {}
  }

  if (!newElement.doubleProxyAddress) {
    try {
      newElement.doubleProxyAddress = await blockchainCall(
        { web3, context },
        newElement.dFO.methods.getDoubleProxyAddress
      )
    } catch (e) {}
  }

  newElement.token = newContract(
    { web3 },
    context.votingTokenAbi,
    votingTokenAddress
  )
  newElement.name = await blockchainCall(
    { web3, context },
    newElement.token.methods.name
  )
  newElement.symbol = await blockchainCall(
    { web3, context },
    newElement.token.methods.symbol
  )
  newElement.totalSupply = await blockchainCall(
    { web3, context },
    newElement.token.methods.totalSupply
  )

  try {
    newElement.metadataLink = web3.eth.abi.decodeParameter(
      'string',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getMetadataLink',
        '0x'
      )
    )

    newElement.metadata = await (
      await fetch(formatLink({ context }, newElement.metadataLink))
    ).json()
    Object.entries(newElement.metadata).forEach(
      (it) => (element[it[0]] = it[1] || element[it[0]])
    )
  } catch (e) {
    console.log('error fetching metadata', e)
  }

  newElement.decimals = await blockchainCall(
    { web3, context },
    newElement.token.methods.decimals
  )
  newElement.stateHolder = newContract(
    { web3 },
    context.stateHolderAbi,
    stateHolderAddress
  )
  newElement.functionalitiesManager = newContract(
    { web3 },
    context.functionalitiesManagerAbi,
    functionalitiesManagerAddress
  )
  newElement.functionalitiesAmount = parseInt(
    await blockchainCall(
      { web3, context },
      newElement.functionalitiesManager.methods.getFunctionalitiesAmount
    )
  )
  newElement.lastUpdate = newElement.startBlock
  newElement.minimumBlockNumberForEmergencySurvey = '0'
  newElement.emergencySurveyStaking = '0'

  try {
    await refreshBalances(
      {
        web3,
        context,
        // we have the following ternary because the external "dfoHub"
        // doesn't yet contain the walletAddress for example
        // since it's updated after this function is executed
        dfoHub: newElement.key === 'DFO' ? newElement : dfoHub,
        walletAddress,
        uniswapV2Router,
        wethAddress,
      },
      newElement
    )
  } catch (e) {
    console.log('error refreshingBalances', e)
  }

  try {
    newElement.minimumBlockNumberForEmergencySurvey =
      web3.eth.abi.decodeParameter(
        'uint256',
        await blockchainCall(
          { web3, context },
          newElement.dFO.methods.read,
          'getMinimumBlockNumberForEmergencySurvey',
          '0x'
        )
      ) || '0'
    newElement.emergencySurveyStaking =
      web3.eth.abi.decodeParameter(
        'uint256',
        await blockchainCall(
          newElement.dFO.methods.read,
          'getEmergencySurveyStaking',
          '0x'
        )
      ) || '0'
  } catch (e) {}
  try {
    newElement.quorum = web3.eth.abi.decodeParameter(
      'uint256',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getQuorum',
        '0x'
      )
    )
  } catch (e) {
    newElement.quorum = '0'
  }
  try {
    newElement.surveySingleReward = web3.eth.abi.decodeParameter(
      'uint256',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getSurveySingleReward',
        '0x'
      )
    )
  } catch (e) {
    newElement.surveySingleReward = '0'
  }
  try {
    newElement.minimumStaking = web3.eth.abi.decodeParameter(
      'uint256',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getMinimumStaking',
        '0x'
      )
    )
  } catch (e) {
    newElement.minimumStaking = '0'
  }
  newElement.icon = makeBlockie(newElement.dFO.options.address)
  try {
    newElement.link = web3.eth.abi.decodeParameter(
      'string',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getLink',
        '0x'
      )
    )
  } catch (e) {}
  try {
    newElement.index = web3.eth.abi.decodeParameter(
      'uint256',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getIndex',
        '0x'
      )
    )
  } catch (e) {}
  try {
    newElement !== dfoHub &&
      (newElement.ens = await blockchainCall(
        { web3, context },
        dfoHubENSResolver.methods.subdomain,
        newElement.dFO.options.originalAddress
      ))
  } catch (e) {}
  newElement.votesHardCap = '0'
  try {
    newElement.votesHardCap = web3.eth.abi.decodeParameter(
      'uint256',
      await blockchainCall(
        { web3, context },
        newElement.dFO.methods.read,
        'getVotesHardCap',
        '0x'
      )
    )
  } catch (e) {}
  newElement.ens = newElement.ens || ''
  newElement.ensComplete = newElement.ens + '.dfohub.eth'
  newElement.ensComplete.indexOf('.') === 0 &&
    (newElement.ensComplete = newElement.ensComplete.substring(1))

  const blocksCall = await blockchainCall(
    { web3, context },
    newElement.dFO.methods.read,
    'getMinimumBlockNumberForSurvey',
    '0x'
  )

  newElement.blocks = web3.eth.abi.decodeParameters(['uint256'], blocksCall)[0]

  return newElement
}

export default getInfo
