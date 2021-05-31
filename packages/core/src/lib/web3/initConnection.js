import nameHash from 'eth-ens-namehash'
import makeBlockie from 'ethereum-blockies-base64'

import { newContract, resetContracts } from './contracts'
import createWeb3 from './createWeb3'
import getNetworkElement from './getNetworkElement'
import blockchainCall from './blockchainCall'

async function initConnection(environment, onUpdate) {
  const { loadDFO, context } = environment
  let networkId = environment.networkId
  let web3 = environment.web3
  let web3ForLogs = environment.web3ForLogs
  let uniswapV2Factory = environment.uniswapV2Factory
  let dfoHubENSResolver = environment.dfoHubENSResolver
  let uniswapV2Router = environment.uniswapV2Router
  let wethAddress = environment.wethAddress
  let dfoHub = environment.dfoHub
  let walletAddress = environment.walletAddress
  let walletAvatar = environment.walletAvatar
  let proxyChangedTopic = environment.proxyChangedTopic

  let update = false
  if (!networkId || networkId !== parseInt(window.ethereum.chainId)) {
    resetContracts()
    window.ethereum &&
      (window.ethereum.enable = () =>
        window.ethereum.request({ method: 'eth_requestAccounts' }))
    window.ethereum &&
      window.ethereum.autoRefreshOnNetworkChange &&
      (window.ethereum.autoRefreshOnNetworkChange = false)
    window.ethereum &&
      window.ethereum.on &&
      (!window.ethereum._events ||
        !window.ethereum._events.accountsChanged ||
        window.ethereum._events.accountsChanged.length === 0) &&
      window.ethereum.on('accountsChanged', onUpdate)
    window.ethereum &&
      window.ethereum.on &&
      (!window.ethereum._events ||
        !window.ethereum._events.chainChanged ||
        window.ethereum._events.chainChanged.length === 0) &&
      window.ethereum.on('chainChanged', onUpdate)
    // web3 = await createWeb3(context.blockchainConnectionString || window.ethereum);
    web3 = await createWeb3(window.ethereum)
    networkId = await web3.eth.net.getId()
    web3ForLogs = await createWeb3(
      getNetworkElement(
        { context, networkId },
        'blockchainConnectionForLogString'
      ) || web3.currentProvider
    )
    const network = context.ethereumNetwork[networkId]
    if (network === undefined || network === null) {
      return alert('This network is actually not supported!')
    }
    // delete window.tokensList
    // delete window.loadedTokens

    // window.loadOffChainWallets();
    const ENSController = newContract(
      { web3 },
      context.ENSAbi,
      context.ensAddress
    )
    try {
      dfoHubENSResolver = newContract(
        { web3 },
        context.resolverAbi,
        await blockchainCall(
          { web3, context },
          ENSController.methods.resolver,
          nameHash.hash(nameHash.normalize('dfohub.eth'))
        )
      )
    } catch (e) {}
    uniswapV2Factory = newContract(
      { web3 },
      context.uniSwapV2FactoryAbi,
      context.uniSwapV2FactoryAddress
    )
    uniswapV2Router = newContract(
      { web3 },
      context.uniSwapV2RouterAbi,
      context.uniSwapV2RouterAddress
    )
    wethAddress = web3.utils.toChecksumAddress(
      await blockchainCall({ web3, context }, uniswapV2Router.methods.WETH)
    )

    const dfo = await loadDFO(
      { web3, web3ForLogs, context, networkId },
      getNetworkElement({ context, networkId }, 'dfoAddress')
    )

    dfoHub = {
      key: 'DFO',
      dFO: dfo,
      startBlock: getNetworkElement(
        { context, networkId },
        'deploySearchStart'
      ),
    }

    update = true
  }

  const accounts = await web3.eth.getAccounts()
  walletAddress = accounts && accounts.length > 0 ? accounts[0] : null
  walletAvatar = walletAddress ? makeBlockie(walletAddress) : null

  // TODO: fixme
  // Questo c'era sull'originale: https://github.com/EthereansOS/Organizations-Interface/blob/master/assets/scripts/script.js#L243
  // non dobbiamo usare jquery
  // update && $.publish('ethereum/update');
  // $.publish('ethereum/ping');

  return {
    web3,
    networkId,
    web3ForLogs,
    proxyChangedTopic,
    dfoHubENSResolver,
    uniswapV2Factory,
    uniswapV2Router,
    wethAddress,
    dfoHub,
    walletAddress,
    walletAvatar,
    list: {
      DFO: dfoHub,
    },
  }
}

export default initConnection
