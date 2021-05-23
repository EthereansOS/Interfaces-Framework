import React, { useState } from 'react'
import { Container } from '@dfohub/design-system'
import Header from '../Header'
import Menu from '../Menu'
import style from './main-template.module.css'

function MainTemplate({ Component, ...props }) {
  const [state, setState] = useState({})

  return (
    <main className={style.root}>
      <Header {...props} {...state} />

      {props.showMenu && <Menu {...props} />}
      <Container className={style.container}>
        <Component setTemplateState={setState} />
      </Container>
    </main>
  )
}

export default MainTemplate
