import getSolidityUtilities from './getSolidityUtilities'
import checkMandatoryFunctionalityProposalConstraints from './checkMandatoryFunctionalityProposalConstraints'
import methodSignatureMatch from './methodSignatureMatch'
import extractComment from './extractComment'

async function searchForCodeErrors(
  { context },
  location,
  code,
  codeName,
  methodSignature,
  replaces,
  noCode
) {
  const knownFunctionalities = {
    getMinimumBlockNumberForSurvey: true,
    getMinimumBlockNumberForEmergencySurvey: true,
    getEmergencySurveyStaking: true,
    getQuorum: true,
    getSurveySingleReward: true,
    getMinimumStaking: true,
    getIndex: true,
    getLink: true,
    getVotesHardCap: true,
    getMetadataLink: true,
  }
  const errors = []
  const comments = code ? extractComment({ context }, code) : {}
  if ((codeName || !replaces) && !code) {
    //errors.push('Missing code!');
    errors.push('On-chain data not available')
    errors.push('https://etherscan.io/address/' + location + '#code')
    errors.push('(IPFS metadata coming soon)')
  }
  if ((codeName || (!codeName && !replaces)) && code && !comments.Description) {
    errors.push('Missing description!')
  }
  if ((codeName || (!codeName && !replaces)) && code && !comments.Discussion) {
    !knownFunctionalities[codeName] && errors.push('Missing discussion Link!')
  }
  if (codeName && replaces && !comments.Update) {
    errors.push('Missing update text!')
  }
  if (codeName && !location) {
    errors.push('Missing location address!')
  }
  if (codeName && !methodSignature) {
    errors.push('Missing method signature!')
  }
  if (!location || !code || noCode === true) {
    return errors
  }
  try {
    const compare = await getSolidityUtilities().compare(location, code)
    if (!compare) {
      errors.push('Code and location are not aligned')
    }
    if (compare) {
      let increment = 0
      for (var i in compare.abi) {
        let element = compare.abi[i]
        if (element.type === 'function') {
          increment++
          if (
            element.type === 'constructor' ||
            element.stateMutability === 'view' ||
            element.stateMutability === 'pure'
          ) {
            increment--
          } else if (
            element.name === 'onStart' &&
            element.inputs.length === 2 &&
            element.inputs[0].type === 'address' &&
            element.inputs[1].type === 'address'
          ) {
            increment--
          } else if (
            element.name === 'onStop' &&
            element.inputs.length === 1 &&
            element.inputs[0].type === 'address'
          ) {
            increment--
          }
        }
      }
      if (increment > 1) {
        errors.push(
          'Possible Security Issue: This contract contains more than 1 public method'
        )
      }
    }
    if (
      compare &&
      codeName &&
      !methodSignatureMatch(methodSignature, compare)
    ) {
      errors.push(
        'Wrong Method signature ' + methodSignature + ' for the given contract!'
      )
    }
    if (compare) {
      const constraints = checkMandatoryFunctionalityProposalConstraints(
        compare.abi,
        !codeName,
        true
      )
      constraints && errors.push(...constraints)
    }
  } catch (e) {}
  return errors
}

export default searchForCodeErrors
