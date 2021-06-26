import React from 'react'
import { Button, Typography, ShinyText, Link } from '@dfohub/design-system'

import style from './home.module.css'
const ActionCreate = () => {
  return (
    <div className={style.item}>
      <Typography variant="h1">
        <ShinyText text="EXPLORE" strong />
      </Typography>
      <Typography variant="body2" className={style.itemDescription}>
        Explore, swap, arbitrage, bid for and track prices of all existing
        ITEMS.
      </Typography>
      <Link to="/explore">
        <Button primary text="Explore" />
      </Link>
    </div>
  )
}

export default ActionCreate
