import React from 'react'
import { Button, Typography, ShinyText, Link } from '@ethereansos/interfaces-ui'
import { Link as RLink } from 'react-router-dom'

import style from './home.module.css'
const ActionCreate = () => {
  return (
    <div className={style.item}>
      <Typography variant="h1">
        <ShinyText text="CREATE" strong />
      </Typography>
      <Typography variant="body2" className={style.itemDescription}>
        Create your own <ShinyText text="ITEM" strong /> collections. Set hosts
        (wallets and contracts able to mint <ShinyText text="ITEMs" strong />)
        for each. Program extensions for every individual{' '}
        <ShinyText text="ITEM" strong />, unleashing their portable potential.
      </Typography>
      <Link RLink={RLink} to="/create">
        <Button primary text="Create" />
      </Link>
    </div>
  )
}

export default ActionCreate
