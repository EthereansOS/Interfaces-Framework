import React from 'react'
import { HashRouter } from 'react-router-dom'

import DecentralizedApplication from '.'

const item = {
  title: 'Example/DecentralizedApplication',
  component: DecentralizedApplication,
}

export const SampleDecentralizedApplication = () => (
  <HashRouter>
    <DecentralizedApplication />
  </HashRouter>
)

export default item
