import React from 'react'
import classNames from 'classnames'
import T from 'prop-types'

import style from './container.module.scss'

const Container = ({ children, className }) => (
  <div className={classNames(style['root'], className)}>{children}</div>
)

Container.propTypes = {
  className: T.string,
}

export default Container
