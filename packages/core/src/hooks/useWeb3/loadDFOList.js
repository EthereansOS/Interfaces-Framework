export const BLOCK_SEARCH_SIZE = 40000
export const DFO_DEPLOYED_EVENT = 'DFODeployed(address_indexed,address)'
export const NEW_DFO_DEPLOYED_EVENT =
  'DFODeployed(address_indexed,address_indexed,address,address)'

const loadDFOList = (methods, getState, setState) => async () => {
  const { web3, dfoHub, dfoEvent } = getState()
  const { getNetworkElement, loadDFO, getLogs } = methods

  // Refactored from: https://github.com/EthereansOS/Organizations-Interface/blob/master/spa/dFOList/controller.jsx#L41
  const isInList = (key, list) => {
    if (list[key]) {
      return true
    }
    if (!key.dFO) {
      try {
        key = web3.utils.toChecksumAddress(key)
      } catch (e) {
        return false
      }
      if (
        Object.values(list).filter(
          (it) =>
            it.dFO.options.allAddresses.filter(
              (addr) => web3.utils.toChecksumAddress(addr) === key
            ).length > 0
        ).length > 0
      ) {
        return true
      }
    } else {
      const keys = key.dFO.options.allAddresses.map((it) =>
        web3.utils.toChecksumAddress(it)
      )
      const listValues = Object.values(list).map((it) =>
        it.dFO.options.allAddresses.map((it) =>
          web3.utils.toChecksumAddress(it)
        )
      )
      for (const addresses of listValues) {
        for (const address of addresses) {
          if (keys.indexOf(address) !== -1) {
            return true
          }
        }
      }
    }
    return false
  }

  // Get all the ecent logs, and for each log, load the dfo data with `loadDFO`
  const getEventLogs = async (fromBlock, toBlock, event, topics) => {
    const logs = await getDFOLogs({
      address: dfoHub.dFO.options.allAddresses,
      topics,
      event,
      fromBlock: '' + fromBlock,
      toBlock: '' + toBlock,
    })

    for (const [index, log] of logs.entries()) {
      // When testing we are using ropsten (real blockchain) so we limit the number of item in list to avoid timeout
      if (/*process.env.NODE_ENV === 'test' && */ index >= 2) {
        break
      }

      const key = log.blockNumber + '_' + log.id
      if (isInList(key, getState().list)) {
        continue
      }
      const result = await loadDFO(log.data[0])
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

  const formatDFOLogs = (logVar, event) => {
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
    const deployArgs = []
    if (event) {
      let rebuiltArgs = event.substring(event.indexOf('(') + 1)
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
    const dfoEv =
      dfoEvent || web3.utils.sha3('Event(string,bytes32,bytes32,bytes)')
    const eventTopic = event && web3.utils.sha3(event)
    const manipulatedLogs = []
    for (const i in logs) {
      const log = logs[i]
      if (log.topics && log.topics[0] !== dfoEv) {
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
        const data = web3.eth.abi.decodeParameters(
          deployArgs,
          log.data || (log.raw && log.raw.data)
        )
        log.data && (log.data = [])
        log.raw && log.raw.data && (log.raw.data = [])
        // TODO: fixme.
        // WHY A MAP HERE? this seems it should be a simple 'for', check the original code.       // and then refactor
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

  // Get the DFO event setting as topic `dfoEvent`.
  const getDFOLogs = async (args) => {
    const event =
      dfoEvent || web3.utils.sha3('Event(string,bytes32,bytes32,bytes)')
    const logArgs = {
      topics: [event],
      fromBlock: '0',
      toBlock: 'latest',
    }
    // if there is an address, set it
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
    const logs = await getLogs(logArgs)
    const formattedLogs = formatDFOLogs(
      logs,
      args.event && args.event.indexOf('0x') === -1 ? args.event : undefined
    )
    return formattedLogs
  }

  // Chiama getEventLogs due volte fino a che
  // toBlock === window.getNetworkElement('deploySearchStart')
  async function load(topics, toBlock, lastBlockNumber) {
    if (toBlock === getNetworkElement('deploySearchStart')) {
      return
    }
    const lastEthBlock = await web3.eth.getBlockNumber()
    const lastBlockNumberNew = lastBlockNumber || lastEthBlock
    const toBlockNew = toBlock || lastBlockNumberNew

    let fromBlock = toBlockNew - BLOCK_SEARCH_SIZE
    const startBlock = getNetworkElement('deploySearchStart')
    fromBlock = fromBlock > startBlock ? startBlock : toBlockNew
    // We get all the DFP logs related with the event
    await Promise.all([
      getEventLogs(fromBlock, toBlockNew, NEW_DFO_DEPLOYED_EVENT),
      // getEventLogs(fromBlock, toBlockNew, DFO_DEPLOYED_EVENT),
    ])
    return load(topics, fromBlock, lastBlockNumberNew)
  }

  return load()
}

export default loadDFOList
