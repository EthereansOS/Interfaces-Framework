async function loadExcludingCollections({ web3, context }) {
  context.excludingCollections = (context.excludingCollections || []).map(
    (it) => web3.utils.toChecksumAddress(it)
  )
  context.pandorasBox = (context.pandorasBox || []).map((it) =>
    web3.utils.toChecksumAddress(it)
  )
  try {
    const pandorasBox = await (await fetch(context.pandorasBoxURL)).json()
    context.pandorasBox.push(
      ...pandorasBox
        .map((it) => web3.utils.toChecksumAddress(it))
        .filter((it) => context.pandorasBox.indexOf(it) === -1)
    )
  } catch (e) {
    console.error('loadExcludingCollections', e)
  }
}

export default loadExcludingCollections
