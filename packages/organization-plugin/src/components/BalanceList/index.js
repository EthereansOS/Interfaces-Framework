import React, { useEffect, useRef, useState } from 'react'
import {
  blockchainCall,
  fromDecimals,
  getEthereumPrice,
  getLogs,
  getNetworkElement,
  toDecimals,
  useEthosContext,
  useWeb3,
  toSubArrays,
  VOID_ETHEREUM_ADDRESS,
  newContract,
  formatMoney,
  web3Utils,
} from '@dfohub/core'
import { Balance } from '@dfohub/components'
import {
  Card,
  Typography,
  Chip,
  Link,
  CircularProgress,
} from '@dfohub/design-system'

import { OrganizationPropType } from '../../propTypes'
import loadOffChainWallets from '../../../../core/src/lib/web3/loadOffchainWallets'
import { useOrganizationContext } from '../../OrganizationContext'

import style from './balance-list.module.scss'

export const BalanceList = ({ organization }) => {
  const { web3, networkId, web3ForLogs, wethAddress } = useWeb3()
  const context = useEthosContext()
  const { isEditMode } = useOrganizationContext()
  const [tokens, setTokens] = useState([])
  const [amounts, setAmounts] = useState({
    cumulativeAmountDollar: 0,
    tokenAmounts: [],
  })
  // this is used to stop the below for of loop if the component is unmounted
  const unmounted = useRef(false)

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const wallets = await loadOffChainWallets({ web3, context, networkId })
        const walletsTokens = Object.values(wallets).flatMap((token) => token)
        const tokens = [
          {
            address: VOID_ETHEREUM_ADDRESS,
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: '18',
            logo: 'assets/img/eth-logo.png',
          },
          ...walletsTokens,
        ]

        setTokens(tokens)
      } catch (e) {
        console.log('Error fetching wallets', e)
      }
    }

    fetchWallets()
  }, [context, networkId, web3])

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
  ])

  useEffect(() => {
    return () => {
      unmounted.current = true
    }
  }, [])

  if (!organization) return <CircularProgress />

  return (
    <Card
      headerClassName={style.cardHeader}
      contentClassName={style.root}
      Header={
        <Typography variant="h2" color="primary">
          {organization.name} Balances{' '}
          <Typography variant="h5" color="primary">
            (Tracked: ${formatMoney(amounts.cumulativeAmountDollar)})
          </Typography>{' '}
          <Link
            external
            href={
              getNetworkElement({ context, networkId }, 'etherscanURL') +
              'tokenHoldings?a=' +
              organization?.walletAddress
            }>
            <Chip size="small">
              <span role="img" aria-label="gem">
                💎
              </span>{' '}
              Etherscan
            </Chip>
          </Link>
        </Typography>
      }>
      {tokens.map((token, i) => (
        <Balance
          key={i}
          token={token}
          tokenPrice={
            amounts.tokenAmounts[i]?.amountDollars &&
            formatMoney(amounts.tokenAmounts[i]?.amountDollars)
          }
          tokenAmount={
            amounts.tokenAmounts[i]?.amount &&
            fromDecimals(amounts.tokenAmounts[i]?.amount, token.decimals)
          }
          showActions={isEditMode}
          className={style.balance}
        />
      ))}
    </Card>
  )
}

BalanceList.propTypes = {
  organization: OrganizationPropType,
}

export default BalanceList
