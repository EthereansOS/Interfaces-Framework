import React from 'react'
import { Typography } from '@dfohub/design-system'
import Content from '../../components/Content'
import DappAction from '../../components/DappAction'

import style from './wusd.module.css'

const Wusd = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/wusd1.png`

  return (
    <section className={style.root}>
      <Content styles={style.wusd}>
        <img className={style.image} src={image} alt="wusd"></img>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Wrapped USD (WUSD)
          </Typography>
          <Typography variant="body2" color="black">
            One stablecoin to pool them all in all the pools of DeFi. $WUSD is
            minted at the confluence of other stablecoins, which stream out and
            collateralize it in the pools of AMMs everywhere. Free from any
            oracle or issuer, it is the most resilient and decentralized
            stablecoin out there—and the first you can farm.
          </Typography>
        </div>
        <DappAction />
      </Content>
    </section>
  )
}

export default Wusd
