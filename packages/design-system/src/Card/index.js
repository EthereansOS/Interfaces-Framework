import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './card.module.scss'

const Card = ({ children, as, className }) =>
  as ? (
    React.createElement(as, {
      className: classNames(style.root, className),
      children,
    })
  ) : (
    <div className={classNames(style.root, className)}>{children}</div>
  )

export default Card

Card.propTypes = {
  children: T.node,
  as: T.string,
  className: T.string,
}
