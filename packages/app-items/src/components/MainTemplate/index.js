import React, { useState } from 'react'
import classnames from 'classnames'
import { Container } from '@ethereansos/interfaces-ui'
import Header from '../Header'
import Footer from '../Footer'
import style from './main-template.module.css'

function MainTemplate({ Component, ...props }) {
  const [state, setState] = useState({})

  return (
    <main className={style.root}>
      {!props.hideHeader && <Header {...props} {...state} />}
      <Container
        className={classnames(style.container, {
          [style.hideHeader]: !!props.hideHeader,
        })}>
        <Component setTemplateState={setState} {...props} />
      </Container>
      <Footer />
    </main>
  )
}

export default MainTemplate
