import { formatString } from '@dfohub/core'
import web3Utils from 'web3-utils'

import getNetworkElement from './getNetworkElement'
import formatLink from './formatLink'
import { newContract } from './contracts'

// these function declarations was found
// INSIDE the loadOffChainWallets therefore it's here
async function loadLogoWork({ context }, token) {
  token.logoURI =
    token.logoURI ||
    formatString(
      context.trustwalletImgURLTemplate,
      web3Utils.toChecksumAddress(token.address)
    )
  token.logoURI = formatLink({ context }, token.logoURI)
  try {
    // Used to check if resource response is 404
    const res = await fetch(token.logoURI)
    if (!res.ok) {
      throw res
    }
  } catch (e) {
    token.logoURI = 'assets/img/default-logo.png'
  }
  token.logo = token.logoURI
}

async function loadOffChainWallets({ web3, context, networkId }) {
  if (context.bypassTokens) {
    return
  }
  context.outOfStandardTokens = context.outOfStandardTokens.map((it) =>
    web3Utils.toChecksumAddress(it)
  )

  const filter = (it) =>
    it.chainId === networkId &&
    context.outOfStandardTokens.indexOf(
      web3Utils.toChecksumAddress(it.address)
    ) === -1

  // window.tokensList has been removed. It was assigned only
  // in this function, for caching, after having fetched the list
  // it's also referenced inside the "onEthereumUpdate" method, but can be ignored and removed

  const reqs = [
    fetch(
      getNetworkElement(
        { context, networkId },
        'decentralizedFlexibleOrganizationsURL'
      )
    ),
    fetch(context.itemsListURL),
    fetch(context.uniswapTokensURL),
    fetch(context.indexesURL),
  ]

  try {
    const reqsRes = (await Promise.all(reqs)).map((req) => req.json())
    const parsedRes = await Promise.all(reqsRes)

    const tokensList = {
      'Programmable Equities': parsedRes[0].tokens.filter(filter),
      Items: parsedRes[1].tokens.filter(filter),
      Tokens: parsedRes[2].tokens.filter(filter),
      Indexes: parsedRes[3].tokens.filter(filter),
    }
    tokensList.Items.forEach((it) => (it.symbol = it.name))
    // window.itemsTokens = tokensList.Items seems unused by whole project

    const keys = Object.keys(tokensList)
    for (const key of keys) {
      if (key === 'Indexes') {
        continue
      }
      const tokens = tokensList[key]
      for (let i = 0; i < tokens.length; i++) {
        const token = tokensList[key][i]
        if (token === true || token === false) {
          continue
        }
        token.address = web3Utils.toChecksumAddress(token.address)
        token.listName = key
        token.token =
          token.token ||
          newContract({ web3 }, context.votingTokenAbi, token.address)
        loadLogoWork({ context }, token)

        // window.loadedTokens has been removed. Both this function and the "loadTokenInfos" modified and used it
        // there shouldn't be problems avoiding to share this value

        tokensList[key][i] = token
      }
    }

    return tokensList
  } catch (e) {
    throw e
  }
}

export default loadOffChainWallets
