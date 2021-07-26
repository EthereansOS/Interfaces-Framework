import React from 'react'
import { Typography } from '@ethereansos/interfaces-ui'

import Content from '../../components/Content'

import style from './farm.module.css'

const FarmDapp = () => {
  return (
    <section className={style.root}>
      <Content styles={style.farm}>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Farm
          </Typography>
        </div>
      </Content>
    </section>
  )
}

export default FarmDapp
