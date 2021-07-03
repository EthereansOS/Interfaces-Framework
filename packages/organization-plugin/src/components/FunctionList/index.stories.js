import React from 'react'
import { HashRouter } from 'react-router-dom'

import FunctionList from '.'

const item = {
  title: 'Example/FunctionList',
  component: FunctionList,
}

export const SampleFunctionList = () => (
  <HashRouter>
    <FunctionList organization={{}} />
  </HashRouter>
)

export default item
