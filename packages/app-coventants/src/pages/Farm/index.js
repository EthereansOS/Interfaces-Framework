import React from 'react'
import { Typography } from '@ethereansos/interfaces-ui'
import Content from '../../components/Content'
import DappAction from '../../components/DappAction'

import style from './farm.module.css'

const Farm = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/farm1.png`

  return (
    <section className={style.root}>
      <Content styles={style.farm}>
        <img className={style.image} src={image} alt="farm"></img>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Farm
          </Typography>
          <Typography variant="body2" color="black">
            Ethereans love to farm. They do it all day and night - apes,
            penguins and wizards alike. But farming in DeFi is not always
            well-managed, and the hard-earned harvests of farmers are often at
            risk. Covenant farming contracts allow us to farm safely and on our
            own terms and across multiple AMMs simultaneously. Anyone can
            create, host or stake in Free and Locked setups without having to
            trust anyone.
          </Typography>
        </div>
        <DappAction />
      </Content>
    </section>
  )
}

export default Farm
