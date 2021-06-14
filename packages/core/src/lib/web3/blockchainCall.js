import getSendingOptions from './getSendingOptions'
import sendBlockchainTransaction from './sendBlockchainTransaction'

async function blockchainCall({ web3, context }, value, oldCall) {
  const args = []
  const call = value !== undefined && isNaN(value) ? value : oldCall
  for (let i = value === call ? 2 : 3; i < arguments.length; i++) {
    arguments[i] !== undefined &&
      arguments[i] !== null &&
      args.push(arguments[i])
  }
  value = isNaN(value) ? undefined : value
  const method = (
    call.implementation ? call.get : call.new ? call.new : call
  ).apply(call, args)

  const sendingOptions = await getSendingOptions({ web3 })
  const ret =
    method._method.stateMutability === 'view' ||
    method._method.stateMutability === 'pure'
      ? method.call(sendingOptions)
      : sendBlockchainTransaction({ web3, context }, value, method)
  return ret
}

export default blockchainCall
