import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './card.module.scss'

const Card = ({
  children,
  className,
  contentClassName,
  footerClassName,
  Footer,
}) => (
  <article className={classNames(style.root, className)}>
    <section className={classNames(style.content, contentClassName)}>
      {children}
    </section>
    {Footer && (
      <footer className={classNames(style.footer, footerClassName)}>
        {Footer}
      </footer>
    )}
  </article>
)

export default Card

Card.propTypes = {
  footerClassName: T.string,
  children: T.node,
  Footer: T.node,
  className: T.string,
  contentClassName: T.string,
}
