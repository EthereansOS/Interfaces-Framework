import React from 'react'

import Section from '.'

const item = {
  title: 'Example/Section',
  component: Section,
}

export const SampleSection = () => (
  <div style={{ backgroundColor: '#000', padding: 40 }}>
    <Section category="My Section">
      <p>hello</p>
    </Section>
  </div>
)

export default item
