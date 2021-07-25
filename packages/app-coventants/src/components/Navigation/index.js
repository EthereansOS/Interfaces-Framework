import React from 'react'
import { usePlaceholder } from '@dfohub/core'
import { Link, useLocation } from 'react-router-dom'
import { Typography } from '@dfohub/design-system'

import style from './navigation.module.css'

const Navigation = ({ menuName, isDapp }) => {
  const menuItems = usePlaceholder(menuName)
  const location = useLocation()

  const navItem = (item) => {
    const navImage = `${process.env.PUBLIC_URL}/assets/images/${item.name}.png`
    const indicator = `${process.env.PUBLIC_URL}/assets/images/indicator.png`

    return (
      <Link key={item.name} to={!isDapp ? item.link : item.dappLink}>
        <div className={style.item}>
          {(location.pathname === item.link ||
            location.pathname === `${item.link}/dapp`) && (
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
