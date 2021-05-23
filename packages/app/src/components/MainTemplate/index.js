import React, { useState, useMemo } from 'react'
import { Container } from '@dfohub/design-system'
import Header from '../Header'
import style from './main-template.module.css'
import Menu from '../Menu'
import SubMenu from '../SubMenu'

function MainTemplate({ Component, ...props }) {
  const [state, setState] = useState({})

  const [mainMenuSelected, mainSubMenuSelected] = useMemo(() => {
    return (props.selected || '').split('/')
  }, [props.selected])

  return (
    <main className={style.root}>
      <Header {...props} {...state} />
      {props.showBeforeMenu && !!state.beforeMenu && state.beforeMenu}
      {props.showMenu && state.mainMenu && (
        <Menu selected={mainMenuSelected} menuName={state.mainMenu} />
      )}
      {props.showSubMenu && state.mainSubMenu && (
        <SubMenu selected={mainSubMenuSelected} menuName={state.mainSubMenu} />
      )}
      <Container className={style.container}>
        <Component setTemplateState={setState} {...props} />
      </Container>
    </main>
  )
}

export default MainTemplate
