import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from '.'

export default {
  title: 'Example/Button',
  component: Button,
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: action('Click me'),
  text: 'Click me',
}

export const Primary = Template.bind({})
Primary.args = {
  onClick: action('Click me'),
  text: 'Click me',
  variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  onClick: action('Click me'),
  text: 'Click me',
  variant: 'secondary',
}
