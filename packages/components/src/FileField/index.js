import React, { useCallback, useRef } from 'react'
import T from 'prop-types'
import { Button, Typography, Tooltip } from '@dfohub/design-system'
import { useField } from 'formik'

import style from './file-field.module.scss'

const EditField = ({ label, description, id, name, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [field, , helpers] = useField({ id, name })

  const handleClick = useCallback(() => {
    hiddenFileInput.current.click()
  }, [hiddenFileInput])

  const handleChange = useCallback(
    (e) => {
      helpers.setValue(e.target.files[0])
    },
    [helpers]
  )

  const { value, ...rest } = field
  return (
    <section>
      <div className={style.header}>
        {label && (
          <Typography weight="bold" variant="body1">
            {label}
          </Typography>
        )}

        <Button
          onClick={handleClick}
          text="Choose file"
          type="button"
          color="tertiary"
        />
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: 'none' }}
          {...rest}
          {...props}
          onChange={handleChange}
        />
        {value?.name && <Typography variant="body2"> {value?.name}</Typography>}
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
