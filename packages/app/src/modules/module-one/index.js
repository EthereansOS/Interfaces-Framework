import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@dfohub/design-system'

const TestPage = () => (
  <Card>
    Test page 1 <Link to="/about">About</Link>
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
      requireConnection: false,
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
    },
    20
  )
}

const pluginDefinition = {
  name: 'module-1',
  init: initPlugin,
}

export default pluginDefinition
