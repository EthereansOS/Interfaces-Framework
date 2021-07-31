import React from 'react'
import { Button, Typography, ShinyText, Link } from '@ethereansos/interfaces-ui'
import { Link as RLink } from 'react-router-dom'

import style from './home.module.css'
const ActionCreate = () => {
  return (
    <div className={style.item}>
      <Typography variant="h1">
        <ShinyText text="WRAP" strong />
      </Typography>
      <Typography variant="body2" className={style.itemDescription}>
        Wrap any ERC20, ERC721 or ERC1155 into an{' '}
        <ShinyText text="ITEM" strong />, empowering it with the capabilities of
        all. Save gas batch-swapping ERC20s. Farm ERC1155s in DeFi dApps. Swap
        ERC721s on DExes. A world of possibilities awaits you.
      </Typography>
      <Link RLink={RLink} to="/wrap">
        <Button primary text="Wrap" />
      </Link>
    </div>
  )
}

export default ActionCreate
