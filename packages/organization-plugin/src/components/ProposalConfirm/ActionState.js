import React from 'react'
import { CircularProgress } from '@ethereansos/interfaces-ui'

import {
  ACTION_STATE_DONE,
  ACTION_STATE_ERROR,
  ACTION_STATE_LOADING,
} from './constants'

const ActionState = ({ state }) => {
  switch (state) {
    case ACTION_STATE_LOADING:
      return <CircularProgress size="small" />
    case ACTION_STATE_DONE:
      return '✅ Done'
    case ACTION_STATE_ERROR:
      return '❌ Errors'
    default:
      return ''
  }
}

export default ActionState
