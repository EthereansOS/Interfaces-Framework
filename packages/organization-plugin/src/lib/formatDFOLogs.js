const formatDFOLogs = ({ dfoEvent, web3 }, logVar, event) => {
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
      Object.keys(data).forEach((key) => {
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

export default formatDFOLogs
