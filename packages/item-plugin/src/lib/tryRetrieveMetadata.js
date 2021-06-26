import { blockchainCall, formatLink, getElementImage } from '@dfohub/core'

async function tryRetrieveMetadata({ web3, context }, item) {
  if (item.metadataLink) {
    return
  }

  const info = {}
  if (
    context.pandorasBox.indexOf(web3.utils.toChecksumAddress(item.address)) !==
      -1 ||
    (item.collection &&
      context.pandorasBox.indexOf(
        web3.utils.toChecksumAddress(item.collection.address)
      ) !== -1) ||
    (item.collection &&
      item.collection.sourceAddress &&
      item.collection.sourceAddress !== 'blank' &&
      context.pandorasBox.indexOf(
        web3.utils.toChecksumAddress(item.collection.sourceAddress)
      ) !== -1)
  ) {
    info.metadataLink = 'blank'
    info.image = getElementImage({ context }, item)
    return info
  }

  var clearMetadata = true
  try {
    info.metadataLink = item.objectId
      ? await blockchainCall(
          { web3, context },
          item.contract.methods.uri,
          item.objectId
        )
      : await blockchainCall({ web3, context }, item.contract.methods.uri)

    item.objectId &&
      (info.metadataLink = info.metadataLink
        .split('0x{id}')
        .join(item.objectId))

    info.metadataLink = context.metadatas[item.address] || info.metadataLink
    if (info.metadataLink !== '') {
      info.image = formatLink({ context }, info.metadataLink)
      try {
        // atob(value.substring(value.indexOf(',') + 1))
        if (info.metadataLink.startsWith('data:application/json;base64,')) {
          info.metadata = JSON.parse(
            atob(
              info.metadataLink.substring(
                'data:application/json;base64,'.length
              )
            )
          )
        } else {
          const url = formatLink({ context }, info.metadataLink)
          info.metadata = await (await fetch(url)).json()
        }

        if (typeof info.metadata !== 'string') {
          Object.entries(info.metadata).forEach((it) => {
            if (it[1] === undefined || it[1] === null) {
              delete info.metadata[it[0]]
              return
            }
            info[it[0]] = it[1]
          })
          info.name = info.item_name || item.name
          info.description =
            info.description && info.description.split('\n\n').join(' ')
        }
      } catch (e) {
        delete info.image
        info.image = getElementImage({ context }, { ...item, ...info })
        info.metadataMessage = `Could not retrieve metadata, maybe due to CORS restriction policies for the link (<a href="${
          info.metadataLink
        }" target="_blank">${info.metadataLink}</a>), check it on <a href="${
          item.collection
            ? context.openSeaItemLinkTemplate.format(
                item.collection.address,
                item.objectId
              )
            : context.openSeaCollectionLinkTemplate.format(item.address)
        }" target="_blank">Opensea</a>`
        console.error(item.metadataMessage)
      }
      clearMetadata = false
    }
  } catch (e) {}

  if (clearMetadata) {
    delete info.metadata
    info.metadataLink = 'blank'
  }

  if (
    !clearMetadata &&
    context.ethItemElementImages[item.address] &&
    !item.elementImageLoaded
  ) {
    info.elementImageLoaded = context.ethItemElementImages[item.address]
    info.logoURI = info.elementImageLoaded
    info.logoUri = info.elementImageLoaded
    info.image = info.elementImageLoaded
  }

  // TODO This adds the list of the token owned. Better to add a filter directly on the list
  // if (
  //   (window.itemsTokens = window.itemsTokens || []).filter(
  //     (it) => it.address === item.address
  //   ).length === 0
  // ) {
  //   window.itemsTokens.push({
  //     address: item.address,
  //     logoURI: item.image,
  //   })
  // }
  return info
}

export default tryRetrieveMetadata
