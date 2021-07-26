import React from 'react'
import { Typography } from '@ethereansos/interfaces-ui'

import Content from '../../components/Content'

import style from './inflation.module.css'

const InflationDapp = () => {
  return (
    <section className={style.root}>
      <Content styles={style.inflation}>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Inflation
          </Typography>
        </div>
      </Content>
    </section>
  )
}

export default InflationDapp
