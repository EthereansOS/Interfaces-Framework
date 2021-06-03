import React from 'react'

import OrganizationEdit from '.'

const item = {
  title: 'Example/OrganizationEdit',
  component: OrganizationEdit,
}

export const SampleOrganizationEdit = () => (
  <OrganizationEdit onClose={() => false} />
)

export default item
