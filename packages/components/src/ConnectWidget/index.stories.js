import React from 'react'
import { action } from '@storybook/addon-actions'

import ConnectWidget from '.'
import logoImg from '../../__data/ghostload.gif'

import { webs3States } from '@dfohub/core'

export default {
  title: 'Components/ConnectWidget',
  component: ConnectWidget,
}

export const SampleContainer = () => <ConnectWidget />

const Template = (args) => <ConnectWidget {...args} />

export const Default = Template.bind({})

Default.args = {
  logo: logoImg,
  connectionStatus: webs3States.NOT_CONNECTED,
  title: 'DFOhub',
  onConnect: action('Connect'),
}

export const Connecting = Template.bind({})

Connecting.args = {
  logo: logoImg,
  connectionStatus: webs3States.CONNECTING,
  title: 'DFOhub',
  onConnect: action('Connect'),
}
