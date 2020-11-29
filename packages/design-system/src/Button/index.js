import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'
import style from './button.module.scss'

const Button = ({ text, onClick, variant, className }) => (
  <button
    className={classNames(style['root'], style[variant], className)}
    onClick={onClick}>
    {text}
  </button>
)

Button.propTypes = {
  onClick: T.func.isRequired,
  className: T.string,
  text: T.string.isRequired,
  variant: T.string,
}

Button.defaultProps = {
  variant: 'default',
}

export default Button
