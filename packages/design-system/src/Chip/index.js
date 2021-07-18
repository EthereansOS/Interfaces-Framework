import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import { sizePropType } from '../propTypes'

import style from './chip.module.scss'

const Chip = ({ label, size, color, className, children }) => {
  return (
    <span
      className={classNames(style.root, style[color], style[size], className)}>
      {label || children}
    </span>
  )
}

export default Chip

Chip.propTypes = {
  label: T.string,
  color: T.string,
  size: sizePropType,
  className: T.string,
  children: T.node,
}

Chip.defaultProps = {
  color: 'primary',
  size: 'medium',
}
