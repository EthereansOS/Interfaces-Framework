import React from 'react'
import { Typography } from '@ethereansos/interfaces-ui'
import Content from '../../components/Content'
import DappAction from '../../components/DappAction'

import style from './craft.module.css'

const Craft = () => {
  const image = `${process.env.PUBLIC_URL}/assets/images/craft1.png`

  return (
    <section className={style.root}>
      <Content styles={style.craft}>
        <img className={style.image} src={image} alt="craft"></img>
        <div className={style.content}>
          <Typography className={style.title} variant="h3" color="black">
            Crafting
          </Typography>
          <Typography variant="body2" color="black">
            Covenant wizards have made a breakthrough in the science of
            liquidity, and Etherereans can now Craft it at the molecular level.
            A crack team of entrepreneurial penguins have already used this
            discovery to innovate Craftable Initial Liquidity Offerings (ILOs).
            Projects can use ILOs to provide initial liquidity for tokens with
            deep customization and security.The Wizards will be publishing their
            latest findings soon. In the meantime, you can read their
            preliminary report in the beta Grimoire at unifihub.com
          </Typography>
        </div>
        <DappAction />
      </Content>
    </section>
  )
}

export default Craft
