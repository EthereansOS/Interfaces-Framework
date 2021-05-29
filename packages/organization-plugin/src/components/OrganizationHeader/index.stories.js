import React from 'react'
import { HashRouter } from 'react-router-dom'

import OrganizationHeader from '.'

const item = {
  title: 'Example/OrganizationHeader',
  component: OrganizationHeader,
}

export const SampleOrganizationHeader = () => (
  <HashRouter>
    <OrganizationHeader organization={{}} />
  </HashRouter>
)

export default item
