/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import TextField from '.'

export default {
  title: 'Example/TextField',
  component: TextField,
}

const Template = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {
  // children: 'This is a title',
}

export const ColorPrimary = Template.bind({})
ColorPrimary.args = {
  // children: 'This is a title with primary color',
  // color: 'primary',
}

export const ColorSecondary = Template.bind({})
ColorSecondary.args = {
  // children: 'This is a title with secondary color',
  // color: 'secondary',
}

export const ColorCustom = Template.bind({})
ColorCustom.args = {
  // children: 'This is a title with custom color',
  // color: '#00CCCC',
}
