import React from 'react'
import { Card, Typography } from '@ethereansos/interfaces-ui'
import {
  useEthosContext,
  useLoadUniswapPairs,
  useWeb3,
} from '@ethereansos/interfaces-core'

import { OrganizationPropType } from '../../propTypes'

import style from './dex-liquidity.module.scss'

const DexLiquidity = ({ organization }) => {
  const context = useEthosContext()
  const { networkId, web3, web3ForLogs } = useWeb3()
  const uniswapPairs = useLoadUniswapPairs(
    { web3, context, networkId, web3ForLogs },
    organization?.token?.options?.address
  )

  // TODO need to find some org with content
  // on the production website to understand what to do
  return (
    <Card
      contentClassName={style.root}
      Header={
        <Typography color="primary" variant="h2" fontFamily="secondary">
          Dex liquidity
        </Typography>
      }>
      {uniswapPairs.length === 0 && (
        <Typography className={style.emptyText} variant="body1">
          No Uniswap V2 pair found
        </Typography>
      )}
    </Card>
  )
}

export default DexLiquidity

DexLiquidity.propTypes = {
  organization: OrganizationPropType,
}
