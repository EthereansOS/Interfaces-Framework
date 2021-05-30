import getSendingOptions from './getSendingOptions'
import sendBlockchainTransaction from './sendBlockchainTransaction'

async function blockchainCall(web3, context, value, oldCall) {
  const args = []
  const call = value !== undefined && isNaN(value) ? value : oldCall
  for (let i = value === call ? 3 : 4; i < arguments.length; i++) {
    arguments[i] && args.push(arguments[i])
  }
  value = isNaN(value) ? undefined : value

  const method = (
    call.implementation ? call.get : call.new ? call.new : call
  ).apply(call, args)

  return method._method.stateMutability === 'view' ||
    method._method.stateMutability === 'pure'
    ? method.call(await getSendingOptions(web3))
    : sendBlockchainTransaction(web3, context, value, method)
}

export default blockchainCall
