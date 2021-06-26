async function loadEthItemElementImages({ context }) {
  context.ethItemElementImages = []
  try {
    context.ethItemElementImages = await (
      await fetch(context.ethItemElementImagesURL)
    ).json()
  } catch (e) {
    console.error('loadEthItemElementImages', e)
  }
}

export default loadEthItemElementImages
