import React, { useCallback } from 'react'
import handlebars from 'handlebars'
import classNames from 'classnames'
import { usePlaceholder } from '@dfohub/core'
import { Link, useParams } from 'react-router-dom'

import style from './menu.module.css'

function Menu(props) {
  const menu = usePlaceholder('organizationMenu')
  const params = useParams()

  const resolveParams = useCallback((link, params) => {
    try {
      const template = handlebars.compile(link)
      return template(params)
    } catch (e) {
      console.warn(e)
      console.warn('WARNING: link compile error:', link)
      return link
    }
  }, [])

  return (
    <div className={style['root']}>
      <div className={style.menu}>
        {menu.map(({ label, link, name }) => (
          <Link
            key={`${link}-${label}`}
            className={classNames(style.link, {
              [style.selected]: props.selected === name,
            })}
            to={resolveParams(link, params)}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Menu
