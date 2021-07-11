import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './card.module.scss'

const Card = ({
  children,
  className,
  contentClassName,
  footerClassName,
  headerClassName,
  Footer,
  Header,
}) => (
  <article className={classNames(style.root, className)}>
    {Header && (
      <header className={classNames(style.header, headerClassName)}>
        {Header}
      </header>
    )}
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
  headerClassName: T.string,
  children: T.node,
  Footer: T.node,
  Header: T.node,
  className: T.string,
  contentClassName: T.string,
}
