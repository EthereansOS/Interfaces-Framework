import {
  isEthereumAddress,
  getSolidityUtilities,
} from '@ethereansos/interfaces-core'

export function checkData(data, errors) {
  var messages = []
  try {
    data.functionalityMethodSignature =
      data.functionalityMethodSignature.split('_')
    data.functionalityMethodSignature.splice(0, 1)
    data.functionalityOutputParameters =
      data.functionalityMethodSignature.splice(
        data.functionalityMethodSignature.length - 1,
        1
      )[0]
    data.functionalityMethodSignature =
      data.functionalityMethodSignature.join('_')
  } catch (e) {}

  // TODO THIS IS VALIDATION THAT NEEDS TO BE REWORKED

  // const mandatoryFunctionalityProposalConstraints =
  //   data.functionalityMethodSignature &&
  //
  //   window.checkMandatoryFunctionalityProposalConstraints(
  //     data.selectedContract.abi,
  //     data.functionalityMethodSignature === 'callOneTime(address)'
  //   )

  // mandatoryFunctionalityProposalConstraints &&
  //   messages.push(...mandatoryFunctionalityProposalConstraints)
  // !data.functionalityReplace &&
  //   !data.functionalityName &&
  //   data.functionalityMethodSignature !== 'callOneTime(address)' &&
  //   messages.push('Functionality name is mandatory')
  // ;(data.functionalityName || data.functionalityReplace) &&
  //   data.functionalityMethodSignature === 'callOneTime(address)' &&
  //   messages.push('Name and Replaces must be blank for OneTime functionalities')
  // data.functionalityName &&
  //   !data.selectedContract &&
  //   messages.push(
  //     'You need to insert a valid SmartCotract sourceCode and choose a method.'
  //   )
  // data.selectedContract &&
  //   data.selectedContract.bytecode === '0x' &&
  //   messages.push(
  //     'You need to insert a valid SmartCotract sourceCode and choose a method.'
  //   )
  // ;(data.functionalityName ||
  //   (!data.functionalityName && !data.functionalityReplace)) &&
  //   !data.functionalityDescription &&
  //   messages.push('Description is mandatory')
  // ;(data.functionalityName ||
  //   (!data.functionalityName && !data.functionalityReplace)) &&
  //   !new RegExp(window.urlRegex).test(data.functionalityLink) &&
  //   messages.push('Link must be a mandatory URL')
  // data.functionalityName &&
  //   data.functionalityReplace &&
  //   !data.functionalityDescriptionUpdate &&
  //   messages.push('Update description is mandatory')

  // try {
  //   data.constructorArguments = window.getData(
  //     context.view.constructorArguments,
  //     true
  //   )
  // } catch (e) {
  //   messages.push('Constructor arguments are mandatory')
  // }

  if (!errors.functionalityNeedsSender && !data.functionalityNeedsSender) {
    if (
      !window.confirm(
        "The 'Needs Sender' check is useful to preserve the original msg.sender of the Transaction, are you sure you want to continue without flagging it?"
      )
    ) {
      return
    }
  }

  return data
}

export const getContractsFromCode = async (
  { sourceCode, functionalityAddressValue, solidityVersion },
  optimization
) => {
  try {
    const SolidityUtilities = await getSolidityUtilities()
    if (!SolidityUtilities) throw new Error("couldn't get solidity utilities")

    if (!sourceCode) {
      if (isEthereumAddress(functionalityAddressValue)) {
        return {
          solidityVersion: await SolidityUtilities.getSolcVersion(
            functionalityAddressValue
          ),
        }
      }
      return {}
    }

    // TODO
    // sourceCode = window.getCompleteCode ? await window.getCompleteCode(sourceCode) : sourceCode

    if (!isEthereumAddress(functionalityAddressValue)) {
      const compiled = await SolidityUtilities.compile(
        sourceCode,
        solidityVersion,
        optimization
      )
      return { contracts: compiled }
    }
    const comparedContract = await SolidityUtilities.compare(
      functionalityAddressValue,
      sourceCode
    )

    return {
      contracts: comparedContract,
      solidityVersion: comparedContract?.solcVersion,
    }
  } catch (e) {
    console.log('getContractsFromCode error', e)
    throw e
  }
}

const initialSourceCode = `pragma solidity ^0.8.6;

contract MyContract {

    string private _metadataLink;

    constructor(string memory metadataLink) {
        _metadataLink = metadataLink;
    }

    function getMetadataLink() public view returns(string memory) {
        return _metadataLink;
    }

    function onStart(address, address) public {
    }

    function onStop(address) public {
    }

    //TODO: Place your code here
}`

export const newProposalInitialValues = {
  sourceCode: initialSourceCode,
  solidityVersion: '',
  functionalityName: '',
  functionalityLink: '',
  functionalityDescription: '',
  functionalityDescriptionUpdate: '',
  contractName: '',
  functionalityMethodSignature: '',
  functionalitySubmitable: false,
  functionalityInternal: false,
  functionalityNeedsSender: false,
  replacesCheck: '',
  functionalityReplace: '',
  emergency: false,
  deployed: false,
  functionalityAddressValue: '',
}
