import makeBlockie from 'ethereum-blockies-base64'

import { newContract } from './contracts'
import formatLink from './formatLink'
import blockchainCall from './blockchainCall'
import refreshBalances from './refreshBalances'

async function getInfo(environment, element) {
  const {
    web3,
    context,
    dfoHub,
    dfoHubENSResolver,
    walletAddress,
    uniswapV2Router,
    wethAddress,
    getState,
    updateElement,
  } = environment

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
    console.log(e)
  }

  if (!votingTokenAddress) {
    votingTokenAddress = await blockchainCall(
      environment,
      newElement.dFO.methods.getToken
    )
    stateHolderAddress = await blockchainCall(
      environment,
      newElement.dFO.methods.getStateHolderAddress
    )
    functionalitiesManagerAddress = await blockchainCall(
      environment,
      newElement.dFO.methods.getMVDFunctionalitiesManagerAddress
    )
    try {
      newElement.walletAddress = await blockchainCall(
        environment,
        newElement.dFO.methods.getMVDWalletAddress
      )
    } catch (e) {}
  }

  if (!newElement.doubleProxyAddress) {
    try {
      newElement.doubleProxyAddress = await blockchainCall(
        environment,
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
    environment,
    newElement.token.methods.name
  )
  newElement.symbol = await blockchainCall(
    environment,
    newElement.token.methods.symbol
  )
  newElement.totalSupply = await blockchainCall(
    environment,
    newElement.token.methods.totalSupply
  )
  try {
    newElement.metadata = await window.AJAXRequest(
      formatLink(
        { context },
        (newElement.metadataLink = web3.eth.abi.decodeParameter(
          'string',
          await blockchainCall(
            environment,
            newElement.dFO.methods.read,
            'getMetadataLink',
            '0x'
          )
        ))
      )
    )
    Object.entries(newElement.metadata).forEach(
      (it) => (element[it[0]] = it[1] || element[it[0]])
    )
  } catch (e) {}
  newElement.decimals = await blockchainCall(
    environment,
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
      environment,
      newElement.functionalitiesManager.methods.getFunctionalitiesAmount
    )
  )
  newElement.lastUpdate = newElement.startBlock
  newElement.minimumBlockNumberForEmergencySurvey = '0'
  newElement.emergencySurveyStaking = '0'

  await refreshBalances(
    {
      web3,
      context,
      dfoHub: newElement.key === 'DFO' ? newElement : getState().list.DFO,
      walletAddress,
      uniswapV2Router,
      wethAddress,
      getState,
      updateElement,
    },
    newElement
  )

  try {
    newElement.minimumBlockNumberForEmergencySurvey =
      web3.eth.abi.decodeParameter(
        'uint256',
        await blockchainCall(
          environment,
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
        environment,
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
        environment,
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
        environment,
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
        environment,
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
        environment,
        newElement.dFO.methods.read,
        'getIndex',
        '0x'
      )
    )
  } catch (e) {}
  try {
    newElement !== dfoHub &&
      (newElement.ens = await blockchainCall(
        environment,
        dfoHubENSResolver.methods.subdomain,
        newElement.dFO.options.originalAddress
      ))
  } catch (e) {}
  newElement.votesHardCap = '0'
  try {
    newElement.votesHardCap = web3.eth.abi.decodeParameter(
      'uint256',
      await blockchainCall(
        environment,
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

  return newElement
}

export default getInfo
