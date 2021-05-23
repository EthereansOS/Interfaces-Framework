/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import Typography from '.'

export default {
  title: 'Example/Typography',
  component: Typography,
}

const Template = (args) => (
  <div>
    <Typography {...args} variant="h1" />
    <Typography {...args} variant="h2" />
    <Typography {...args} variant="h3" />
    <Typography {...args} variant="h4" />
    <Typography {...args} variant="h5" />
    <Typography {...args} variant="h6" />
    <Typography {...args} variant="body1" />
    <Typography {...args} variant="body2" />
    <Typography {...args} variant="subtitle1" />
    <Typography {...args} variant="subtitle2" />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  children: 'This is a title',
}

export const ColorPrimary = Template.bind({})
ColorPrimary.args = {
  children: 'This is a title with primary color',
  color: 'primary',
}

export const ColorSecondary = Template.bind({})
ColorSecondary.args = {
  children: 'This is a title with secondary color',
  color: 'secondary',
}

export const ColorCustom = Template.bind({})
ColorCustom.args = {
  children: 'This is a title with custom color',
  color: '#00CCCC',
}
