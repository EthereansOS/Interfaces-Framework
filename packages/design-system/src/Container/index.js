import React from 'react'
import classNames from 'classnames'
import style from './container.module.scss'

const Container = ({ children, className }) => (
  <div className={classNames(style['root'], className)}>{children}</div>
)

export default Container
