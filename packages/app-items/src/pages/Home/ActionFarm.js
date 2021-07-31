import React from 'react'
import { Button, Typography, ShinyText, Link } from '@ethereansos/interfaces-ui'
import { Link as RLink } from 'react-router-dom'

import style from './home.module.css'
const ActionCreate = () => {
  return (
    <div className={style.item}>
      <Typography variant="h1">
        <ShinyText text="FARM" strong />
      </Typography>
      <Typography variant="body2" className={style.itemDescription}>
        Farm and set up farming contracts for your{' '}
        <ShinyText text="ITEMs" strong />, with full DeFi integration.
      </Typography>
      <Link RLink={RLink} to="/farm">
        <Button primary text="Farm" />
      </Link>
    </div>
  )
}

export default ActionCreate
