/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import { TOKENS } from '../../../core/src/lib/tokens/tokens'

import Select from '.'

export default {
  title: 'Example/Select',
  component: Select,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
}

const Template = (args) => <Select {...args} />

export const Default = Template.bind({})

Default.args = {
  onSelect: (e) => console.log('selected', e.value),
  options: TOKENS,
}
