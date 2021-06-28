/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { VOID_ETHEREUM_ADDRESS } from '@dfohub/core/src/lib/constants'

import Wallet from '.'

const TOKEN = {
  address: VOID_ETHEREUM_ADDRESS,
  amount: 0.9,
}

export default {
  title: 'Components/Wallet',
  component: Wallet,
}

const Template = (args) => <Wallet {...args} />

export const Default = Template.bind({})

Default.args = {
  isEdit: false,
  token: TOKEN,
  tokenPrice: 2.101,
}

export const Edit = Template.bind({})

Edit.args = {
  isEdit: true,
  token: TOKEN,
  tokenPrice: 1.709,
  argTypes: {
    onSwap: { action: 'onSwap' },
    onTransfer: { action: 'onTransfer' },
  },
}
