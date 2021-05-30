import React from 'react'
import classNames from 'classnames'

import Typography from '../Typography'

import style from './form-control.module.scss'

const FormControl = ({ control, label, className }) => {
  return (
    <label className={classNames(style.root, className)}>
      <Typography variant="body1" as="span">
        {label}
      </Typography>
      {control}
    </label>
  )
}

export default FormControl
