import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@dfohub/design-system'

import logo from './logo.png'
import style from './header.module.css'

function Header() {
  return (
    <Link to="/">
      <header className={style.root}>
        <img src={logo} alt="covenant"></img>
        <Typography variant="h3" color="white">
          Covenants
        </Typography>
      </header>
    </Link>
  )
}

export default Header
