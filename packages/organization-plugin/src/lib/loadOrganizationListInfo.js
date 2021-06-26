import makeBlockie from 'ethereum-blockies-base64'
import { newContract, blockchainCall } from '@dfohub/core'

async function loadOrganizationListInfo(environment, organization) {
  const { web3, context, dfoHub, dfoHubENSResolver } = environment

  let votingTokenAddress
  let functionalitiesManagerAddress

  const newElement = { ...organization }
  newElement.walletAddress = newElement.dFO.options.address

  try {
    let delegates = await web3.eth.call({
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
    functionalitiesManagerAddress = delegates[4]
    newElement.walletAddress = delegates[5]
    newElement.doubleProxyAddress = delegates[6]
  } catch (e) {
    console.log('loadOrganizationListInfo - delegates', e)
  }

  if (!votingTokenAddress) {
    votingTokenAddress = await blockchainCall(
      environment,
      newElement.dFO.methods.getToken
    )
    functionalitiesManagerAddress = await blockchainCall(
      environment,
      newElement.dFO.methods.getMVDFunctionalitiesManagerAddress
    )
    newElement.walletAddress = await blockchainCall(
      environment,
      newElement.dFO.methods.getMVDWalletAddress
    )
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

  newElement.icon = makeBlockie(newElement.dFO.options.address)
  if (newElement !== dfoHub) {
    newElement.ens = await blockchainCall(
      environment,
      dfoHubENSResolver.methods.subdomain,
      newElement.dFO.options.originalAddress
    )
  }

  newElement.ensComplete = newElement.ens
    ? `${newElement.ens}.dfohub.eth`
    : 'dfohub.eth'

  return newElement
}

export default loadOrganizationListInfo
