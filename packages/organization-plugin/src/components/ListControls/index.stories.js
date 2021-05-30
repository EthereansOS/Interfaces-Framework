import React from 'react'
import { HashRouter } from 'react-router-dom'

import ListControls from '.'

const item = {
  title: 'Example/ListControls',
  component: ListControls,
}

export const SampleListControls = () => (
  <HashRouter>
    <ListControls />
  </HashRouter>
)

export default item
