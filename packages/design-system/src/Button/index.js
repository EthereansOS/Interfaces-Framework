import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import { sizePropType } from '../propTypes'

import style from './button.module.scss'

const Button = ({ text, className, color, size, ...props }) => (
  <button
    {...props}
    className={classNames(style.root, style[color], style[size], className)}>
    {text}
  </button>
)

Button.propTypes = {
  className: T.string,
  text: T.string.isRequired,
  color: T.oneOf(['primary', 'secondary', 'tertiary']),
  size: sizePropType,
}

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
}

export default Button
