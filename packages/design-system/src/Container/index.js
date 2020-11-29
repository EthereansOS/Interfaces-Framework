import React from 'react'
import style from './container.module.scss'

const Container = ({ children }) => (
  <div className={style['root']}>{children}</div>
)

export default Container
