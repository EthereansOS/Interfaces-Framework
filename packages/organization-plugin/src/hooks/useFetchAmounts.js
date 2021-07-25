import { useEffect, useState } from 'react'
import {
  blockchainCall,
  fromDecimals,
  getEthereumPrice,
  getLogs,
  toDecimals,
  toSubArrays,
  VOID_ETHEREUM_ADDRESS,
  newContract,
  web3Utils,
  useIsUnmounted,
} from '@ethereansos/interfaces-core'

export default function useFetchAmounts(
  { context, web3, web3ForLogs, networkId, wethAddress },
  organization,
  tokens
) {
  const unmounted = useIsUnmounted()
  const [amounts, setAmounts] = useState({
    cumulativeAmountDollar: 0,
    tokenAmounts: [],
  })

  useEffect(() => {
    const fetchAmounts = async () => {
      const uniswapV2Router = newContract(
        { web3 },
        context.uniSwapV2RouterAbi,
        context.uniSwapV2RouterAddress
      )

      const tokenAmounts = tokens.map((_, i) => {
        return {
          i,
          amount: '0',
          amountDollars: 0,
        }
      })

      try {
        let cumulativeAmountDollar = 0
        const ethereumPrice = await getEthereumPrice({ context })

        try {
          tokenAmounts[0].amount = await web3.eth.getBalance(
            organization?.walletAddress
          )
        } catch (e) {
          tokenAmounts[0].amount = '0'
        }

        cumulativeAmountDollar += tokenAmounts[0].amountDollars =
          ethereumPrice * parseFloat(fromDecimals(tokenAmounts[0].amount, 18))
        const allAddresses = tokens
          .filter((token) => token !== true && token !== false)
          .map((token) => web3Utils.toChecksumAddress(token.address))
        const addresses = toSubArrays(allAddresses)

        for (const address of addresses) {
          const logs = await getLogs(
            { web3, web3ForLogs, context, networkId },
            {
              address,
              topics: [
                web3.utils.sha3('Transfer(address,address,uint256)'),
                [],
                web3.eth.abi.encodeParameter(
                  'address',
                  organization?.walletAddress
                ),
              ],
              fromBlock: organization?.startBlock,
              toBlock: 'latest',
            }
          )

          const onlyUnique = (value, index, self) => {
            return self.indexOf(value) === index
          }
          const involvedAddresses = logs
            .map((it) => web3Utils.toChecksumAddress(it.address))
            .filter(onlyUnique)

          for (const involvedAddress of involvedAddresses) {
            const tokenIndex = tokens.findIndex(
              (token) =>
                token !== true &&
                token !== false &&
                web3Utils.toChecksumAddress(token.address) === involvedAddress
            )
            // TODO this is a react state's reference and is mutated throughout the code
            // fix it
            const token = tokens[tokenIndex]
            const tokenAmount = tokenAmounts[tokenIndex] || {}
            try {
              tokenAmount.amount =
                token.address === VOID_ETHEREUM_ADDRESS
                  ? await web3.eth.getBalance(organization?.walletAddress)
                  : await blockchainCall(
                      { web3, context },
                      token.token.methods.balanceOf,
                      organization?.walletAddress
                    )

              tokenAmount.amountDollars =
                token.address === VOID_ETHEREUM_ADDRESS
                  ? '1'
                  : fromDecimals(
                      (
                        await blockchainCall(
                          { web3, context },
                          uniswapV2Router.methods.getAmountsOut,
                          toDecimals('1', token.decimals),
                          [token.address, wethAddress]
                        )
                      )[1],
                      18,
                      true
                    )

              tokenAmount.amountDollars =
                parseFloat(
                  fromDecimals(tokenAmount.amount, token.decimals, true)
                ) *
                parseFloat(tokenAmount.amountDollars) *
                ethereumPrice
            } catch (e) {}

            cumulativeAmountDollar += tokenAmount.amountDollars
            if (unmounted.current) {
              break
            }
            setAmounts({ cumulativeAmountDollar, tokenAmounts })
          }
        }

        setAmounts({ cumulativeAmountDollar, tokenAmounts, loaded: true })
      } catch (e) {
        console.log('Error fetching amounts', e)
      }
    }

    if (tokens.length && organization?.walletAddress) {
      fetchAmounts()
    }
  }, [
    context,
    tokens,
    organization?.walletAddress,
    organization?.startBlock,
    web3,
    web3ForLogs,
    networkId,
    wethAddress,
    unmounted,
  ])

  return amounts
}
