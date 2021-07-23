import React from 'react'
import T from 'prop-types'
import { TextField, Typography, Tooltip } from '@dfohub/design-system'
import { useField } from 'formik'
import * as Yup from 'yup'

import style from './edit-field.module.scss'

function checkURL(url) {
  if (new RegExp(window.urlRegex).test(url)) {
    return true
  }
  return new RegExp(window.IPFSRegex).test(url)
}

Yup.addMethod(Yup.string, 'isValidUrl', function () {
  return this.test({
    name: 'isValidUrl',
    message: 'The url is not valid',
    test: (url) => {
      if (!url) {
        return true
      }
      return checkURL(url)
    },
  })
})

const EditField = ({
  label,
  description,
  id,
  name,
  RightInputComponent,
  ...props
}) => {
  const [field] = useField({ id, name })

  return (
    <section>
      <div className={style.header}>
        {label && (
          <Typography weight="bold" variant="body1">
            {label}
          </Typography>
        )}

        <div className={style.inputWrapper}>
          <TextField className={style.inputContainer} {...field} {...props} />

          {RightInputComponent && RightInputComponent}
        </div>
      </div>

      {description && (
        <Tooltip className={style.tooltip}>
          <Typography variant="body2">{description}</Typography>
        </Tooltip>
      )}
    </section>
  )
}

export default EditField

EditField.propTypes = {
  id: T.string.isRequired,
  name: T.string,
  label: T.string,
  description: T.string,
  RightInputComponent: T.node,
}
