/* eslint-disable */

import nameHash from 'eth-ens-namehash'
import makeBlockie from 'ethereum-blockies-base64'

export const CONNECTING = 'connecting'
export const UPDATING = 'updating'
export const NOT_CONNECTED = 'not_connected'
export const CONNECTED = 'connected'

import blockchainCallFn from './web3/blockchainCall'
import formatLink from './web3/formatLink'
import getNetworkElementFn from './web3/getNetworkElement'
import initConnectionFn from './web3/initConnection'
import getLogsFn from './web3/getLogs'
import { newContract } from './web3/contracts'
import getInfoFn from './web3/getInfo'

function initWeb3(context, setState) {
  const voidEthereumAddress = '0x0000000000000000000000000000000000000000'

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
  let dfoEvent = null

  const loadDFOFn = async function loadDFOFn(
    { web3, web3ForLogs, context, networkId },
    address,
    allAddresses
  ) {
    allAddresses = allAddresses || []
    allAddresses.push(address)
    const dfo = newContract({ web3 }, context.proxyAbi, address)
    let votingToken

    try {
      let delegates = await web3.eth.call({
        to: document.element.dFO.options.address,
        data: document.element.dFO.methods.getDelegates().encodeABI(),
      })
      try {
        delegates = web3.eth.abi.decodeParameter('address[]', delegates)
      } catch (e) {
        delegates = web3.eth.abi.decodeParameters(
          ['address', 'address', 'address', 'address', 'address', 'address'],
          delegates
        )
      }
      votingToken = delegates[0]
    } catch (e) {
      votingToken = undefined
    }

    if (!votingToken || votingToken === voidEthereumAddress) {
      try {
        votingToken = await blockchainCallFn(
          { web3, context },
          dfo.methods.getToken
        )
      } catch (e) {}
    }

    try {
      const tokenContract = newContract(
        { web3, web3ForLogs },
        context.votingTokenAbi,
        votingToken
      )

      await blockchainCallFn({ web3, context }, tokenContract.methods.name)
    } catch (e) {
      votingToken = undefined
    }

    if (!votingToken || votingToken === voidEthereumAddress) {
      const logs = await getLogsFn(
        { web3, context, web3ForLogs, networkId },
        {
          address,
          topics: [
            (proxyChangedTopic =
              proxyChangedTopic || web3.utils.sha3('ProxyChanged(address)')),
          ],
          fromBlock: getNetworkElement('deploySearchStart'),
          toBlock: 'latest',
        },
        true
      )
      // This codes assumes that the dfo is always found
      return await loadDFOFn(
        { web3, web3ForLogs, context, networkId },
        web3.eth.abi.decodeParameter('address', logs[0].topics[1]),
        allAddresses
      )
    }
    dfo.options.originalAddress = allAddresses[0]
    dfo.options.allAddresses = allAddresses
    try {
      dfo.metadataLink = web3.eth.abi.decodeParameter(
        'string',
        await blockchainCall(dfo.methods.read, 'getMetadataLink', '0x')
      )
    } catch (e) {}
    return dfo
  }

  const loadDFO = async function (address, allAddresses) {
    return loadDFOFn(
      { web3, web3ForLogs, context, networkId },
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

  function onEthereumUpdate(millis, newConnection) {
    return new Promise(async function (resolve) {
      setState((s) => ({
        ...s,
        connectionStatus: newConnection ? CONNECTING : UPDATING,
      }))

      const newState = await initConnectionFn(
        {
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
          loadDFOFn,
          context,
        },
        onEthereumUpdate
      )

      web3 = newState.web3
      networkId = newState.networkId
      web3ForLogs = newState.web3ForLogs
      proxyChangedTopic = newState.proxyChangedTopic
      dfoHubENSResolver = newState.dfoHubENSResolver
      uniswapV2Factory = newState.uniswapV2Factory
      uniswapV2Router = newState.uniswapV2Router
      wethAddress = newState.wethAddress
      dfoHub = newState.dfoHub
      walletAddress = newState.walletAddress
      walletAvatar = newState.walletAvatar

      // TODO FIx the list init
      setState((s = {}) => ({
        ...s,
        ...newState,
        list: !s.list || !Object.keys(s.list).length ? { DFO: dfoHub } : s.list,
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

  // This updates the element info reading from the blockchain
  async function getInfo(element) {
    return getInfoFn(
      {
        web3,
        web3ForLogs,
        dfoHub,
        dfoHubENSResolver,
        context,
      },
      element
    )
  }

  async function connect(millis = 0) {
    const result = await onEthereumUpdate(millis, true)
    return result
  }

  return {
    onEthereumUpdate,
    connect,
    getInfo,
    formatLink,
    getLogs,
    loadDFO,
    getNetworkElement,
  }
}

export default initWeb3
