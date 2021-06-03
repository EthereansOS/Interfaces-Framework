import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './modal.module.scss'

const Modal = ({ visible, children, className }) => {
  if (!visible) {
    return null
  }

  return <div className={classNames(style.root, className)}>{children}</div>
}

export default Modal

Modal.propTypes = {
  visible: T.bool,
  children: T.node,
  className: T.string,
}
