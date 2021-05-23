import React from 'react'
import T from 'prop-types'
import classNames from 'classnames'

import style from './textField.module.scss'

const TextField = (props) => {
  const {
    className,
    inputClassName,
    onChange,
    startComponent,
    endComponent,
    ...otherProps
  } = props

  return (
    <div className={classNames(className, style.root)}>
      <span className={style.startContainer}>{startComponent}</span>

      <input
        onChange={onChange}
        className={classNames(inputClassName, style.input)}
        {...otherProps}
      />
      <span className={style.endContainer}>{endComponent}</span>
    </div>
  )
}

TextField.propTypes = {
  className: T.string,
  onChange: T.func.isRequired,
  startComponent: T.node,
  endComponent: T.node,
  inputClassName: T.string,
}

TextField.defaultProps = {}

export default TextField
