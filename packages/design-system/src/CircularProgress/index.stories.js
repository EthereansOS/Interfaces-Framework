/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import CircularProgress from '.'

export default {
  title: 'Example/CircularProgress',
  component: CircularProgress,
}

export const LargeCircularProgress = () => <CircularProgress size="large" />

export const MediumCircularProgress = () => <CircularProgress size="medium" />

export const SmallCircularProgress = () => <CircularProgress size="small" />
