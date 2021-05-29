import React from 'react'
import { HashRouter } from 'react-router-dom'

import RulesAndFunds from '.'

const item = {
  title: 'Example/RulesAndFunds',
  component: RulesAndFunds,
}

export const SampleRulesAndFunds = () => (
  <HashRouter>
    <RulesAndFunds />
  </HashRouter>
)

export default item
