import React, { useEffect } from 'react'
import { Container } from '@dfohub/design-system'
import { usePlugins } from '@dfohub/core'

import style from './main-template.module.css'

function MainTemplate({ children, Menu }) {
  const { setSingleElement } = usePlugins()

  useEffect(() => {
    setSingleElement('mainMenu', Menu)
  }, [setSingleElement, Menu])

  return (
    <>
      <div className={style.root}>
        <Container className={style.container}>{children}</Container>
      </div>
    </>
  )
}

export default MainTemplate
