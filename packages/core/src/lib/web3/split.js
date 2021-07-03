import web3Utils from 'web3-utils'

import { BASE64_REGEXP } from '../constants'

function split({ context }, content, length) {
  const regex = new RegExp(BASE64_REGEXP).exec(content)

  content =
    regex && regex.index === 0
      ? content
      : 'data:text/plain;base64,' + btoa(content)

  let data = web3Utils.fromUtf8(content)
  const inputs = []
  const defaultLength = (length || context.singleTokenLength) - 2
  if (data.length <= defaultLength) {
    inputs.push(data)
  } else {
    while (data.length > 0) {
      const length = data.length < defaultLength ? data.length : defaultLength
      let piece = data.substring(0, length)
      data = data.substring(length)
      if (inputs.length > 0) {
        piece = '0x' + piece
      }
      inputs.push(piece)
    }
  }
  return inputs
}

export default split
