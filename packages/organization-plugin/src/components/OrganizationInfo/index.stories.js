import React from 'react'

import OrganizationInfo from '.'

const item = {
  title: 'Example/OrganizationInfo',
  component: OrganizationInfo,
}

export const SampleOrganizationInfo = () => (
  <OrganizationInfo
    bio="Example bio of the example organization"
    content={{ More: [{ label: 'hi', href: 'https://www.google.it' }] }}
  />
)

export default item
