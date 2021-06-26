/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { action } from '@storybook/addon-actions'

import CategoryBar from '.'

export default {
  title: 'components/CategoryBar',
  component: CategoryBar,
}

const categories = [
  'element 1',
  'element 2',
  'element 3',
  'element 4',
  'element 5',
]

export const SampleCard = () => (
  <CategoryBar
    categories={categories}
    selected="element 1"
    onClick={action('Select')}
  />
)
