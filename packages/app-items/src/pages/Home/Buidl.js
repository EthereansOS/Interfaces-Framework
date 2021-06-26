import React from 'react'
import { Button, Typography, ShinyText, Link } from '@dfohub/design-system'

import style from './home.module.css'
const Buidl = () => {
  return (
    <div className={style.info}>
      <Typography variant="h2">
        <ShinyText text="BUIDL" animated strong />
      </Typography>
      <Typography variant="body2" className={style.itemDescription}>
        Every <ShinyText text="ITEM" strong /> is built with extendible
        contracts. This is the first general-purpose, interoperable and
        programmable token standard. Using <ShinyText text="ITEM" strong />, you
        can call all existing <ShinyText text="ITEMs" strong /> via proxy
        contracts without needing to hardcode every address.
      </Typography>
      <div className={style.buttonGroup}>
        <Link href="https://github.com/EthereansOS/ITEMS-Interface">
          <Button primary text="Github" />
        </Link>

        <Link href="https://docs.ethos.wiki/items/">
          <Button primary text="Documentation" />
        </Link>
      </div>
    </div>
  )
}

export default Buidl
