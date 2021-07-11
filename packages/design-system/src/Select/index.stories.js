/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import Select from '.'

const options = [
  {
    symbol: 'ETH',
    image: 'assets/images/tokens/eth.png',
    label: 'Ethereum',
    value: 'ethereum',
  },
  {
    symbol: 'TOK',
    image: 'assets/images/tokens/generic.png',
    label: 'Token',
    value: 'token',
  },
]

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
  options,
}
