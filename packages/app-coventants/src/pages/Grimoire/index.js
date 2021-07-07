import React from 'react'
import { Typography } from '@dfohub/design-system'
import Content from '../../components/Content'
import DappAction from '../../components/DappAction'

import style from './grimoire.module.css'

const GrimoirePage = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/grimoire1.png`

  return (
    <section className={style.root}>
      <Content styles={style.grimoire}>
        <img className={style.image} src={image} alt="grimoire"></img>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Grimoire
          </Typography>
          <Typography variant="body2" color="black">
            Issued by the School of Responsible Wizardry, the Grimoire is the
            official Covenant spellbook. It will teach you all about Covenant
            magic so that you can tap into its full potential.
          </Typography>
        </div>
        <DappAction />
      </Content>
    </section>
  )
}

export default GrimoirePage
