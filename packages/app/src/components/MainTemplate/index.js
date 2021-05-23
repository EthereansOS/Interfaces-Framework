import React, { useState } from 'react'
import { Container } from '@dfohub/design-system'
import { useSinglePlaceholder } from '@dfohub/core'
import Header from '../Header'
import style from './main-template.module.css'

function MainTemplate({ Component, ...props }) {
  const [state, setState] = useState({})
  const menuPlaceholder = useSinglePlaceholder('mainMenu')

  return (
    <main className={style.root}>
      <Header {...props} {...state} />
      {menuPlaceholder}
      <Container className={style.container}>
        <Component setTemplateState={setState} {...props} />
      </Container>
    </main>
  )
}

export default MainTemplate
