import getEthereumPrice from './getEthereumPrice'
import blockchainCall from './blockchainCall'
import toDecimals from './toDecimals'
import formatMoney from './formatMoney'
import fromDecimals from './fromDecimals'

async function refreshBalances(
  { web3, context, dfoHub, uniswapV2Router, wethAddress, walletAddress },
  element,
  silent
) {
  if (!element || !element.token) {
    return
  }
  const ethereumPrice = await getEthereumPrice({ context })

  element.balanceOf = await blockchainCall(
    { web3, context },
    element.token.methods.balanceOf,
    dfoHub.walletAddress
  )

  element.communityTokens = await blockchainCall(
    { web3, context },
    element.token.methods.balanceOf,
    element.walletAddress
  )

  element.communityTokensDollar = '0'
  element.singleCommunityTokenDollar = '0'
  element.availableSupply = web3.utils
    .toBN(element.totalSupply)
    .sub(web3.utils.toBN(element.communityTokens))
    .toString()
  element.unlockedMarketCapDollar = 0
  element.walletETH = await web3.eth.getBalance(element.walletAddress)
  element.walletETHDollar = ethereumPrice
  element.walletBUIDL = await blockchainCall(
    { web3, context },
    dfoHub.token.methods.balanceOf,
    element.walletAddress
  )
  element.walletBUIDLDollar = '0'
  /*element.walletUSDC = '0';
  element.walletUSDCDollar = '0';
  element.walletDAI = '0';
  element.walletDAIDollar = '0';
  try {
      element.walletDAI = await window.blockchainCall(window.newContract(window.context.votingTokenAbi, window.getNetworkElement("daiTokenAddress")).methods.balanceOf, element.walletAddress);
      element.walletDAIDollar = fromDecimals({web3}, (await window.blockchainCall(uniswapV2Router.methods.getAmountsOut, window.toDecimals('1', 18), [window.getNetworkElement("daiTokenAddress"), wethAddress]))[1], 18, true);
      element.walletDAIDollar = parseFloat(fromDecimals({web3}, element.walletDAI, 18, true)) * parseFloat(element.walletDAIDollar) * ethereumPrice;
  } catch (e) {}*/

  try {
    element.communityTokensDollar = fromDecimals(
      (
        await blockchainCall(
          { web3, context },
          uniswapV2Router.methods.getAmountsOut,
          toDecimals('1', element.decimals),
          [element.token.options.address, wethAddress]
        )
      )[1],
      18,
      true
    )
    element.singleCommunityTokenDollar = element.communityTokensDollar
    element.communityTokensDollar =
      parseFloat(fromDecimals(element.communityTokens, 18, true)) *
      element.communityTokensDollar *
      ethereumPrice
    /*element.walletUSDC = await window.blockchainCall(window.newContract(window.context.votingTokenAbi, window.getNetworkElement("usdcTokenAddress")).methods.balanceOf, element.walletAddress);
    element.walletUSDCDollar = fromDecimals((await window.blockchainCall(uniswapV2Router.methods.getAmountsOut, window.toDecimals('1', 6), [window.getNetworkElement("usdcTokenAddress"), wethAddress]))[1], 18, true);
    element.walletUSDCDollar = parseFloat(fromDecimals({web3}, element.walletUSDC, 6, true)) * parseFloat(element.walletUSDCDollar) * ethereumPrice;*/
  } catch (e) {
    console.error(e)
  }

  try {
    element.walletBUIDLDollar = fromDecimals(
      (
        await blockchainCall(
          { web3, context },
          uniswapV2Router.methods.getAmountsOut,
          toDecimals('1', dfoHub.decimals),
          [dfoHub.token.options.address, wethAddress]
        )
      )[1],
      18,
      true
    )
    element.walletBUIDLDollar =
      parseFloat(fromDecimals(element.walletBUIDL, 18, true)) *
      element.walletBUIDLDollar *
      ethereumPrice
  } catch (e) {
    console.error(e)
  }

  element.walletCumulativeDollar =
    element.communityTokensDollar +
    element.walletETHDollar +
    element.walletUSDCDollar
  element.key !== 'DFO' &&
    (element.walletCumulativeDollar += element.walletBUIDLDollar)
  element.walletCumulativeDollar &&
    (element.walletCumulativeDollar = formatMoney(
      element.walletCumulativeDollar
    ))
  //element.walletUSDCDollar && (element.walletUSDCDollar = formatMoney(element.walletUSDCDollar));
  element.communityTokensDollar &&
    (element.communityTokensDollar = formatMoney(element.communityTokensDollar))
  try {
    element.unlockedMarketCapDollar =
      parseFloat(element.singleCommunityTokenDollar.split(',').join('.')) *
      parseFloat(fromDecimals(element.availableSupply, element.decimals, true))
  } catch (e) {
    console.error(e)
  }
  try {
    element.lockedMarketCapDollar =
      parseFloat(element.singleCommunityTokenDollar.split(',').join('.')) *
      parseFloat(fromDecimals(element.communityTokens, element.decimals, true))
  } catch (e) {}
  try {
    element.totalMarketCapDollar =
      parseFloat(element.singleCommunityTokenDollar.split(',').join('.')) *
      parseFloat(fromDecimals(element.totalSupply, element.decimals, true))
  } catch (e) {}
  element.walletETHDollar &&
    (element.walletETHDollar = formatMoney(element.walletETHDollar))
  element.walletBUIDLDollar &&
    (element.walletBUIDLDollar = formatMoney(element.walletBUIDLDollar))
  //element.walletDAIDollar && (element.walletDAIDollar = formatMoney(element.walletDAIDollar));

  element.myBalanceOf = walletAddress
    ? await blockchainCall(
        { web3, context },
        element.token.methods.balanceOf,
        walletAddress
      )
    : '0'

  // FIXME the walletAddress is always empty, and the blockchaincall is called always with the same value
  // if (!silent) {
  //   // Get the last version of the list
  //   const list = getState().list || []

  //   Object.keys(list).map(async function (key, i) {
  //     if (element.key === key) {
  //       return
  //     }
  //     const e = { ...list[key] }
  //     if (!e.token) {
  //       return
  //     }
  //     const newBalance = walletAddress
  //       ? await blockchainCall(
  //           { web3, context },
  //           e.token.methods.balanceOf,
  //           walletAddress
  //         )
  //       : '0'

  //     // TODO This is a function that should be defined to
  //     // updateElement({ ...e, myBalanceOf: newBalance })
  //   })
  // }
}

export default refreshBalances
