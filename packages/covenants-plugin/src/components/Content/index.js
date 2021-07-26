import React from 'react'
import classnames from 'classnames'
import { Container } from '@ethereansos/interfaces-ui'

import style from './content.module.css'

const Content = ({ children, styles }) => {
  const backgroundUrl = `${process.env.PUBLIC_URL}/assets/images/index.jpg`

  return (
    <div
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className={style.root}>
      <Container className={classnames(style.container, styles)}>
        {children}
      </Container>
    </div>
  )
}

export default Content
