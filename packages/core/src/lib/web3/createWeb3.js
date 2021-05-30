import Web3 from 'web3'

async function createWeb3(connectionProvider) {
  const web3 = new Web3(connectionProvider)
  web3.currentProvider.setMaxListeners &&
    web3.currentProvider.setMaxListeners(0)
  web3.eth.transactionBlockTimeout = 999999999
  web3.eth.transactionPollingTimeout = new Date().getTime()
  web3.startBlock = await web3.eth.getBlockNumber()
  return web3
}

export default createWeb3
