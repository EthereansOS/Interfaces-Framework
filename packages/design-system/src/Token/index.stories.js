/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import { VOID_ETHEREUM_ADDRESS } from '../../../core/src/lib/constants'

import Token from '.'

export default {
  title: 'Example/Token',
  component: Token,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#000000' }],
    },
  },
}

const Template = (args) => <Token {...args} />

export const IconOnly = Template.bind({})

IconOnly.args = {
  address: VOID_ETHEREUM_ADDRESS,
  showIcon: true,
}

export const SymbolOnly = Template.bind({})

SymbolOnly.args = {
  address: VOID_ETHEREUM_ADDRESS,
  showSymbol: true,
}

export const Ethereum = Template.bind({})

Ethereum.args = {
  address: VOID_ETHEREUM_ADDRESS,
  showIcon: true,
  showSymbol: true,
}

export const Generic = Template.bind({})

Generic.args = {
  address: 'generic',
  showIcon: true,
  showSymbol: true,
}
