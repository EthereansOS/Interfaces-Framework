import formatLink from './formatLink'

function getElementImage({ context }, element) {
  if (!element || !element.metadataLink) {
    return 'assets/img/loadMonolith.png'
  }
  return formatLink(
    { context },
    element.image ||
      context.defaultItemData[element.category || element.collection.category][
        element.collection ? 'item' : 'collection'
      ].image
  )
}

export default getElementImage
