export const sortByMarketCap = (list, field) => {
  const sortFunction = (first, second) => {
    const a = first[field]
    const b = second ? second[field] : 0
    return a < b ? 1 : a > b ? -1 : 0
  }
  // mutates the array
  return list.sort(sortFunction)
}

export const sortFromFirst = (list) => {
  return list.sort((first, second) => {
    const a = parseInt(first.key.substring(0, first.key.indexOf('_')))
    const b = second
      ? parseInt(second.key.substring(0, second.key.indexOf('_')))
      : 0
    return a < b ? -1 : a > b ? 1 : 0
  })
}

export const sortFromLast = (list) => {
  const sortedList = list.sort((first, second) => {
    const a = parseInt(first.key.substring(0, first.key.indexOf('_')))
    const b = second
      ? parseInt(second.key.substring(0, second.key.indexOf('_')))
      : 0
    return a < b ? 1 : a > b ? -1 : 0
  })
  const index = sortedList.findIndex((element) => element.key === 'DFO')
  const dfoHub = sortedList.splice(index, 1)
  sortedList.push(dfoHub[0])
  return sortedList
}

export const sortByMetadata = (list) => {
  // TODO use "sort" here too

  const orgsWithMetadata = list.filter((org) => org.dFO.metadataLink)
  const orgsWithoutMetadata = list.filter((org) => !org.dFO.metadataLink)

  return [...orgsWithMetadata, ...orgsWithoutMetadata]
}
