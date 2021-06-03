import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './tooltip.module.scss'

const ToolTip = ({ children, className }) => {
  return <div className={classNames(style.root, className)}>{children}</div>
}

export default ToolTip

ToolTip.propTypes = {
  children: T.node,
  className: T.string,
}
