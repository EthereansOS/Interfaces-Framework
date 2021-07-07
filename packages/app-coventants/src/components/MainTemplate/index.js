import React, { useState } from 'react'
import classnames from 'classnames'
import Header from '../Header'
import Navigation from '../../components/Navigation'
import { Container } from '@dfohub/design-system'
import style from './main-template.module.css'

function MainTemplate({ Component, ...props }) {
  const [, setState] = useState({})
  const backgroundUrl = `${process.env.PUBLIC_URL}/assets/images/city.png`

  return (
    <main
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      className={style.root}>
      <Header />
      <Container className={classnames(style.container)}>
        <Navigation menuName={props.menuName} />
        <Component setTemplateState={setState} {...props} />
      </Container>
    </main>
  )
}

export default MainTemplate
