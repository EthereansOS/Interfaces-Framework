function validateGetMetadataLinkConstructor(abi, noMetadata) {
  const getMetadataLinkConstructor = !!abi.find(
    (voice) =>
      voice.type === 'constructor' &&
      voice.inputs &&
      voice.inputs.length >= 1 &&
      voice.inputs[0].type === 'string' &&
      voice.inputs[0].name === 'metadataLink'
  )

  return noMetadata !== true && !getMetadataLinkConstructor
    ? [
        "Microservices must have a constructor with a string variable called 'metadataLink' as first parameter",
      ]
    : []
}

function validateGetMetadataLink(abi, noMetadata) {
  const getMetadataLink = !!abi.find(
    (voice) =>
      voice.type === 'function' &&
      voice.name === 'getMetadataLink' &&
      voice.stateMutability === 'view' &&
      voice.inputs.length === 0 &&
      voice.outputs.length === 1 &&
      voice.outputs[0].type === 'string'
  )

  return noMetadata !== true && !getMetadataLink
    ? [
        'Missing mandatory function getMetadataLink() public view returns(string memory)',
      ]
    : []
}

function validateOnStart(abi, isOneTime) {
  const onStart =
    isOneTime === true ||
    !!abi.find(
      (voice) =>
        voice.type === 'function' &&
        voice.name === 'onStart' &&
        voice.stateMutability !== 'view' &&
        voice.stateMutability !== 'pure' &&
        (!voice.outputs || voice.outputs.length === 0) &&
        voice.inputs &&
        voice.inputs.length === 2 &&
        voice.inputs[0].type === 'address' &&
        voice.inputs[1].type === 'address'
    )

  return !onStart
    ? ['Missing mandatory function onStart(address,address) public']
    : []
}

function validateOnStop(abi, isOneTime) {
  const onStop =
    isOneTime === true ||
    !!abi.find(
      (voice) =>
        voice.type === 'function' &&
        voice.name === 'onStop' &&
        voice.stateMutability !== 'view' &&
        voice.stateMutability !== 'pure' &&
        (!voice.outputs || voice.outputs.length === 0) &&
        voice.inputs &&
        voice.inputs.length === 1 &&
        voice.inputs[0].type === 'address'
    )

  return !onStop ? ['Missing mandatory function onStop(address) public'] : []
}

/**
 * Validate the mandatory functionality proposal constrains
 * @param {voice[]} abi - The list of arguments.
 * @param {boolean} isOneTime - The function run one time and doesn't require onStart and onStop
 * @param {boolean} noMetadata - The function does not require metadata functions
 * @return {Promise<*|Promise<unknown>>}
 */
function checkMandatoryFunctionalityProposalConstraints(
  abi,
  isOneTime,
  noMetadata
) {
  return [
    ...validateGetMetadataLinkConstructor(abi, noMetadata),
    ...validateGetMetadataLink(abi, noMetadata),
    ...validateOnStart(abi, isOneTime),
    ...validateOnStop(abi, isOneTime),
  ]
}

export default checkMandatoryFunctionalityProposalConstraints
