import blockchainCall from './blockchainCall'
import loadContent from './loadContent'
import formatLink from './formatLink'
import '../solidity.utilities.min'
import { newContract } from './contracts'

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

function methodSignatureMatch(methodSignature, compare) {
  for (var i in compare.abi) {
    var abi = compare.abi[i]
    if (
      abi.type === 'function' &&
      abi.name + '(' + abi.inputs.map((it) => it.type).join(',') + ')' ===
        methodSignature
    ) {
      return true
    }
  }
  return false
}

function extractComment({ context }, code, element) {
  if (code === undefined || code === null) {
    return ''
  }
  code = code.split('\r').join('').trim()
  if (!element) {
    var comments = {}
    ;['Description', 'Discussion', 'Update'].map(
      (key) => (comments[key] = extractComment({ context }, code, key))
    )
    comments.Discussion &&
      (comments.Discussion = formatLink({ context }, comments.Discussion))
    return comments
  }
  var initialCode = '/* ' + element + ':\n'
  var finalCode = '\n */\n'
  var start = code.indexOf(initialCode)
  if (start === -1) {
    return ''
  }
  start += initialCode.length
  var end = code.indexOf(finalCode, start)
  end =
    end === -1
      ? code.indexOf(finalCode.substring(0, finalCode.length - 1), start)
      : end
  var data = code.substring(start, end)
  var split = data.split('\n')
  for (var i = 0; i < split.length; i++) {
    var tag = split[i]
    if (tag.indexOf(' * ') === 0) {
      try {
        split[i] = tag = tag.substring(3).trim()
      } catch (e) {
        split[i] = tag = tag.substring(2).trim()
      }
    }
    if (tag.indexOf(' *') === 0) {
      try {
        split[i] = tag = tag.substring(2).trim()
      } catch (e) {
        split[i] = tag = tag.substring(1).trim()
      }
    }
  }
  return split.join('\n').trim()
}

function extractHTMLDescription({ context }, code, updateFirst) {
  if (!code) {
    return ''
  }
  let description = ''
  const comments =
    typeof code === 'string' ? extractComment({ context }, code) : code
  if (updateFirst) {
    comments.Update && (description += comments.Update)
    comments.Description &&
      (description +=
        (comments.Update ? '<br/><br/><b>Description</b>:<br/>' : '') +
        comments.Description)
  } else {
    comments.Description && (description += comments.Description)
    comments.Update &&
      (description +=
        (comments.Description ? '<br/><br/><b>Last Updates</b>:<br/>' : '') +
        comments.Update)
  }
  if (comments.Discussion) {
    description +=
      '<a class="ComEXTLink" href="' +
      comments.Discussion +
      '" target="_blank"><b>Discussion Link</b></a><br/><br/>'
  }
  description = description.trim()
  description &&
    (description = description.split('\n').join('<br/>').trim() + '<br/><br/>')
  return description
}

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
    const compare = await window.SolidityUtilities.compare(location, code)
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

async function loadFunctionality(
  { web3, context, networkId },
  functionalityName,
  organization
) {
  const functionality = JSON.parse(
    await blockchainCall(
      { web3, context },
      organization.functionalitiesManager.methods.functionalityToJSON,
      functionalityName
    )
  )

  try {
    functionality.metadataLink = formatLink(
      { context },
      await blockchainCall(
        { web3, context },
        newContract({ web3 }, context.IFunctionalityAbi, functionality.location)
          .methods.getMetadataLink
      )
    )

    functionality.metadata = await (
      await fetch(functionality.metadataLink)
    ).json()

    Object.entries(functionality.metadata).forEach(
      (it) => (functionality[it[0]] = it[1])
    )
    functionality.description = extractHTMLDescription(
      { context },
      functionality.description || functionality.code
    )
  } catch (e) {}
  functionality.inputParameters = []

  try {
    functionality.inputParameters = functionality.methodSignature
      .split(
        functionality.methodSignature.substring(
          0,
          functionality.methodSignature.indexOf('(') + 1
        )
      )
      .join('')
      .split(')')
      .join('')
    functionality.inputParameters = functionality.inputParameters
      ? functionality.inputParameters.split(',')
      : []
  } catch (e) {}

  try {
    if (!functionality.code) {
      functionality.code =
        functionality.code ||
        (await loadContent(
          { web3, context, networkId },
          functionality.sourceLocationId,
          functionality.sourceLocation
        ))

      if (
        functionality.codeName !== 'getEmergencySurveyStaking' &&
        functionality.sourceLocationId === 0
      ) {
        delete functionality.code
      }
      functionality.description = extractHTMLDescription(
        { context },
        functionality.code
      )
    }
  } catch (e) {}

  functionality.compareErrors = await searchForCodeErrors(
    { context },
    functionality.location,
    functionality.code,
    functionality.codeName,
    functionality.methodSignature,
    functionality.replaces,
    true
  )
  functionality.compareErrors &&
    functionality.compareErrors.length > 0 &&
    console.log(functionality.name, functionality.compareErrors.join(' - '))

  return functionality
}

export default loadFunctionality
