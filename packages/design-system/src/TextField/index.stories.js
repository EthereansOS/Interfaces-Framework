/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import TextField from '.'

export default {
  title: 'Example/TextField',
  component: TextField,
}

const Template = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Rounded = Template.bind({})
Rounded.args = {
  isRounded: true,
}

export const Multiline = Template.bind({})
Multiline.args = {
  isMultiline: true,
}

export const Decorated = Template.bind({})
Decorated.args = {
  startComponent: <p>foo</p>,
}
