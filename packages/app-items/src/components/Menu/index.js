import React, { useCallback } from 'react'
import pupa from 'pupa'
import classNames from 'classnames'
import { usePlaceholder } from '@ethereansos/interfaces-core'
import { ShinyText } from '@ethereansos/interfaces-ui'
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
    <ul className={style.root}>
      {menuItems.map(({ label, link, name }) => (
        <Link to={resolveParams(link, params)} key={`${link}-${label}`}>
          <li
            className={classNames(style.link, {
              [style.selected]: props.selected === name,
            })}>
            <ShinyText
              text={label}
              animated={props.selected !== name}
              hover={props.selected !== name}
            />
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default Menu
