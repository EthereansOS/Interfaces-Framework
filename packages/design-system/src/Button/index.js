import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import { sizePropType } from '../propTypes'

import style from './button.module.scss'

const Button = ({ text, className, color, size, fullWidth, ...props }) => (
  <button
    {...props}
    className={classNames(
      style.root,
      style[color],
      style[size],
      style[fullWidth ? 'fullWidth' : ''],
      className
    )}>
    {text}
  </button>
)

Button.propTypes = {
  className: T.string,
  text: T.string.isRequired,
  type: T.oneOf(['submit', 'button']),
  fullWidth: T.bool,
  color: T.oneOf(['primary', 'secondary', 'tertiary']),
  size: sizePropType,
}

Button.defaultProps = {
  color: 'primary',
  size: 'medium',
  type: 'button',
}

export default Button
