import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './linear-progress.module.scss'

const LinearProgress = ({ color, className }) => {
  return (
    <span className={classNames(style.root, style[color], className)}>
      <span />
      <span />
      <span />
      <span />
    </span>
  )
}

export default LinearProgress

LinearProgress.propTypes = {
  color: T.string,
  className: T.string,
}

LinearProgress.defaultProps = {
  color: 'primary',
}
