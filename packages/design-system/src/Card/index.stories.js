/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import Card from '.'

export default {
  title: 'Example/Card',
  component: Card,
}

export const SampleCard = () => <Card>This is a sample card with a text</Card>
export const SampleCardWithFooterContent = () => (
  <Card
    as="article"
    Footer={
      <div>
        <p>hi</p>
      </div>
    }>
    <p>This is a sample card with a text</p>
  </Card>
)
