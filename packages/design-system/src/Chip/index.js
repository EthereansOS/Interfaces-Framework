import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import { sizePropType } from '../propTypes'

import style from './chip.module.scss'

const Chip = ({ label, size, color, className }) => {
  return (
    <span
      className={classNames(style.root, style[color], style[size], className)}>
      {label}
    </span>
  )
}

export default Chip

Chip.propTypes = {
  label: T.string.isRequired,
  color: T.string,
  size: sizePropType,
  className: T.string,
}

Chip.defaultProps = {
  color: 'primary',
  size: 'medium',
}
