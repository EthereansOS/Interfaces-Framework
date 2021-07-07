import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Typography, Button } from '@dfohub/design-system'

import style from './dapp-action.module.css'

const DappAction = () => {
  const location = useLocation()

  return (
    <div className={style.root}>
      {location.pathname === '/grimoire' ? (
        <a href="https://docs.ethos.wiki/covenants/">
          <Button text="READ" />
        </a>
      ) : (
        <Link to={`${location.pathname}/dapp`}>
          <Button text="DAPP" size="large" />
        </Link>
      )}
      <Typography
        className={style.disclaimer}
        variant="subtitle2"
        color="black">
        Covenants is an <a href="https://ethereansos.eth.link">EthOS</a>{' '}
        research and development project. <b>Use it at your own risk!</b>
        <br></br>
        This protocol is ruled by the{' '}
        <a href="https://dapp.dfohub.com/?addr=0xeFAa6370A2ebdC47B12DBfB5a07F91A3182B5684">
          Covenants DFO
        </a>{' '}
        a fully decentralized organization that operates 100% on-chain without
        the involvement of any legal entity. If you find a bug, please notify us
        on our <a href="https://github.com/ethereansos">Github</a>.
      </Typography>
    </div>
  )
}

export default DappAction
