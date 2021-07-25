import web3Utils from 'web3-utils'

import { VOID_ETHEREUM_ADDRESS } from '../constants'
import shortenWord from '../shortenWords'
import stringToLines from '../stringToLines'

import blockchainCall from './blockchainCall'
import sendGeneratedProposal from './sendGeneratedProposal'
import toDecimals from './toDecimals'
import formatMoney from './formatMoney'
import { newContract } from './contracts'
import loadTokenInfos from './loadTokenInfos'

async function transfer(
  { web3, context, wethAddress },
  organization,
  tokenAddress,
  amounts,
  sendTos,
  tokenId,
  payload
) {
  sendTos = !sendTos ? [] : sendTos instanceof Array ? sendTos : [sendTos]
  // TODO
  // if (sendTos.length === 0) {
  //   return view.emit(
  //     'message',
  //     'You must specify at least a valid Ethereum address to proceed',
  //     'error'
  //   )
  // }
  amounts = amounts instanceof Array ? amounts : [amounts]
  var amount = 0
  var tokenData = await loadTokenInfos(
    { web3, context },
    !tokenAddress ||
      tokenAddress === wethAddress ||
      tokenAddress === VOID_ETHEREUM_ADDRESS
      ? wethAddress
      : tokenAddress,
    undefined,
    true
  )
  var decimals = await blockchainCall(
    { web3, context },
    tokenData.token.methods.decimals
  )
  try {
    for (var i = 0; i < sendTos.length; i++) {
      sendTos[i] = web3Utils.toChecksumAddress(sendTos[i])
      if (amounts.length - 1 < i) {
        amounts.push(amounts[0])
      }
      amount += parseFloat((amounts[i] = (amounts[i] + '').split(',').join('')))
      amounts[i] = toDecimals(amounts[i], decimals)
    }
  } catch (e) {
    // TODO
    // return view.emit('message', e.message || e, 'error')
  }
  if (!tokenId && amount <= 0) {
    // TODO
    // return view.emit(
    //   'message',
    //   'You must specify a number greater 0 to proceed',
    //   'error'
    // )
  }
  var amountWei = toDecimals(amount, decimals)
  amount = formatMoney(amount)
  tokenAddress = tokenAddress
    ? web3Utils.toChecksumAddress(tokenAddress)
    : tokenAddress
  var symbol = 'ETH'
  try {
    tokenAddress &&
      tokenAddress != VOID_ETHEREUM_ADDRESS &&
      tokenAddress !== wethAddress &&
      (symbol = await blockchainCall(
        { web3, context },
        newContract({ web3 }, context.votingTokenAbi, tokenAddress).methods
          .symbol
      ))
  } catch (e) {
    symbol = 'NFT'
  }
  var walletAddress = await blockchainCall(
    { web3, context },
    organization.dFO.methods.getMVDWalletAddress
  )
  var balanceOf =
    symbol === 'ETH'
      ? await web3.eth.getBalance(walletAddress)
      : await blockchainCall(
          { web3, context },
          newContract({ web3 }, context.votingTokenAbi, tokenAddress).methods
            .balanceOf,
          walletAddress
        )
  if (!tokenId && parseInt(amountWei) > parseInt(balanceOf)) {
    // TODO
    // return view.emit(
    //   'message',
    //   'Specified amount to transfer is greater than the total available balance',
    //   'error'
    // )
  }
  if (tokenId) {
    var erc721 = newContract({ web3 }, context.ERC721Abi, tokenAddress)
    if (
      organization.walletAddress.toLowerCase() !==
      (
        await blockchainCall({ web3, context }, erc721.methods.ownerOf, tokenId)
      ).toLowerCase()
    ) {
      // TODO
      // return view.emit('message', 'Cannot transfer not-owned NFT', 'error')
    }
  }
  tokenAddress = tokenAddress || 'address(0)'

  // TODO
  // view.emit('message')
  var postFixedLines = stringToLines(`
interface IMVDProxy {
  function transfer(address receiver, uint256 value, address token) external;
  function transfer721(address receiver, uint256 tokenId, bytes calldata data, bool safe, address token) external;
} 
`)
  var lines = stringToLines(`
IMVDProxy proxy = IMVDProxy(msg.sender);
${sendTos
  .map((it, i) =>
    !tokenId
      ? `proxy.transfer(${it}, ${amounts[i]}, ${tokenAddress});`
      : `proxy.transfer721(${it}, ${tokenId}, ${payload}, true, ${tokenAddress});`
  )
  .join('\n')}
`)
  var descriptions = [
    `Transfering ${tokenId ? `${symbol} token #` : 'totally'} ${
      tokenId ? shortenWord({ context }, tokenId, 10) : amount
    } ${tokenId ? '' : symbol} to specified address${!tokenId ? 'es' : ''}`,
  ]

  return sendGeneratedProposal(
    organization,
    {
      title: descriptions[0],
      functionalityName: '',
      functionalityMethodSignature: 'callOneTime(address)',
      functionalitySubmitable: false,
      functionalityReplace: '',
      functionalityOutputParameters: '[]',
    },
    context.oneTimeProposalTemplate,
    lines,
    descriptions,
    undefined,
    undefined,
    postFixedLines
  )
}

export default transfer
