import React from 'react'
import T from 'prop-types'
import { TextField, Typography, Tooltip } from '@dfohub/design-system'
import { useField } from 'formik'

import style from './edit-field.module.scss'

const EditField = ({ label, description, ...props }) => {
  const [field, meta, helpers] = useField(props)

  return (
    <article className={style.root}>
      <div className={style.header}>
        {label && (
          <Typography weight="bold" variant="body1">
            {label}
          </Typography>
        )}

        <TextField className={style.inputContainer} {...field} />
      </div>

      {description && (
        <Tooltip className={style.tooltip}>
          <Typography variant="body2">{description}</Typography>
        </Tooltip>
      )}
    </article>
  )
}

export default EditField

EditField.propTypes = {
  label: T.string,
  description: T.string,
}
