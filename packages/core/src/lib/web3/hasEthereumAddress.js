import { VOID_ETHEREUM_ADDRESS } from '../constants'

import isEthereumAddress from './isEthereumAddress'

function hasEthereumAddress(address) {
  return isEthereumAddress(address) && address !== VOID_ETHEREUM_ADDRESS
}

export default hasEthereumAddress
