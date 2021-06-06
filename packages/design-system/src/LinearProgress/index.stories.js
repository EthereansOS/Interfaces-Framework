/* eslint-disable import/no-anonymous-default-export */
import React from 'react'

import LinearProgress from '.'

export default {
  title: 'Example/LinearProgress',
  component: LinearProgress,
}

export const LargeLinearProgress = () => <LinearProgress size="large" />

export const MediumLinearProgress = () => <LinearProgress size="medium" />

export const SmallLinearProgress = () => <LinearProgress size="small" />
