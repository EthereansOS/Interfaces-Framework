import PQueue from 'p-queue'
import {
  blockchainCall,
  getNetworkElement,
  loadBlockSearchTranches,
  packCollection,
  getLogs,
} from '@dfohub/core'

import loadItemListInfo from './loadItemListInfo'

const queue = new PQueue({ concurrency: 10 })

async function loadItems({
  web3,
  web3ForLogs,
  context,
  contracts,
  networkId,
  walletAddress,
  addItems,
  updateItem,
}) {
  const map = {}
  Object.entries(context.ethItemFactoryEvents).forEach(
    (it) => (map[web3.utils.sha3(it[0])] = it[1])
  )

  const topics = [
    [
      Object.keys(map).filter((key) =>
        networkId !== 1 ? true : map[key].indexOf('721') === -1
      ),
    ],
  ]

  networkId === 1 &&
    topics.push([
      Object.keys(map).filter((key) => map[key].indexOf('721') !== -1),
      [],
      [
        web3.eth.abi.encodeParameter('uint256', '2'),
        web3.eth.abi.encodeParameter('uint256', '3'),
      ],
    ])

  const address = await blockchainCall(
    { web3, context },
    contracts.ethItemOrchestrator.methods.factories
  )

  ;(getNetworkElement({ context, networkId }, 'additionalFactories') || [])
    .map((it) => web3.utils.toChecksumAddress(it))
    .filter((it) => address.indexOf(it) === -1)
    .forEach((it) => address.push(it))

  const blocks = await loadBlockSearchTranches({ web3, context, networkId })

  for (const block of blocks) {
    const subCollections = []
    const logs = []
    for (const topic of topics) {
      logs.push(
        ...(await getLogs(
          { web3, web3ForLogs, context, networkId },
          {
            address,
            topics: topic,
            fromBlock: block[0],
            toBlock: block[1],
          }
        ))
      )
    }
    for (const log of logs) {
      const modelAddress = web3.eth.abi.decodeParameter(
        'address',
        log.topics[1]
      )
      const collectionAddress = web3.utils.toChecksumAddress(
        web3.eth.abi.decodeParameter(
          'address',
          log.topics[log.topics.length - 1]
        )
      )
      if (context.excludingCollections.indexOf(collectionAddress) !== -1) {
        continue
      }
      const category = map[log.topics[0]]
      const subCollection = packCollection(
        { web3, context },
        collectionAddress,
        category,
        modelAddress
      )

      subCollection.listDetailsLoaded = false
      subCollection.detailsLoaded = false

      // if (subCollection.key === '0x98995FAfcbdafA6a2C983efd3F2B67690AE0CdF1') {
      queue.add(() =>
        loadItemListInfo(
          { web3, context, networkId, walletAddress, updateItem },
          subCollection
        )
      )
      // }
      subCollections.push(subCollection)
    }
    addItems(subCollections)
  }
}

export default loadItems
