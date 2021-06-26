import React, { useEffect } from 'react'
import { Typography, ShinyText } from '@dfohub/design-system'

import style from './home.module.css'
import Info from './Info'
import ActionCreate from './ActionCreate'
import ActionWrap from './ActionWrap'
import ActionExplore from './ActionExplore'
import ActionFarm from './ActionFarm'
import Buidl from './Buidl'
import Arte from './Arte'
const HomePage = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'HOME',
      templateProps: {
        selected: 'create',
      },
    }))
  }, [setTemplateState])
  return (
    <>
      <img
        src="assets/img/intro.png"
        className={style.fullWidthImage}
        alt="header"
      />
      <Typography variant="h1" align="center" className={style.title}>
        The Ecosystem of <ShinyText text="ITEMS" animated /> <br /> on top of{' '}
        <ShinyText text="ETHEREUM" animated />
      </Typography>
      <Typography variant="body1" align="center" className={style.description}>
        <ShinyText text="ITEMS" strong /> is a platform for building ITEMs, a
        new class of objects on top of Ethereum. <br />
        Fusing{' '}
        <strong>
          ERC20s, ERC721s and ERC1155s into a single superstandard
        </strong>
        , ITEMs unleash <br /> the true power of art, games, dApps and DeFi.
      </Typography>
      <img
        src="assets/img/awesome.gif"
        width="200px"
        height="200px"
        alt="item"
      />
      <Info />
      <div className={style.actions}>
        <ActionCreate />
        <ActionWrap />
      </div>
      <div className={style.actions}>
        <ActionExplore />
        <ActionFarm />
      </div>
      <img src="assets/img/3.png" width="200px" height="200px" alt="cat" />
      <Buidl />
      <img src="assets/img/4.png" width="200px" height="200px" alt="ghost" />
      <Arte />
    </>
  )
}

export default HomePage
