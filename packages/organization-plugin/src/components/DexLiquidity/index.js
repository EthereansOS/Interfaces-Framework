import React, { useEffect, useState } from 'react'
import { Card, Typography } from '@dfohub/design-system'
import { useEthosContext, useWeb3, loadUniswapPairs } from '@dfohub/core'

import { OrganizationPropType } from '../../propTypes'

import style from './dex-liquidity.module.scss'

const DexLiquidity = ({ organization }) => {
  const context = useEthosContext()
  const { networkId, web3, web3ForLogs } = useWeb3()
  const [uniswapPairs, setUniswapPairs] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const pairs = await loadUniswapPairs(
          { web3, context, networkId, web3ForLogs },
          organization.token.options.address
        )

        setUniswapPairs(pairs)
      } catch (e) {
        console.log('error fetching uniswap pairs', e)
      }
    }

    if (organization?.token?.options?.address) {
      fetch()
    }
  }, [
    context,
    networkId,
    organization?.token?.options?.address,
    web3,
    web3ForLogs,
  ])

  // TODO keep finishing work
  return (
    <Card
      contentClassName={style.root}
      Header={
        <Typography color="primary" variant="h2">
          Dex liquidity
        </Typography>
      }></Card>
  )
}

export default DexLiquidity

DexLiquidity.propTypes = {
  organization: OrganizationPropType,
}
