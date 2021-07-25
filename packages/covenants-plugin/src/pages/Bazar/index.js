import React from 'react'
import { Typography } from '@dfohub/design-system'

import Content from '../../components/Content'

import style from './bazar.module.css'

const BazarDapp = () => {
  return (
    <section className={style.root}>
      <Content styles={style.bazar}>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Bazar
          </Typography>
        </div>
      </Content>
    </section>
  )
}

export default BazarDapp
