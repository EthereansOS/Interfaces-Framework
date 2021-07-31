import React from 'react'

import Link from '.'

const item = {
  title: 'Example/OrgLink',
  component: Link,
}

export const SampleLink = () => (
  <div style={{ backgroundColor: '#000', padding: 40 }}>
    <Link>This is a link</Link>
  </div>
)

export default item
