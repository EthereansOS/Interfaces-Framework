import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@dfohub/design-system'
import Connect from './connect'

const TestPage = () => (
  <Card>
    Test page <Link to="/about">Go to test 2</Link>
    <Connect />
  </Card>
)

const TestPage2 = () => (
  <Card>
    Test page 2 <Link to="/">Go to test 1</Link>
  </Card>
)

const initPlugin = ({ addElement }) => {
  addElement(
    'router',
    {
      path: '/',
      Component: TestPage,
      exact: true,
    },
    10
  )

  addElement(
    'router',
    {
      path: '/about',
      Component: TestPage2,
      exact: true,
    },
    20
  )
}

const pluginDefinition = {
  name: 'module-1',
  init: initPlugin,
}

export default pluginDefinition
