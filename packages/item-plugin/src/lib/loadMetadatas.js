async function loadMetadatas({ context }) {
  context.metadatas = []
  try {
    context.metadatas = await (await fetch(context.ethItemMetadatasURL)).json()
  } catch (e) {
    console.error('loadMetadatas', e)
  }
}

export default loadMetadatas
