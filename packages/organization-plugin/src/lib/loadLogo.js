import {
  VOID_ETHEREUM_ADDRESS,
  web3Utils,
  formatString,
} from '@ethereansos/interfaces-core'

async function loadLogo({ context }, address) {
  address = web3Utils.toChecksumAddress(address)
  let logo =
    address === VOID_ETHEREUM_ADDRESS
      ? `${process.env.PUBLIC_URL}/assets/img/eth-logo.png`
      : formatString(context.trustwalletImgURLTemplate, address)

  try {
    // Used to check if resource response is 404
    const res = await fetch(logo)
    if (!res.ok) {
      throw res
    }
  } catch (e) {
    logo = `${process.env.PUBLIC_URL}/assets/img/default-logo.png`
  }

  return logo
}

export default loadLogo
