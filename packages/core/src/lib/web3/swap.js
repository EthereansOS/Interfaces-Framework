import web3Utils from 'web3-utils'

import { VOID_ETHEREUM_ADDRESS } from '../constants'
import stringToLines from '../stringToLines'

import sendGeneratedProposal from './sendGeneratedProposal'
import blockchainCall from './blockchainCall'
import toDecimals from './toDecimals'
import { newContract } from './contracts'

async function swap(
  { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
  element,
  amount,
  from,
  to
) {
  from && (from = web3Utils.toChecksumAddress(from))
  to && (to = web3Utils.toChecksumAddress(to))
  // if (!to) {
  //   return view.emit('message', 'You must specifiy a token', 'error')
  // }
  // if (parseFloat(amount) <= 0) {
  //   return view.emit(
  //     'message',
  //     'You must specifiy an amount greater than 0',
  //     'error'
  //   )
  // }
  var wethAddress = await blockchainCall(
    { web3, context },
    newContract(
      { web3 },
      context.uniSwapV2RouterAbi,
      context.uniSwapV2RouterAddress
    ).methods.WETH
  )
  if (
    from.toLowerCase() === wethAddress.toLowerCase() ||
    from === VOID_ETHEREUM_ADDRESS
  ) {
    from = undefined
  }
  if (
    to.toLowerCase() === wethAddress.toLowerCase() ||
    to === VOID_ETHEREUM_ADDRESS
  ) {
    to = undefined
  }
  var amountNormal = amount
  var decimals = !from
    ? 18
    : parseInt(
        await blockchainCall(
          { web3, context },
          newContract({ web3 }, context.votingTokenAbi, from).methods.decimals
        )
      )
  amount = toDecimals((amount + '').split(',').join(''), decimals)
  if (
    parseInt(amount) >
    parseInt(
      await (!from
        ? web3.eth.getBalance(element.walletAddress)
        : blockchainCall(
            { web3, context },
            newContract({ web3 }, context.votingTokenAbi, from).methods
              .balanceOf,
            element.walletAddress
          ))
    )
  ) {
    // return view.emit('message', 'Insufficient amount to swap', 'error')
  }
  var postFixedLines = stringToLines(`
interface IERC20 {
  function approve(address spender, uint256 amount) external returns (bool);
  function transfer(address recipient, uint256 amount) external returns (bool);
}

interface IMVDProxy {
  function getMVDWalletAddress() external view returns(address);
  function transfer(address receiver, uint256 value, address token) external;
}

interface IUniswapV2Router {
  function WETH() external pure returns (address);
  function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
  function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
  function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
  function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts);
}
`)
  var prefixedLines = stringToLines(
    from
      ? ''
      : `
receive() external payable {
}
`
  )
  var lines = stringToLines(`
IMVDProxy proxy = IMVDProxy(msg.sender);
proxy.transfer(address(this), ${amount}, ${from ? from : `address(0)`});
address dfoWalletAddress = proxy.getMVDWalletAddress();
IUniswapV2Router uniswapV2Router = IUniswapV2Router(${web3Utils.toChecksumAddress(
    context.uniSwapV2RouterAddress
  )});
address[] memory path = new address[](2);
path[0] = ${from ? from : `uniswapV2Router.WETH()`};
path[1] = ${to ? to : `uniswapV2Router.WETH()`};
${
  !from
    ? null
    : `IERC20(${from}).approve(${web3Utils.toChecksumAddress(
        context.uniSwapV2RouterAddress
      )}, ${amount});`
}
uint[] memory result = uniswapV2Router.swapExact${from ? 'Tokens' : 'ETH'}For${
    to ? 'Tokens' : 'ETH'
  }${from ? '' : `{value: ${amount}}`}(${
    from ? `${amount}, ` : ''
  }uniswapV2Router.getAmountsOut(${amount}, path)[1], path, dfoWalletAddress, block.timestamp + 1000);
if(${amount} > result[0]) {
  ${
    from
      ? `IERC20(${from}).transfer(dfoWalletAddress, `
      : `payable(dfoWalletAddress).transfer(`
  }${amount} - result[0]);
}
`)
  var descriptions = [
    `Swapping ${amountNormal} ${
      from
        ? await blockchainCall(
            { web3, context },
            newContract({ web3 }, context.votingTokenAbi, from).methods.symbol
          )
        : 'ETH'
    } for ${
      to
        ? await blockchainCall(
            { web3, context },
            newContract({ web3 }, context.votingTokenAbi, to).methods.symbol
          )
        : 'ETH'
    }`,
  ]
  const proposal = sendGeneratedProposal(
    { web3, context, networkId, ipfsHttpClient, walletAddress, ethosEvents },
    element,
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
    prefixedLines,
    postFixedLines
  )

  return proposal
}

export default swap
