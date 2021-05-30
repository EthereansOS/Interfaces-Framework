import React from 'react'
import { HashRouter } from 'react-router-dom'

import DecentralizedApplication from '.'

const item = {
  title: 'Example/DecentralizedApplication',
  component: DecentralizedApplication,
}

export const SampleDecentralizedApplication = () => (
  <HashRouter>
    <DecentralizedApplication organization={{ walletAddress: '0xaa' }} />
  </HashRouter>
)

export default item
