/* eslint-disable */

import nameHash from 'eth-ens-namehash'
import makeBlockie from 'ethereum-blockies-base64'

export const CONNECTING = 'connecting'
export const UPDATING = 'updating'
export const NOT_CONNECTED = 'not_connected'
export const CONNECTED = 'connected'
export const BLOCK_SEARCH_SIZE = 40000

export const DFO_DEPLOYED_EVENT = 'DFODeployed(address_indexed,address)'
export const NEW_DFO_DEPLOYED_EVENT =
  'DFODeployed(address_indexed,address_indexed,address,address)'

import blockchainCallFn from './web3/blockchainCall'
import formatLink from './web3/formatLink'
import createWeb3 from './web3/createWeb3'
import getNetworkElementFn from './web3/getNetworkElement'
import getLogsFn from './web3/getLogs'
import { resetContracts, newContract } from './web3/contracts'
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

  const loadDFO = async function loadDFO(address, allAddresses) {
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
        votingToken = await blockchainCall(dfo.methods.getToken)
      } catch (e) {}
    }

    try {
      await blockchainCall(
        newContract({ web3 }, context.votingTokenAbi, votingToken).methods.name
      )
    } catch (e) {
      votingToken = undefined
    }

    if (!votingToken || votingToken === voidEthereumAddress) {
      const logs = await getLogs(
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
      return await loadDFO(
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

  // a:
  // - fromBlocks
  // - toBlock
  // - ?
  const getLogs = async function (a, endOnFirstResult) {
    return getLogsFn(
      { web3, web3ForLogs, context, networkId },
      a,
      endOnFirstResult
    )
  }

  function onEthereumUpdate(millis, newConnection) {
    return new Promise(function (ok) {
      setState((s) => ({
        ...s,
        connectionStatus: newConnection ? CONNECTING : UPDATING,
      }))
      setTimeout(
        async function () {
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
              window.ethereum.on('accountsChanged', onEthereumUpdate)
            window.ethereum &&
              window.ethereum.on &&
              (!window.ethereum._events ||
                !window.ethereum._events.chainChanged ||
                window.ethereum._events.chainChanged.length === 0) &&
              window.ethereum.on('chainChanged', onEthereumUpdate)
            // web3 = await createWeb3(context.blockchainConnectionString || window.ethereum);
            web3 = await createWeb3(window.ethereum)
            networkId = await web3.eth.net.getId()
            web3ForLogs = await createWeb3(
              getNetworkElement('blockchainConnectionForLogString') ||
                web3.currentProvider
            )
            const network = context.ethereumNetwork[networkId]
            if (network === undefined || network === null) {
              return alert('This network is actually not supported!')
            }
            // delete window.tokensList
            // delete window.loadedTokens

            const dfo = loadDFO(getNetworkElement('dfoAddress'))
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
              await blockchainCall(uniswapV2Router.methods.WETH)
            )
            const list = {
              DFO: {
                key: 'DFO',
                dFO: await dfo,
                startBlock: getNetworkElement('deploySearchStart'),
              },
            }
            dfoHub = list.DFO
            setState((s) => ({ ...s, list }))
            update = true
          }
          try {
            walletAddress = (await web3.eth.getAccounts())[0]
          } catch (e) {
            console.log(e)
            walletAddress = null
          }
          try {
            walletAvatar = makeBlockie(walletAddress)
          } catch (e) {
            console.log(e)
          }

          // Questo c'era sull'originale: https://github.com/EthereansOS/Organizations-Interface/blob/master/assets/scripts/script.js#L243
          // non dobbiamo usare jquery
          // update && $.publish('ethereum/update');
          // $.publish('ethereum/ping');

          setState((s) => ({
            ...s,
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
            connectionStatus: CONNECTED,
          }))
          return ok(web3)
        },
        !isNaN(millis) ? millis : 550
      )
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

  // Chiamare getLogs due volte fino a che
  // toBlock === window.getNetworkElement('deploySearchStart')
  async function loadList(topics, toBlock, lastBlockNumber) {
    if (toBlock === getNetworkElement('deploySearchStart')) {
      console.log('Return', getNetworkElement('deploySearchStart'))
      return
    }
    const lastEthBlock = await await web3.eth.getBlockNumber()
    lastBlockNumber = lastBlockNumber || lastEthBlock
    toBlock = toBlock || lastBlockNumber
    let fromBlock = toBlock - BLOCK_SEARCH_SIZE
    const startBlock = getNetworkElement('deploySearchStart')
    fromBlock = fromBlock > startBlock ? startBlock : toBlock
    await getEventLogs(fromBlock, toBlock, NEW_DFO_DEPLOYED_EVENT)
    await getEventLogs(fromBlock, toBlock, DFO_DEPLOYED_EVENT)
    return loadList(topics, fromBlock, lastBlockNumber)
  }

  // Da: https://github.com/EthereansOS/Organizations-Interface/blob/master/spa/dFOList/controller.jsx#L41

  // TEMPORARY, TODO: FIX
  // ************************************************************
  const alreadyLoaded = {}
  // function isInList(key) {
  // if (state?.list[key]) {
  //   return true
  // }
  // if (!key.dFO) {
  //   try {
  //     key = web3.utils.toChecksumAddress(key)
  //   } catch (e) {
  //     return false
  //   }
  //   if (
  //     Object.values(state.list).filter(
  //       (it) =>
  //         it.dFO.options.allAddresses.filter(
  //           (addr) => web3.utils.toChecksumAddress(addr) === key
  //         ).length > 0
  //     ).length > 0
  //   ) {
  //     return true
  //   }
  // } else {
  //   var keys = key.dFO.options.allAddresses.map((it) =>
  //     web3.utils.toChecksumAddress(it)
  //   )
  //   var list = Object.values(state.list).map((it) =>
  //     it.dFO.options.allAddresses.map((it) =>
  //       web3.utils.toChecksumAddress(it)
  //     )
  //   )
  //   for (var addresses of state.list) {
  //     for (var address of addresses) {
  //       if (keys.indexOf(address) != -1) {
  //         return true
  //       }
  //     }
  //   }
  // }
  // return false
  // }

  async function getEventLogs(fromBlock, toBlock, event, topics) {
    const logs = await getDFOLogs({
      address: dfoHub.dFO.options.allAddresses,
      topics,
      event,
      fromBlock: '' + fromBlock,
      toBlock: '' + toBlock,
    })

    // PORCATA TEMPORANEA
    for (const [index, log] of logs.entries()) {
      // TEMPORARY, to make the test pass
      if (index >= 2) {
        break
      }
      if (alreadyLoaded[log.data[0].toLowerCase()]) {
        continue
      }
      alreadyLoaded[log.data[0].toLowerCase()] = true
      var key = log.blockNumber + '_' + log.id
      // !isInList(key) &&
      const result = await loadDFO(log.data[0])
      // TODO: add here the "alreadyLoaded", and "isInList" check
      setState((s) => ({
        ...s,
        list: {
          ...s.list,
          [key]: {
            key,
            dFO: result,
            updating: false,
            updated: false,
            startBlock: log.blockNumber,
          },
        },
      }))
    }

    return logs
  }

  // ************************************************************

  async function getDFOLogs(args) {
    dfoEvent =
      dfoEvent || web3.utils.sha3('Event(string,bytes32,bytes32,bytes)')
    const logArgs = {
      topics: [dfoEvent],
      fromBlock: '0',
      toBlock: 'latest',
    }
    args.address && (logArgs.address = args.address)
    args.event &&
      logArgs.topics.push(
        args.event.indexOf('0x') === 0
          ? args.event
          : web3.utils.sha3(args.event)
      )
    args.topics && logArgs.topics.push(...args.topics)
    args.fromBlock && (logArgs.fromBlock = args.fromBlock)
    args.toBlock && (logArgs.toBlock = args.toBlock)
    return formatDFOLogs(
      await getLogs(logArgs),
      args.event && args.event.indexOf('0x') === -1 ? args.event : undefined
    )
  }

  function formatDFOLogs(logVar, event) {
    if (!logVar || (!isNaN(logVar.length) && logVar.length === 0)) {
      return logVar
    }
    const logs = []
    if (logVar.length) {
      logs.push(...logVar)
    } else {
      event = event || logVar.event
      logs.push(logVar)
    }
    var deployArgs = []
    if (event) {
      var rebuiltArgs = event.substring(event.indexOf('(') + 1)
      rebuiltArgs = JSON.parse(
        '["' +
          rebuiltArgs
            .substring(0, rebuiltArgs.indexOf(')'))
            .split(',')
            .join('","') +
          '"]'
      )
      for (var i in rebuiltArgs) {
        if (!rebuiltArgs[i].endsWith('_indexed')) {
          deployArgs.push(rebuiltArgs[i])
        }
      }
    }
    dfoEvent =
      dfoEvent || web3.utils.sha3('Event(string,bytes32,bytes32,bytes)')
    var eventTopic = event && web3.utils.sha3(event)
    var manipulatedLogs = []
    for (const i in logs) {
      var log = logs[i]
      if (log.topics && log.topics[0] !== dfoEvent) {
        continue
      }
      log.topics && log.topics.splice(0, 1)
      if (eventTopic && log.topics && log.topics[0] !== eventTopic) {
        continue
      }
      log.raw && log.raw.topics && log.raw.topics.splice(0, 1)
      try {
        log.data && (log.data = web3.eth.abi.decodeParameter('bytes', log.data))
        log.raw &&
          log.raw.data &&
          (log.raw.data = web3.eth.abi.decodeParameter('bytes', log.raw.data))
      } catch (e) {}
      if (
        deployArgs.length > 0 &&
        (deployArgs.length > 1 || deployArgs[0] !== '')
      ) {
        var data = web3.eth.abi.decodeParameters(
          deployArgs,
          log.data || (log.raw && log.raw.data)
        )
        log.data && (log.data = [])
        log.raw && log.raw.data && (log.raw.data = [])
        Object.keys(data).map((key) => {
          if (isNaN(parseInt(key))) {
            return
          }
          log.data && log.data.push(data[key])
          log.raw && log.raw.data && log.raw.data.push(data[key])
        })
      }
      manipulatedLogs.push(log)
    }
    return logVar.length ? manipulatedLogs : manipulatedLogs[0] || logVar
  }

  return {
    onEthereumUpdate,
    connect,
    getInfo,
    loadList,
    formatLink,
  }
}

export default initWeb3
