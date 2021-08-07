import {
  isEthereumAddress,
  getSolidityUtilities,
} from '@ethereansos/interfaces-core'

export function checkData(data, errors) {
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
