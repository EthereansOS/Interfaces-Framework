import React from 'react'
import { Typography } from '@dfohub/design-system'
import Content from '../../components/Content'
import DappAction from '../../components/DappAction'

import style from './bazar.module.css'

const BazarPage = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/bazar1.png`

  return (
    <section className={style.root}>
      <Content styles={style.bazar}>
        <img className={style.image} src={image} alt="bazar"></img>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Bazar
          </Typography>
          <Typography variant="body2" color="black">
            Take a walk through the Bazar, bustling with busy DeFi creatures.
            Here you can mint, burn and create your very own Index Tokens, or
            make creative use of the Aggregator by conducting on-chain cross-AMM
            arbitrage and multi-swaps.
          </Typography>
        </div>
        <DappAction />
      </Content>
    </section>
  )
}

export default BazarPage
