import React from 'react'
import { Typography, ShinyText } from '@ethereansos/interfaces-ui'

import style from './home.module.css'

const Info = () => {
  return (
    <div className={style.info}>
      <Typography variant="h2">Use ITEMs Everywhere</Typography>
      <Typography variant="body1" className={style.description}>
        <ShinyText text="ITEMS" strong /> can be ported across the entire
        Ethereum universe. Buy them as potions for the next raid in your
        favorite ETH-based game, earn DAI by borrowing other in-game ITEMs, farm
        Cryptovoxel items, and do so much more.
      </Typography>
      <Typography variant="h2">DeFi NFTs</Typography>
      <Typography variant="body1" className={style.description}>
        <ShinyText text="ITEMS" strong /> merges the DeFi and NFT ecosystems
        into one. Swap, farm and arbitrage NFTs on DEXes. Trade ERC20s on NFT
        stores. Use your imagination, and bring it to life with ITEM technology.
      </Typography>
    </div>
  )
}

export default Info
