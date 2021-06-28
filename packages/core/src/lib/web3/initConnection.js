import makeBlockie from 'ethereum-blockies-base64'

import { newContract, resetContracts } from './contracts'
import createWeb3 from './createWeb3'
import getNetworkElement from './getNetworkElement'
import blockchainCall from './blockchainCall'

async function initConnection(environment, onUpdate) {
  const { context } = environment
  let networkId = environment.networkId
  let web3 = environment.web3
  let web3ForLogs = environment.web3ForLogs
  let uniswapV2Factory = environment.uniswapV2Factory
  let uniswapV2Router = environment.uniswapV2Router
  let wethAddress = environment.wethAddress
  let walletAddress = environment.walletAddress
  let walletAvatar = environment.walletAvatar
  let proxyChangedTopic = environment.proxyChangedTopic

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
    //
    // window.loadOffChainWallets();

    if (context.uniSwapV2FactoryAbi && context.uniSwapV2FactoryAddress) {
      uniswapV2Factory = newContract(
        { web3 },
        context.uniSwapV2FactoryAbi,
        context.uniSwapV2FactoryAddress
      )
    }

    if (context.uniSwapV2RouterAbi && context.uniSwapV2RouterAddress) {
      uniswapV2Router = newContract(
        { web3 },
        context.uniSwapV2RouterAbi,
        context.uniSwapV2RouterAddress
      )
      const callResult = await blockchainCall(
        { web3, context },
        uniswapV2Router.methods.WETH
      )
      wethAddress = web3.utils.toChecksumAddress(callResult)
    }

    proxyChangedTopic =
      proxyChangedTopic || web3.utils.sha3('ProxyChanged(address)')
  }

  await window.ethereum.enable()
  const accounts = await web3.eth.getAccounts()
  walletAddress = accounts && accounts.length > 0 ? accounts[0] : null
  walletAvatar = walletAddress ? makeBlockie(walletAddress) : null

  return {
    web3,
    networkId,
    web3ForLogs,
    proxyChangedTopic,
    uniswapV2Factory,
    uniswapV2Router,
    wethAddress,
    walletAddress,
    walletAvatar,
  }
}

export default initConnection
