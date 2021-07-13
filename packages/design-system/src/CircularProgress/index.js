import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import { sizePropType } from '../propTypes'

import style from './circular-progress.module.scss'

const CircularProgress = ({ size, color, className }) => {
  return (
    <span
      className={classNames(style.root, style[color], style[size], className)}
    />
  )
}

export default CircularProgress

CircularProgress.propTypes = {
  color: T.string,
  size: sizePropType,
  className: T.string,
}

CircularProgress.defaultProps = {
  color: 'primary',
  size: 'medium',
}
