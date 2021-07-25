import React from 'react'
import { Typography } from '@dfohub/design-system'

import Content from '../../components/Content'

import style from './craft.module.css'

const CraftDapp = () => {
  return (
    <section className={style.root}>
      <Content styles={style.craft}>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Crafting
          </Typography>
        </div>
      </Content>
    </section>
  )
}

export default CraftDapp
