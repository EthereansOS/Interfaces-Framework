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
    multiline,
    ...otherProps
  } = props

  const InputComponent = multiline ? 'textarea' : 'input'

  return (
    <div className={classNames(className, style.root)}>
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
  multiline: T.bool,
  onChange: T.func.isRequired,
  startComponent: T.node,
  endComponent: T.node,
  inputClassName: T.string,
}

TextField.defaultProps = {}

export default TextField
