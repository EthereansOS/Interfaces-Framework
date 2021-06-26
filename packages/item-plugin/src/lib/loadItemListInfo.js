import { blockchainCall, newContract } from '@dfohub/core'

import tryRetrieveMetadata from './tryRetrieveMetadata'
import loadCollectionENS from './loadCollectionENS'

async function loadItemListInfo(
  {
    web3,
    web3ForLogs,
    context,
    contracts,
    networkId,
    walletAddress,
    addItems,
    updateItem,
  },
  item
) {
  if (item.listDetailsUpdating || item.listDetailsLoaded) {
    return
  }

  updateItem(item, {
    listDetailsUpdating: true,
  })

  const info = {}
  info.name = await blockchainCall(
    { web3, context, networkId },
    item.contract.methods.name
  )
  info.symbol = await blockchainCall(
    { web3, context, networkId },
    item.contract.methods.symbol
  )

  if (!item.sourceAddress) {
    info.sourceAddress = 'blank'
    try {
      info.sourceAddress = await blockchainCall(
        { web3, context, networkId },
        item.contract.methods.source
      )
    } catch (e) {}
  }
  try {
    info.modelVersion =
      item.modelVersion ||
      (await blockchainCall(
        { web3, context, networkId },
        item.contract.methods.modelVersion
      ))
  } catch (e) {
    info.modelVersion = 1
  }

  info.isOwner = false
  try {
    info.extensionAddress = web3.utils.toChecksumAddress(
      await blockchainCall(
        { web3, context, networkId },
        item.contract.methods.extension
      )
    )
  } catch (e) {
    // console.log('iswoner error', e)
  }

  item.isOwner = info.extensionAddress === walletAddress

  try {
    item.extensionIsContract =
      (await web3.eth.getCode(info.extensionAddress)) !== '0x'
  } catch (e) {}
  try {
    info.standardVersion =
      item.standardVersion ||
      (await blockchainCall(
        { web3, context, networkId },
        item.contract.methods.mainInterfaceVersion
      ))
  } catch (e) {
    info.standardVersion = 1
  }

  try {
    info.interoperableInterfaceModel =
      item.interoperableInterfaceModel ||
      (await blockchainCall(
        { web3, context, networkId },
        item.contract.methods.interoperableInterfaceModel
      ))
    info.interoperableInterfaceModelAddress =
      item.interoperableInterfaceModelAddress ||
      info.interoperableInterfaceModel[0]
    info.interoperableInterfaceModelVersion =
      item.interoperableInterfaceModelVersion ||
      info.interoperableInterfaceModel[1]
  } catch (e) {
    try {
      info.interoperableInterfaceModel = await blockchainCall(
        { web3, context, networkId },
        newContract({ web3, context }, context.OldNativeABI, item.address)
          .methods.erc20NFTWrapperModel
      )
      info.interoperableInterfaceModelAddress =
        item.interoperableInterfaceModelAddress ||
        info.interoperableInterfaceModel[0]
      info.interoperableInterfaceModelVersion =
        item.interoperableInterfaceModelVersion ||
        info.interoperableInterfaceModel[1]
    } catch (e) {
      info.interoperableInterfaceModelAddress =
        item.interoperableInterfaceModelAddress || item.address
      info.interoperableInterfaceModelVersion =
        item.interoperableInterfaceModelVersion || 1
    }
  }
  info.erc20WrappedItemVersion = info.interoperableInterfaceModelVersion

  const newMetadata = await tryRetrieveMetadata(
    { web3, context },
    { ...item, ...info }
  )

  info.openSeaName = newMetadata.name?.toLowerCase().split(' ').join('-')
  delete item.hasBalance
  const collectionEns = await loadCollectionENS(
    { web3, web3ForLogs, context, networkId },
    item
  )

  updateItem(item, {
    ...info,
    ...newMetadata,
    ...collectionEns,
    listDetailsLoaded: true,
    listDetailsUpdating: false,
  })
}

export default loadItemListInfo
