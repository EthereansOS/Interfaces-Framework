import React from 'react'

import Tooltip from '.'

const item = {
  title: 'Example/Tooltip',
  component: Tooltip,
}

export const SampleTooltip = () => (
  <Tooltip>
    <p>A text</p>
  </Tooltip>
)

export default item
