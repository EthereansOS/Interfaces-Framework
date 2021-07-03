function checkMandatoryFunctionalityProposalConstraints(
  abi,
  isOneTime,
  noMetadata
) {
  var mandatoryFunctionalityProposalConstraints = {
    onStart: isOneTime === true,
    onStop: isOneTime === true,
    getMetadataLinkConstructor: false,
    getMetadataLink: false,
  }
  for (var voice of abi) {
    if (!mandatoryFunctionalityProposalConstraints.getMetadataLinkConstructor) {
      mandatoryFunctionalityProposalConstraints.getMetadataLinkConstructor =
        voice.type === 'constructor' &&
        voice.inputs &&
        voice.inputs.length >= 1 &&
        voice.inputs[0].type === 'string' &&
        voice.inputs[0].name === 'metadataLink'
    }
    if (!mandatoryFunctionalityProposalConstraints.getMetadataLink) {
      mandatoryFunctionalityProposalConstraints.getMetadataLink =
        voice.type === 'function' &&
        voice.name === 'getMetadataLink' &&
        voice.stateMutability === 'view' &&
        voice.inputs.length === 0 &&
        voice.outputs.length === 1 &&
        voice.outputs[0].type === 'string'
    }
    if (!mandatoryFunctionalityProposalConstraints.onStart) {
      mandatoryFunctionalityProposalConstraints.onStart =
        voice.type === 'function' &&
        voice.name === 'onStart' &&
        voice.stateMutability !== 'view' &&
        voice.stateMutability !== 'pure' &&
        (!voice.outputs || voice.outputs.length === 0) &&
        voice.inputs &&
        voice.inputs.length === 2 &&
        voice.inputs[0].type === 'address' &&
        voice.inputs[1].type === 'address'
    }
    if (!mandatoryFunctionalityProposalConstraints.onStop) {
      mandatoryFunctionalityProposalConstraints.onStop =
        voice.type === 'function' &&
        voice.name === 'onStop' &&
        voice.stateMutability !== 'view' &&
        voice.stateMutability !== 'pure' &&
        (!voice.outputs || voice.outputs.length === 0) &&
        voice.inputs &&
        voice.inputs.length === 1 &&
        voice.inputs[0].type === 'address'
    }
  }
  var errors = []
  noMetadata !== true &&
    !mandatoryFunctionalityProposalConstraints.getMetadataLinkConstructor &&
    errors.push(
      "Microservices must have a constructor with a string variable called 'metadataLink' as first parameter"
    )
  noMetadata !== true &&
    !mandatoryFunctionalityProposalConstraints.getMetadataLink &&
    errors.push(
      'Missing mandatory function getMetadataLink() public view returns(string memory)'
    )
  !mandatoryFunctionalityProposalConstraints.onStart &&
    errors.push('Missing mandatory function onStart(address,address) public')
  !mandatoryFunctionalityProposalConstraints.onStop &&
    errors.push('Missing mandatory function onStop(address) public')
  return errors
}

export default checkMandatoryFunctionalityProposalConstraints
