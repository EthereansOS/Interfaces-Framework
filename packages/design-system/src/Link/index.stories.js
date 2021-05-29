/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import Link from '.'

export default {
  title: 'Example/Link',
  component: Link,
}

export const SampleLink = () => (
  <Link href="https://www.google.it" external>
    A Link
  </Link>
)
