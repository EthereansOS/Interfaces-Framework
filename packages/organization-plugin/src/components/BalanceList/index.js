import React from 'react'
import {
  fromDecimals,
  getNetworkElement,
  useEthosContext,
  useWeb3,
  formatMoney,
  swap,
  transfer,
} from '@dfohub/core'
import { Balance } from '@dfohub/components'
import {
  Card,
  Typography,
  Chip,
  Link,
  CircularProgress,
} from '@dfohub/design-system'
import { useHistory, useParams } from 'react-router-dom'

import { OrganizationPropType } from '../../propTypes'
import { useOrganizationContext } from '../../OrganizationContext'
import useFetchWallets from '../../hooks/useFetchWallets'
import useFetchAmounts from '../../hooks/useFetchAmounts'

import style from './balance-list.module.scss'

export const BalanceList = ({ organization }) => {
  const { web3, networkId, web3ForLogs, wethAddress } = useWeb3()
  const context = useEthosContext()
  const { isEditMode, showProposalModal } = useOrganizationContext()
  const tokens = useFetchWallets({ web3, context, networkId })
  const amounts = useFetchAmounts(
    {
      context,
      web3,
      web3ForLogs,
      networkId,
      wethAddress,
    },
    organization,
    tokens
  )
  const history = useHistory()
  const params = useParams()

  if (!organization) return <CircularProgress />

  const onProposalSuccess = () => {
    history.push(`/organizations/${params.address}/governance/proposals`)
  }

  const onSwapSubmit = async (values, token) => {
    if (!organization) {
      return
    }

    try {
      const ctx = await transfer(
        {
          web3,
          context,
          wethAddress,
        },
        organization,
        values.amount,
        token.address,
        values.token
      )

      showProposalModal({
        initialContext: ctx,
        title: ctx.title,
        onProposalSuccess,
      })
    } catch (e) {
      console.log('error swapping tokens', e)
    }
  }

  const onTransferSubmit = async (values, token) => {
    if (!organization) {
      return
    }

    try {
      const ctx = await transfer(
        {
          web3,
          context,
          wethAddress,
        },
        organization,
        token.address,
        values.amount,
        values.address
      )

      showProposalModal({
        initialContext: ctx,
        title: ctx.title,
        onProposalSuccess,
      })
    } catch (e) {
      console.log('error swapping tokens', e)
    }
  }

  return (
    <Card
      headerClassName={style.cardHeader}
      contentClassName={style.root}
      Header={
        <Typography variant="h2" color="primary" fontFamily="secondary">
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
          onTransferSubmit={(values) => onTransferSubmit(values, token)}
          onSwapSubmit={(values) => onSwapSubmit(values, token)}
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
