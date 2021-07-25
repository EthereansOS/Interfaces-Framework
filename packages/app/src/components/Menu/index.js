import React, { useCallback } from 'react'
import pupa from 'pupa'
import classNames from 'classnames'
import { usePlaceholder } from '@ethereansos/interfaces-core'
import { Link, useParams } from 'react-router-dom'

import style from './menu.module.css'

function Menu(props) {
  const params = useParams()
  const menuItems = usePlaceholder(props.menuName)

  const resolveParams = useCallback((link, params) => {
    try {
      return pupa(link, params)
    } catch (e) {
      console.warn(e)
      console.warn('WARNING: link compile error:', link)
      return link
    }
  }, [])

  if (!menuItems.length) return false

  return (
    <div className={style.root}>
      <div className={style.menu}>
        <ul>
          {menuItems.map(({ label, link, name }) => (
            <Link to={resolveParams(link, params)}>
              <li
                key={`${link}-${label}`}
                className={classNames(style.link, {
                  [style.selected]: props.selected === name,
                })}>
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Menu
