import { Field, FormControl } from '@ethereansos/interfaces-ui'
import React from 'react'
import T from 'prop-types'

import style from './checkbox-field.module.scss'

const CheckboxField = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ field }) => (
        <FormControl
          className={style.root}
          control={
            <input
              {...field}
              {...props}
              checked={field.value}
              type="checkbox"
            />
          }
          {...props}
        />
      )}
    </Field>
  )
}

export default CheckboxField

CheckboxField.propTypes = {
  name: T.string,
}
