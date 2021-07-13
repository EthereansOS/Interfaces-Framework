import React from 'react'

import FileField from '.'

const item = {
  title: 'Example/FileField',
  component: FileField,
}

export const SampleEditField = () => (
  <FileField
    label="DFO Logo:"
    value="test"
    description="IPFS link to the logo of the organization (must be a .png 320 x 320 pixels)"
  />
)

export default item
