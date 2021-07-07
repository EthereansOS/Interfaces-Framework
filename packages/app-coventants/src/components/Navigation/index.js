import React from 'react'
import { usePlaceholder } from '@dfohub/core'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from '@dfohub/design-system'

import style from './navigation.module.css'

function Navigation({ menuName }) {
  const menuItems = usePlaceholder(menuName)
  const location = useLocation()

  const navItem = (item) => {
    const navImage = `${process.env.PUBLIC_URL}/assets/images/${item.name}.png`
    const indicator = `${process.env.PUBLIC_URL}/assets/images/indicator.png`
    return (
      <Link key={item.name} to={item.link}>
        <div className={style.item}>
          {location.pathname === item.link && (
            <img
              className={style.indicator}
              src={indicator}
              alt="indicator"></img>
          )}
          <img src={navImage} alt={item.label}></img>
          <Typography variant="body2" color="white">
            {item.label}
          </Typography>
        </div>
      </Link>
    )
  }

  return (
    <nav className={style.root}>{menuItems.map((item) => navItem(item))}</nav>
  )
}

export default Navigation
