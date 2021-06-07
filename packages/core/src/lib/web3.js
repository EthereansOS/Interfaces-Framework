/* eslint-disable */
export const CONNECTING = 'connecting'
export const UPDATING = 'updating'
export const NOT_CONNECTED = 'not_connected'
export const CONNECTED = 'connected'

import blockchainCallFn from './web3/blockchainCall'
import formatLink from './web3/formatLink'
import getNetworkElementFn from './web3/getNetworkElement'
import initConnectionFn from './web3/initConnection'
import initDFOFn from './web3/initDFO'
import getLogsFn from './web3/getLogs'
import loadDFOFn from './web3/loadDFO'
import getInfoFn from './web3/getInfo'
import refreshBalancesFn from './web3/refreshBalances'

function initWeb3(context, setState, getState) {
  let web3
  let networkId
  let web3ForLogs
  // This is a map with all the contracts
  let proxyChangedTopic
  let dfoHubENSResolver = null
  let uniswapV2Factory = null
  let uniswapV2Router = null
  let wethAddress = null
  let dfoHub = null
  let walletAddress = null
  let walletAvatar = null

  const loadDFO = async function (address, allAddresses) {
    return loadDFOFn(
      { web3, web3ForLogs, context, networkId, proxyChangedTopic },
      address,
      allAddresses
    )
  }

  const getLogs = async function (a, endOnFirstResult) {
    return getLogsFn(
      { web3, web3ForLogs, context, networkId },
      a,
      endOnFirstResult
    )
  }

  function onEthereumUpdate(newConnection) {
    return new Promise(async function (resolve) {
      setState((s) => ({
        ...s,
        connectionStatus: newConnection ? CONNECTING : UPDATING,
      }))

      const newState = await initConnectionFn(
        {
          web3,
          web3ForLogs,
          networkId,
          proxyChangedTopic,
          uniswapV2Factory,
          uniswapV2Router,
          wethAddress,
          walletAddress,
          walletAvatar,
          context,
        },
        onEthereumUpdate
      )

      web3 = newState.web3
      networkId = newState.networkId
      web3ForLogs = newState.web3ForLogs
      proxyChangedTopic = newState.proxyChangedTopic
      uniswapV2Factory = newState.uniswapV2Factory
      uniswapV2Router = newState.uniswapV2Router
      wethAddress = newState.wethAddress
      walletAddress = newState.walletAddress
      walletAvatar = newState.walletAvatar

      // dfoHubENSResolver = newState.dfoHubENSResolver
      // dfoHub = newState.dfoHub
      // TODO FIx the list init
      setState((s = {}) => ({
        ...s,
        ...newState,
        // list: !s.list || !Object.keys(s.list).length ? { DFO: dfoHub } : s.list,
        connectionStatus: CONNECTED,
      }))
      return resolve(newState.web3)
    })
  }

  function getNetworkElement(element) {
    return getNetworkElementFn({ context, networkId }, element)
  }

  async function blockchainCall(value, oldCall) {
    return blockchainCallFn({ web3, context }, value, oldCall)
  }

  async function refreshBalances(element, silent) {
    return refreshBalancesFn(
      {
        web3,
        context,
        dfoHub,
        walletAddress,
        wethAddress,
        getState,
        uniswapV2Router,
      },
      element,
      silent
    )
  }

  // This updates the element info reading from the blockchain
  async function getInfo(element) {
    return getInfoFn(
      {
        web3,
        web3ForLogs,
        dfoHub,
        dfoHubENSResolver,
        context,
        walletAddress,
        uniswapV2Router,
        wethAddress,
        getState,
      },
      element
    )
  }

  async function connect() {
    const result = await onEthereumUpdate(true)
    return result
  }

  async function initDFO() {
    const result = await initDFOFn({
      web3,
      networkId,
      web3ForLogs,
      proxyChangedTopic,
      uniswapV2Factory,
      uniswapV2Router,
      wethAddress,
      dfoHubENSResolver,
      dfoHub,
      walletAddress,
      walletAvatar,
      loadDFOFn,
      context,
    })

    return result
  }

  return {
    onEthereumUpdate,
    connect,
    initDFO,
    getInfo,
    formatLink,
    getLogs,
    loadDFO,
    refreshBalances,
    getNetworkElement,
  }
}

export default initWeb3
