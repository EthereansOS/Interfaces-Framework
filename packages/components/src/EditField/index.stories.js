import React from 'react'

import EditField from '.'

const item = {
  title: 'Example/EditField',
  component: EditField,
}

export const SampleEditField = () => (
  <EditField
    label="DFO Logo:"
    value="test"
    description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
  />
)

export default item
