import React, { useCallback, useRef } from 'react'
import T from 'prop-types'
import * as Yup from 'yup'
import { Button, Typography, Tooltip } from '@dfohub/design-system'
import { useField } from 'formik'

import style from './file-field.module.scss'

async function checkCoverSize(file) {
  const cover = file.size ? file : file.item ? file.item(0) : file.get(0)
  return await new Promise(function (resolve) {
    var reader = new FileReader()
    reader.addEventListener(
      'load',
      function () {
        const image = new Image()
        image.onload = function onload() {
          const byteLength = parseInt(
            reader.result
              .substring(reader.result.indexOf(',') + 1)
              .replace(/=/g, '').length * 0.75
          )
          const mBLength = byteLength / 1024 / 1024
          image.byteLength = byteLength
          image.mBLength = mBLength
          return resolve(image)
        }
        image.src = (window.URL || window.webkitURL).createObjectURL(cover)
      },
      false
    )
    reader.readAsDataURL(cover)
  })
}

Yup.addMethod(Yup.mixed, 'fileSizeMax', function (max) {
  return this.test({
    name: 'fileSizeMax',
    message: 'The file is too big',
    params: { max },
    test: (file) => {
      if (!file) {
        return true
      }
      return file.size < max
    },
  })
})

Yup.addMethod(Yup.mixed, 'imageMaxWidth', function (maxWidth) {
  return this.test({
    name: 'imageMaxWidth',
    message: `The max image with is ${maxWidth}`,
    params: { maxWidth },
    test: async (file) => {
      if (!file) {
        return true
      }
      const image = await checkCoverSize(file)
      return image.width < maxWidth
    },
  })
})
Yup.addMethod(Yup.mixed, 'imageMaxMBSize', function (maxMBSize) {
  return this.test({
    name: 'imageMaxMBSize',
    message: `The max image size inn Mb is ${maxMBSize}`,
    params: { maxMBSize },
    test: async (file) => {
      if (!file) {
        return true
      }
      const image = await checkCoverSize(file)
      return image.mBLength < maxMBSize
    },
  })
})

const FileField = ({ label, description, id, name, isImage, ...props }) => {
  const hiddenFileInput = useRef(null)
  const [field, { error, touched }, helpers] = useField({ id, name })

  const handleClick = useCallback(() => {
    hiddenFileInput.current.click()
  }, [hiddenFileInput])

  const handleChange = useCallback(
    async (e) => {
      helpers.setTouched(true)
      helpers.setValue(e.target.files[0], true)
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
      </div>
      {value?.name && <Typography variant="body2"> {value?.name}</Typography>}

      {touched && error ? error : ''}
      {description && (
        <Tooltip className={style.tooltip}>
          <Typography variant="body2">{description}</Typography>
        </Tooltip>
      )}
    </section>
  )
}

export default FileField

FileField.propTypes = {
  id: T.string.isRequired,
  name: T.string,
  label: T.string,
  description: T.string,
  isImage: T.bool,
}
