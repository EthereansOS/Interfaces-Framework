import React from 'react'
import { Typography } from '@dfohub/design-system'
import Content from '../../components/Content'
import DappAction from '../../components/DappAction'

import style from './inflation.module.css'

const InflationPage = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/inflation1.png`

  return (
    <section className={style.root}>
      <Content styles={style.inflation}>
        <img className={style.image} src={image} alt="inflation"></img>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Inflation
          </Typography>
          <Typography variant="body2" color="black">
            Covenant inflation contracts allow Ethereans to fund their magical
            projects in a fair and safe way. Anyone can set one up to inflate
            any variety of tokens at daily, weekly and monthly intervals via
            minting, swapping and transferring. Don’t depend on ICOs or worry
            about soliciting investors anymore.
          </Typography>
        </div>
        <DappAction />
      </Content>
    </section>
  )
}

export default InflationPage
