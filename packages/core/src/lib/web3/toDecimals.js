import web3Utils from 'web3-utils'

import toEthereumSymbol from './toEthereumSymbol'
import numberToString from './numberToString'

function toDecimals(number, decimals) {
  number = Number(!isNaN(number?.value) ? number.value : number)
  decimals = Number(!isNaN(decimals?.value) ? decimals.value : decimals) || 18

  if (!number) {
    return '0'
  }

  const symbol = toEthereumSymbol(decimals)
  if (symbol) {
    return web3Utils.toWei(numberToString(number), symbol)
  }
  return numberToString(number * (decimals < 2 ? 1 : Math.pow(10, decimals)))
}

export default toDecimals
