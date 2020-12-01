import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@dfohub/design-system'

const TestPage = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({ ...s, headerTitle: 'HOME' }))
  }, [])
  return (
    <Card>
      Test page 1 <Link to="/about">About</Link>
    </Card>
  )
}

const TestPage2 = ({ setTemplateState }) => {
  useEffect(() => {
    setTemplateState((s) => ({ ...s, headerTitle: 'ABOUT' }))
  }, [])
  return (
    <Card>
      Test page 2 <Link to="/">Go to test 1</Link>
    </Card>
  )
}

const initPlugin = ({ addElement }) => {
  addElement('menu', {
    name: 'home',
    label: 'Home',
    link: '/',
    index: 10,
  })
  addElement('menu', {
    name: 'about',
    label: 'About',
    link: '/about',
    index: 20,
  })
  addElement(
    'router',
    {
      path: '/',
      Component: TestPage,
      exact: true,
      requireConnection: false,
      templateProps: {
        selected: 'home',
        showMenu: true,
      },
    },
    10
  )

  addElement(
    'router',
    {
      path: '/about',
      Component: TestPage2,
      exact: true,
      requireConnection: true,
      templateProps: {
        selected: 'about',
        showMenu: true,
      },
    },
    20
  )
}

const pluginDefinition = {
  name: 'sample-plugin',
  init: initPlugin,
}

export default pluginDefinition
