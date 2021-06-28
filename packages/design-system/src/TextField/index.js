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
    isMultiline,
    isRounded,
    ...otherProps
  } = props

  const InputComponent = isMultiline ? 'textarea' : 'input'

  return (
    <div
      className={classNames(className, style.root, isRounded && style.rounded)}>
      {startComponent && (
        <span className={style.startContainer}>{startComponent}</span>
      )}
      <InputComponent
        onChange={onChange}
        className={classNames(inputClassName, style.input)}
        {...otherProps}
      />
      {endComponent && (
        <span className={style.endContainer}>{endComponent}</span>
      )}
    </div>
  )
}

TextField.propTypes = {
  className: T.string,
  isMultiline: T.bool,
  isRounded: T.bool,
  onChange: T.func.isRequired,
  startComponent: T.node,
  endComponent: T.node,
  inputClassName: T.string,
}

export default TextField
