import nameHash from 'eth-ens-namehash'
import Web3 from 'web3'
import makeBlockie from 'ethereum-blockies-base64'

export const CONNECTING = 'connecting'
export const UPDATING = 'updating'
export const NOT_CONNECTED = 'not_connected'
export const CONNECTED = 'connected'

function initWeb3(context, setState) {
  const voidEthereumAddress = '0x0000000000000000000000000000000000000000'

  let web3
  let networkId
  let web3ForLogs
  // This is a map with all the contracts
  let allContracts = {}
  let proxyChangedTopic
  let dfoHubENSResolver = null
  let uniswapV2Factory = null
  let uniswapV2Router = null
  let wethAddress = null
  let dfoHub = null
  let walletAddress = null
  let walletAvatar = null

  // Creates a new contract object from the `abi` and the address
  // ABI is the interface.
  const newContract = (abi, address) => {
    let key = web3.utils.sha3(JSON.stringify(abi))
    const contracts = (allContracts[key] = allContracts[key] || {})
    address = address || voidEthereumAddress
    key = address.toLowerCase()
    contracts[key] =
      contracts[key] ||
      new web3.eth.Contract(
        abi,
        address === voidEthereumAddress ? undefined : address
      )
    return contracts[key]
  }

  const loadDFO = async function loadDFO(address, allAddresses) {
    allAddresses = allAddresses || []
    allAddresses.push(address)
    const dfo = newContract(context.proxyAbi, address)
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
        newContract(context.votingTokenAbi, votingToken).methods.name
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

  const getLogs = async function (a, endOnFirstResult) {
    const args = JSON.parse(JSON.stringify(a))
    const logs = []
    args.fromBlock =
      args.fromBlock || getNetworkElement('deploySearchStart') + ''
    args.toBlock = args.toBlock || (await web3.eth.getBlockNumber()) + ''
    const to = parseInt(args.toBlock)
    const fillWithWeb3Logs = async function (logs, args) {
      if (web3.currentProvider === web3ForLogs.currentProvider) {
        return logs
      }
      const newArgs = {}
      Object.entries(args).forEach((entry) => (newArgs[entry[0]] = entry[1]))
      newArgs.fromBlock = web3.startBlock
      newArgs.toBlock = 'latest'
      logs.push(...(await web3.eth.getPastLogs(newArgs)))
      return logs
    }
    while (isNaN(to) || parseInt(args.fromBlock) <= to) {
      let newTo = parseInt(args.fromBlock) + context.blockSearchSection
      newTo = newTo <= to ? newTo : to
      args.toBlock = isNaN(newTo) ? args.toBlock : newTo + ''
      logs.push(...(await web3ForLogs.eth.getPastLogs(args)))
      if (isNaN(to) || (logs.length > 0 && endOnFirstResult === true)) {
        return await fillWithWeb3Logs(logs, args)
      }
      args.fromBlock = parseInt(args.toBlock) + 1 + ''
    }
    return await fillWithWeb3Logs(logs, args)
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
            allContracts = {}
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
              context.ENSAbi,
              context.ensAddress
            )
            try {
              dfoHubENSResolver = newContract(
                context.resolverAbi,
                await blockchainCall(
                  ENSController.methods.resolver,
                  nameHash.hash(nameHash.normalize('dfohub.eth'))
                )
              )
            } catch (e) {}
            uniswapV2Factory = newContract(
              context.uniSwapV2FactoryAbi,
              context.uniSwapV2FactoryAddress
            )
            uniswapV2Router = newContract(
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
          if (walletAddress) {
            try {
              walletAvatar = makeBlockie(walletAddress)
            } catch (e) {
              console.log(e)
            }
          }
          setState((s) => ({
            ...s,
            web3,
            networkId,
            web3ForLogs,
            allContracts,
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

  async function createWeb3(connectionProvider) {
    const web3 = new Web3(connectionProvider)
    web3.currentProvider.setMaxListeners &&
      web3.currentProvider.setMaxListeners(0)
    web3.eth.transactionBlockTimeout = 999999999
    web3.eth.transactionPollingTimeout = new Date().getTime()
    web3.startBlock = await web3.eth.getBlockNumber()
    return web3
  }

  const getNetworkElement = function getNetworkElement(element) {
    const network = context.ethereumNetwork[networkId]
    if (network === undefined || network === null) {
      return
    }
    return context[element + network]
  }

  function isEthereumAddress(ad) {
    if (ad === undefined || ad === null) {
      return false
    }
    let address = ad.split(' ').join('')
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return false
    } else if (
      /^(0x)?[0-9a-f]{40}$/.test(address) ||
      /^(0x)?[0-9A-F]{40}$/.test(address)
    ) {
      return true
    } else {
      address = address.replace('0x', '')
      const addressHash = web3.utils.sha3(address.toLowerCase())
      for (let i = 0; i < 40; i++) {
        if (
          (parseInt(addressHash[i], 16) > 7 &&
            address[i].toUpperCase() !== address[i]) ||
          (parseInt(addressHash[i], 16) <= 7 &&
            address[i].toLowerCase() !== address[i])
        ) {
          //return false;
        }
      }
    }
    return true
  }

  async function getAddress() {
    await window.ethereum.enable()
    return (walletAddress = (await web3.eth.getAccounts())[0])
  }

  function getSendingOptions(transaction, value) {
    return new Promise(async function (ok, ko) {
      if (transaction) {
        const from = await getAddress()
        const nonce = await web3.eth.getTransactionCount(from)
        // TODO I can't find the code that sets window.bypassEstimation in the production code, so I guess is always undefined
        // return window.bypassEstimation
        return undefined
          ? ok({
              nonce,
              from,
              // TODO I can't find the code that sets window.gasLimit in the production code, so I guess is always undefined
              // gas: window.gasLimit || '7900000',
              gas: '7900000',
              value,
            })
          : transaction.estimateGas(
              {
                nonce,
                from,
                gasPrice: web3.utils.toWei('13', 'gwei'),
                value,
                gas: '7900000',
                gasLimit: '7900000',
              },
              function (error, gas) {
                if (error) {
                  return ko(error.message || error)
                }
                return ok({
                  nonce,
                  from,
                  // TODO I can't find the code that sets window.gasLimit in the production code, so I guess is always undefined
                  // gas: gas || window.gasLimit || '7900000',
                  gas: gas || '7900000',
                  value,
                })
              }
            )
      }
      return ok({
        from: walletAddress || null,
        // TODO I can't find the code that sets window.gasLimit in the production code, so I guess is always undefined
        // gas: window.gasLimit || '99999999',
        gas: '99999999',
      })
    })
  }

  async function blockchainCall(value, oldCall) {
    const args = []
    const call = value !== undefined && isNaN(value) ? value : oldCall
    for (let i = value === call ? 1 : 2; i < arguments.length; i++) {
      args.push(arguments[i])
    }
    value = isNaN(value) ? undefined : value
    const method = (call.implementation
      ? call.get
      : call.new
      ? call.new
      : call
    ).apply(call, args)
    return method._method.stateMutability === 'view' ||
      method._method.stateMutability === 'pure'
      ? method.call(await getSendingOptions())
      : sendBlockchainTransaction(value, method)
  }

  const sendBlockchainTransaction = function sendBlockchainTransaction(
    value,
    transaction
  ) {
    return new Promise(async function (ok, ko) {
      const handleTransactionError = function handleTransactionError(e) {
        e !== undefined &&
          e !== null &&
          (e.message || e).indexOf('not mined within') === -1 &&
          ko(e)
      }
      try {
        ;(transaction = transaction.send
          ? transaction.send(
              await getSendingOptions(transaction, value),
              handleTransactionError
            )
          : transaction)
          .on('transactionHash', (transactionHash) => {
            // TODO implement publish to transaction/start
            // $.publish('transaction/start')
            const stop = function () {
              // TODO implement unsubscribe to transaction/stop
              // $.unsubscribe('transaction/stop', stop)
              handleTransactionError('stopped')
            }
            // TODO implement subscribe to transaction/stop
            // $.subscribe('transaction/stop', stop)
            const timeout = async function () {
              const receipt = await web3.eth.getTransactionReceipt(
                transactionHash
              )
              if (
                !receipt ||
                !receipt.blockNumber ||
                (await web3.eth.getBlockNumber()) <
                  receipt.blockNumber + (context.transactionConfirmations || 0)
              ) {
                return setTimeout(
                  timeout,
                  context.transactionConfirmationsTimeoutMillis
                )
              }
              // TODO implement unsubscribe to transaction/stop
              // $.unsubscribe('transaction/stop', stop)
              return transaction.then(ok)
            }
            setTimeout(timeout)
          })
          .catch(handleTransactionError)
      } catch (e) {
        return handleTransactionError(e)
      }
    })
  }

  function formatLink(link) {
    link = link ? (link instanceof Array ? link[0] : link) : ''
    if (link.indexOf('assets') === 0 || link.indexOf('/assets') === 0) {
      return link
    }
    for (var temp of context.ipfsUrlTemplates) {
      link = link.split(temp).join(context.ipfsUrlChanger)
    }
    while (link && link.startsWith('/')) {
      link = link.substring(1)
    }
    return (!link ? '' : link.indexOf('http') === -1 ? 'https://' + link : link)
      .split('https:')
      .join('')
      .split('http:')
      .join('')
  }

  async function updateInfo(element) {
    if (!element || element.updating) {
      return
    }
    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        [element.key]: { ...element, updating: true },
      },
    }))

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
      votingTokenAddress = await blockchainCall(newElement.dFO.methods.getToken)
      stateHolderAddress = await blockchainCall(
        newElement.dFO.methods.getStateHolderAddress
      )
      functionalitiesManagerAddress = await blockchainCall(
        newElement.dFO.methods.getMVDFunctionalitiesManagerAddress
      )
      try {
        newElement.walletAddress = await blockchainCall(
          newElement.dFO.methods.getMVDWalletAddress
        )
      } catch (e) {}
    }

    if (!newElement.doubleProxyAddress) {
      try {
        newElement.doubleProxyAddress = await blockchainCall(
          newElement.dFO.methods.getDoubleProxyAddress
        )
      } catch (e) {}
    }

    newElement.token = newContract(context.votingTokenAbi, votingTokenAddress)
    newElement.name = await blockchainCall(newElement.token.methods.name)
    newElement.symbol = await blockchainCall(newElement.token.methods.symbol)
    newElement.totalSupply = await blockchainCall(
      newElement.token.methods.totalSupply
    )
    try {
      newElement.metadata = await window.AJAXRequest(
        formatLink(
          (newElement.metadataLink = web3.eth.abi.decodeParameter(
            'string',
            await blockchainCall(
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
      newElement.token.methods.decimals
    )
    newElement.stateHolder = newContract(
      context.stateHolderAbi,
      stateHolderAddress
    )
    newElement.functionalitiesManager = newContract(
      context.functionalitiesManagerAbi,
      functionalitiesManagerAddress
    )
    newElement.functionalitiesAmount = parseInt(
      await blockchainCall(
        newElement.functionalitiesManager.methods.getFunctionalitiesAmount
      )
    )
    newElement.lastUpdate = newElement.startBlock
    newElement.minimumBlockNumberForEmergencySurvey = '0'
    newElement.emergencySurveyStaking = '0'

    try {
      newElement.minimumBlockNumberForEmergencySurvey =
        web3.eth.abi.decodeParameter(
          'uint256',
          await blockchainCall(
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
        await blockchainCall(newElement.dFO.methods.read, 'getQuorum', '0x')
      )
    } catch (e) {
      newElement.quorum = '0'
    }
    try {
      newElement.surveySingleReward = web3.eth.abi.decodeParameter(
        'uint256',
        await blockchainCall(
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
        await blockchainCall(newElement.dFO.methods.read, 'getLink', '0x')
      )
    } catch (e) {}
    try {
      newElement.index = web3.eth.abi.decodeParameter(
        'uint256',
        await blockchainCall(newElement.dFO.methods.read, 'getIndex', '0x')
      )
    } catch (e) {}
    try {
      newElement !== dfoHub &&
        (newElement.ens = await blockchainCall(
          dfoHubENSResolver.methods.subdomain,
          newElement.dFO.options.originalAddress
        ))
    } catch (e) {}
    newElement.votesHardCap = '0'
    try {
      newElement.votesHardCap = web3.eth.abi.decodeParameter(
        'uint256',
        await blockchainCall(
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

    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        [newElement.key]: { ...newElement, updating: false, updated: true },
      },
    }))
  }

  async function connect(millis = 0) {
    const result = await onEthereumUpdate(millis, true)
    return result
  }

  return {
    onEthereumUpdate,
    connect,
    updateInfo,
  }
}

export default initWeb3
