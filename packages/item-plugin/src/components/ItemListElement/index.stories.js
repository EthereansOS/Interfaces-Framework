/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { action } from '@storybook/addon-actions'

import ItemListElement from '.'

export default {
  title: 'components/ItemListElement',
  component: ItemListElement,
}

export const ElementWithImage = () => (
  <ItemListElement
    name="Sample Item"
    symbol="XYZ"
    address="0x12312312"
    description="a short description here"
    image="https://ipfs.io/ipfs/QmXDJTjjkTLGk8urwdReWKGt9nHArCEmN8CMWuetKMEF7D"
    onClick={action('Click me')}
  />
)

export const ElementWithoutImage = () => (
  <ItemListElement
    name="Sample Item"
    symbol="XYZ"
    address="0x12312312"
    description="a short description here"
    onClick={action('Click me')}
  />
)
