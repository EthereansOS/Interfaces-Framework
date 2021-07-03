import React from 'react'
import { TextField } from '@dfohub/design-system'
import { Field } from 'formik'
import T from 'prop-types'

import style from './fn-params-fields.module.scss'

export const FnParamInputField = ({ name, param }) => {
  const valueType =
    param.indexOf('uint') === 0 && param.indexOf('[]') === -1
      ? 'number'
      : 'text'

  return param.indexOf('bytes32') === 0 ||
    param.indexOf('address') === 0 ||
    param.indexOf('string') === 0 ||
    param.indexOf('bool[]') === 0 ||
    param.indexOf('uint') === 0 ? (
    <Field name={name}>
      {({ field, form }) => (
        <TextField
          {...field}
          required
          className={style.input}
          type={valueType}
          min="0"
          placeholder={param}
          onChange={(e) => {
            const parsedValue =
              valueType === 'number' ? +e.target.value : e.target.value

            form.setFieldValue(name, parsedValue)
          }}
        />
      )}
    </Field>
  ) : null
}

export const FnParamSelectField = ({ name, param }) => {
  return param === 'bool' ? (
    <Field name={name}>
      {({ field, form }) => (
        // eslint-disable-next-line jsx-a11y/no-onchange
        <select
          {...field}
          required
          onChange={(e) => form.setFieldValue(name, e.target.value === 'true')}>
          <option value="false" selected>
            false
          </option>
          <option value="true">true</option>
        </select>
      )}
    </Field>
  ) : null
}

FnParamInputField.propTypes = {
  name: T.string,
  param: T.string,
}

FnParamSelectField.propTypes = {
  name: T.string,
  param: T.string,
}
