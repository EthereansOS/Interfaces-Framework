import { uploadToIPFS, URL_REGEXP } from '@ethereansos/interfaces-core'

import checkCoverSize from './checkCoverSize'

async function validateDFOMetadata(
  { context, ipfsHttpClient },
  metadata,
  noUpload
) {
  var errors = []
  !metadata && errors.push('Please provide data')

  metadata &&
    metadata.brandUri &&
    (!metadata.brandUri ||
      !new RegExp(URL_REGEXP).test(metadata.brandUri) ||
      metadata.brandUri.indexOf('ipfs') === -1) &&
    errors.push('DFO Logo is not a valid IPFS URL (ipfs://ipfs/...)')
  metadata &&
    metadata.logoUri &&
    (!metadata.logoUri ||
      !new RegExp(URL_REGEXP).test(metadata.logoUri) ||
      metadata.logoUri.indexOf('ipfs') === -1) &&
    errors.push('Token Logo is not a valid IPFS URL (ipfs://ipfs/...)')
  metadata &&
    metadata.externalENS &&
    (!metadata.externalENS ||
      !new RegExp(URL_REGEXP).test(metadata.externalENS) ||
      metadata.externalENS.indexOf('.eth') === -1) &&
    errors.push('External ENS link must contain a valid ENS URL')

  if (errors.length > 0) {
    throw errors.join('\n')
  }

  try {
    metadata.brandUri = metadata.brandUri.item(0)
  } catch (e) {}
  if (
    metadata &&
    typeof metadata.brandUri !== 'string' &&
    !(await checkCoverSize(metadata.brandUri))
  ) {
    //errors.push('Brand Logo must be valid 320x320 image');
  }
  try {
    metadata &&
      (metadata.brandUri =
        !metadata.brandUri || noUpload
          ? metadata.brandUri
          : typeof metadata.brandUri === 'string' &&
            metadata.brandUri.indexOf('ipfs') !== -1
          ? metadata.brandUri
          : await uploadToIPFS({ context, ipfsHttpClient }, metadata.brandUri))
  } catch (e) {
    errors.push(e.message || e)
  }
  try {
    metadata.logoUri = metadata.logoUri.item(0)
  } catch (e) {}
  if (
    metadata &&
    typeof metadata.logoUri !== 'string' &&
    !(await checkCoverSize(metadata.logoUri))
  ) {
    //errors.push('Token Logo must be valid 320x320 image');
  }
  try {
    metadata &&
      (metadata.logoUri =
        !metadata.logoUri || noUpload
          ? metadata.logoUri
          : typeof metadata.logoUri === 'string' &&
            metadata.logoUri.indexOf('ipfs') !== -1
          ? metadata.logoUri
          : await uploadToIPFS({ context, ipfsHttpClient }, metadata.logoUri))
  } catch (e) {
    //errors.push(e.message || e);
  }
  //metadata && !metadata.name && errors.push("Name is mandatory in metadata");
  //metadata && !metadata.shortDescription && errors.push("BIO is mandatory in metadata");
  //metadata && (!metadata.wpUri || !new RegExp(URL_REGEXP).test(metadata.wpUri)) && errors.push("Explainer link must contain a valid URL");
  //metadata && !noUpload && (!metadata.brandUri || !new RegExp(URL_REGEXP).test(metadata.brandUri) || metadata.brandUri.indexOf('ipfs') === -1) && errors.push("DFO Logo is not a valid URL");
  //metadata && !noUpload && (!metadata.logoUri || !new RegExp(URL_REGEXP).test(metadata.logoUri) || metadata.logoUri.indexOf('ipfs') === -1) && errors.push("Token Logo is not a valid URL");
  //metadata && noUpload && !metadata.brandUri && errors.push("Insert a valid DFO Logo");
  //metadata && noUpload && !metadata.logoUri && errors.push("Insert a valid Token Logo image");
  //metadata && (!metadata.discussionUri || !new RegExp(URL_REGEXP).test(metadata.discussionUri)) && errors.push("Chat link must contain a valid URL");
  //metadata && (!metadata.repoUri || !new RegExp(URL_REGEXP).test(metadata.repoUri)) && errors.push("Repo link must contain a valid URL");
  //metadata && (!metadata.externalDNS || !new RegExp(URL_REGEXP).test(metadata.externalDNS)) && errors.push("External link must contain a valid URL");
  //metadata && (!metadata.externalENS || !new RegExp(URL_REGEXP).test(metadata.externalENS) || metadata.externalENS.indexOf('.eth') === -1) && errors.push("External ENS link must contain a valid ENS URL");
  //metadata && (!metadata.roadmapUri || !new RegExp(URL_REGEXP).test(metadata.roadmapUri)) && errors.push("Roadmap link must contain a valid URL");
  if (errors.length > 0) {
    throw errors.join('\n')
  }
  return noUpload
    ? metadata
    : await uploadToIPFS({ context, ipfsHttpClient }, metadata)
}

export default validateDFOMetadata
