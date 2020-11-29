import React from 'react'
import Heading from '.'

export default {
  title: 'Example/Heading',
  component: Heading,
}

const Template = (args) => (
  <div>
    <Heading {...args} variant="h1" />
    <Heading {...args} variant="h2" />
    <Heading {...args} variant="h3" />
    <Heading {...args} variant="h4" />
    <Heading {...args} variant="h5" />
    <Heading {...args} variant="h6" />
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
