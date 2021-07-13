import React from 'react'
import T from 'prop-types'
import { TextField, Typography, Tooltip } from '@dfohub/design-system'
import { useField } from 'formik'

import style from './edit-field.module.scss'

const EditField = ({ label, description, id, name, ...props }) => {
  const [field] = useField({ id, name })

  return (
    <section>
      <div className={style.header}>
        {label && (
          <Typography weight="bold" variant="body1">
            {label}
          </Typography>
        )}

        <TextField className={style.inputContainer} {...field} {...props} />
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
}
