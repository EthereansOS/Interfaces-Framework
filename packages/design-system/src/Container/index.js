import React from 'react'
import classNames from 'classnames'
import style from './container.module.scss'
import T from 'prop-types'

const Container = ({ children, className }) => (
  <div className={classNames(style['root'], className)}>{children}</div>
)

Container.propTypes = {
  className: T.string,
}

export default Container
