import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@ethereansos/interfaces-ui'

import logo from './logo.png'
import logoDapp from './logoDapp.png'
import style from './header.module.css'

const Header = ({ isDapp }) => {
  return (
    <Link to="/">
      <header className={style.root}>
        <img src={!isDapp ? logo : logoDapp} alt="covenant"></img>
        <Typography variant="h3" color="white">
          Covenants
        </Typography>
      </header>
    </Link>
  )
}

export default Header
