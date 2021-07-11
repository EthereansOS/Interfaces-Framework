import React, { useEffect, useState } from 'react'
import { Card, Chip, Link, Typography } from '@dfohub/design-system'
import {
  formatLink,
  fromDecimals,
  getNetworkElement,
  useEthosContext,
  useWeb3,
  formatString,
} from '@dfohub/core'

import { OrganizationPropType } from '../../propTypes'

import style from './dex-liquidity.module.scss'

const DexLiquidity = ({ organization }) => {
  const context = useEthosContext()
  const { networkId } = useWeb3()

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
