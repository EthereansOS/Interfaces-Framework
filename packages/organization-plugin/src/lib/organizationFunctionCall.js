import {
  blockchainCall,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

function stringifyParameters(response) {
  const r = []
  const l = parseInt(response.__length__)
  for (let i = 0; i < l; i++) {
    r.push(response[i + ''])
  }
  return JSON.stringify(r)
}

async function organizationFunctionCall(
  { web3, context },
  organization,
  type,
  codeName,
  inputParameters,
  args,
  returnAbiParametersArray,
  needsSender
) {
  inputParameters && needsSender && type !== 'read' && args.unshift(0)
  inputParameters && needsSender && args.unshift(VOID_ETHEREUM_ADDRESS)
  inputParameters &&
    (args = web3.eth.abi.encodeParameters(inputParameters, args))
  const data = await blockchainCall(
    { web3, context },
    organization.dFO.methods[type],
    codeName,
    args
  )
  console.log('organizationFunctionCall RESULT', data)

  return type === 'read'
    ? stringifyParameters(
        web3.eth.abi.decodeParameters(returnAbiParametersArray, data)
      )
    : ''
}

export default organizationFunctionCall
