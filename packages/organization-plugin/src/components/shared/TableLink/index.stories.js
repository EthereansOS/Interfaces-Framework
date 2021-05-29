import React from 'react'

import TableLink from '.'

const item = {
  title: 'Example/TableLink',
  component: TableLink,
}

export const SampleTableLink = () => (
  <div style={{ backgroundColor: '#000', padding: 40 }}>
    <TableLink value="dfohub.eth" />
  </div>
)

export default item
