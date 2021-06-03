import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import { sizePropType } from '../propTypes'

import style from './button.module.scss'

const Button = ({
  text,
  onClick,
  variant,
  className,
  color,
  size,
  ...props
}) => (
  <button
    {...props}
    className={classNames(
      style.root,
      style[variant],
      style[color],
      style[size],
      className
    )}
    onClick={onClick}>
    {text}
  </button>
)

Button.propTypes = {
  onClick: T.func.isRequired,
  className: T.string,
  text: T.string.isRequired,
  variant: T.string,
  color: T.oneOf(['primary', 'secondary']),
  size: sizePropType,
}

Button.defaultProps = {
  variant: 'default',
  color: 'primary',
  size: 'medium',
}

export default Button
