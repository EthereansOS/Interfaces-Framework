import React from 'react'
import { Field, Select } from '@ethereansos/interfaces-ui'
import T from 'prop-types'

const SelectField = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <Select
          {...props}
          {...field}
          onSelect={(id, value) => form.setFieldValue(name, value)}
        />
      )}
    </Field>
  )
}

export default SelectField

SelectField.propTypes = {
  name: T.string,
}
