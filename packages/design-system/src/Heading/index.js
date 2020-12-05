import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './heading.module.scss'

const Heading = (props) => {
  const { children, variant, className, color } = props
  const attr = {}

  if (['primary', 'secondary'].includes(color)) {
    attr.className = classNames(style['root'], style[color], className)
  } else {
    attr.className = classNames(style['root'], className)
    color && (attr.style = { color })
  }

  return React.createElement(variant, { ...attr, children })
}

Heading.propTypes = {
  className: T.string,
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  variant: T.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7']),
  color: T.string,
}

Heading.defaultProps = {
  variant: 'h1',
}

export default Heading
