import React from 'react'
import style from './header.module.css'

function Header({ headerTitle }) {
  return (
    <div className={style['root']}>
      <div>DFOHub - {headerTitle}</div>
    </div>
  )
}

export default Header
