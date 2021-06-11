import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './card.module.scss'

const Card = ({ children, className, Footer }) => (
  <article className={classNames(style.root, className)}>
    <section className={style.content}>{children}</section>
    {Footer && <footer>{Footer}</footer>}
  </article>
)

export default Card

Card.propTypes = {
  children: T.node,
  Footer: T.node,
  className: T.string,
}
