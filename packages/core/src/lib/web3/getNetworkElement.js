function getNetworkElement({ context, networkId }, element) {
  // TODO: fix me: how this work if it's a number when set networkId?
  // https://github.com/EthereansOS/Organizations-Interface/blob/master/assets/scripts/script.js#L260
  const network = context.ethereumNetwork[networkId]
  if (network === undefined || network === null) {
    return
  }
  return context[element + network]
}

export default getNetworkElement
