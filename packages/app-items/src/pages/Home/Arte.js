import React from 'react'
import { Button, Typography, ShinyText, Link } from '@ethereansos/interfaces-ui'

import style from './home.module.css'

const Arte = () => {
  return (
    <div className={style.info}>
      <Typography variant="h2">
        <ShinyText text="ARTE" animated strong /> the Programmable Equity of the{' '}
        <ShinyText text="ITEMS" strong /> DFO
      </Typography>
      <Typography variant="body2" className={style.itemDescription}>
        The <ShinyText text="ITEMS" strong /> protocol is built on top of a
        Decentralized Flexible Organization (DFO), ruled 100% on-chain—without
        the need for any offchain intermediary—by holders of its programmable
        equity, <ShinyText text="ARTE" strong />.
      </Typography>
      <div className={style.buttonGroup}>
        <Link href="https://dapp.dfohub.com/?addr=0x7cB2Aa86fC0F3dA708783168BFd25B80F045d183">
          <Button primary text="Govern" />
        </Link>

        <Link href="https://covenants.eth.link/#/farm/dapp/0x0074f1D1D1F0086F46EA102380635fCC460c212b">
          <Button primary text="ARTE token farm" />
        </Link>
      </div>
    </div>
  )
}

export default Arte
