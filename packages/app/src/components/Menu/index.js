import React from 'react'
import classNames from 'classnames'
import style from './menu.module.css'
import { usePlaceholder } from '@dfohub/core'
import { Link } from 'react-router-dom'
import { Container } from '@dfohub/design-system'

function Menu(props) {
  const menu = usePlaceholder('menu')

  return (
    <div className={style['root']}>
      <Container>
        <div className={style.menu}>
          {menu.map(({ label, link, name }) => (
            <Link
              key={`${link}-${label}`}
              className={classNames(style.link, {
                [style.selected]: props.selected === name,
              })}
              to={link}>
              {label}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Menu
