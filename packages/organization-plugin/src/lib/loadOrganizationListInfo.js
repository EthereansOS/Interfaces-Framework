import makeBlockie from 'ethereum-blockies-base64'
import {
  newContract,
  blockchainCall,
  fromDecimals,
  getEthereumPrice,
  toDecimals,
} from '@dfohub/core'

async function loadOrganizationListInfo(environment, organization) {
  const {
    web3,
    context,
    dfoHub,
    dfoHubENSResolver,
    wethAddress,
    uniswapV2Router,
  } = environment

  let votingTokenAddress
  let functionalitiesManagerAddress

  const newElement = { ...organization }
  newElement.walletAddress = newElement.dFO.options.address
  newElement.singleCommunityTokenDollar = '0'

  const ethereumPrice = await getEthereumPrice({ context })

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

  newElement.decimals = await blockchainCall(
    environment,
    newElement.token.methods.decimals
  )

  newElement.totalSupply = await blockchainCall(
    environment,
    newElement.token.methods.totalSupply
  )

  newElement.communityTokens = await blockchainCall(
    { web3, context },
    newElement.token.methods.balanceOf,
    newElement.walletAddress
  )

  try {
    newElement.communityTokensDollar = fromDecimals(
      (
        await blockchainCall(
          { web3, context },
          uniswapV2Router.methods.getAmountsOut,
          toDecimals('1', newElement.decimals),
          [newElement.token.options.address, wethAddress]
        )
      )[1],
      18,
      true
    )
    newElement.singleCommunityTokenDollar = newElement.communityTokensDollar
    newElement.communityTokensDollar =
      parseFloat(fromDecimals(newElement.communityTokens, 18, true)) *
      newElement.communityTokensDollar *
      ethereumPrice
  } catch (e) {
    console.error(e)
  }

  newElement.availableSupply = web3.utils
    .toBN(newElement.totalSupply)
    .sub(web3.utils.toBN(newElement.communityTokens))
    .toString()

  try {
    newElement.unlockedMarketCapDollar =
      parseFloat(newElement.singleCommunityTokenDollar.split(',').join('.')) *
      parseFloat(
        fromDecimals(newElement.availableSupply, newElement.decimals, true)
      )
  } catch (e) {
    console.error(e)
  }
  try {
    newElement.lockedMarketCapDollar =
      parseFloat(newElement.singleCommunityTokenDollar.split(',').join('.')) *
      parseFloat(
        fromDecimals(newElement.communityTokens, newElement.decimals, true)
      )
  } catch (e) {}
  try {
    newElement.totalMarketCapDollar =
      parseFloat(newElement.singleCommunityTokenDollar.split(',').join('.')) *
      parseFloat(
        fromDecimals(newElement.totalSupply, newElement.decimals, true)
      )
  } catch (e) {}

  return newElement
}

export default loadOrganizationListInfo
