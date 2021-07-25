import React from 'react'
import { Typography } from '@dfohub/design-system'

import Content from '../../components/Content'

import style from './wusd.module.css'

const Wusd = () => {
  return (
    <section className={style.root}>
      <Content styles={style.wusd}>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            WUSD
          </Typography>
        </div>
      </Content>
    </section>
  )
}

export default Wusd
