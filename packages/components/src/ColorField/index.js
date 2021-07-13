import React, { useState, useEffect, useRef, useCallback } from 'react'
import T from 'prop-types'
import { SketchPicker } from 'react-color'
import { Typography, Tooltip } from '@dfohub/design-system'
import { useField } from 'formik'

import style from './color-field.module.scss'

function useOutsideAlerter(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, onClickOutside])
}

function OutsideManager(props) {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, props.onClickOutside)

  return (
    <div ref={wrapperRef} className={style.pickerComponent}>
      {props.children}
    </div>
  )
}
OutsideManager.propTypes = {
  onClickOutside: T.func,
  children: T.oneOfType([T.arrayOf(T.node), T.node]),
}

const ColorField = ({ label, description, id, name, tabIndex }) => {
  const [field, , helpers] = useField({ id, name })
  const [showPicker, setShowPicker] = useState(false)

  const handleChangeColor = useCallback(
    (color, event) => {
      helpers.setValue(color.hex)
      event.stopPropagation()
      event.preventDefault()
    },
    [helpers]
  )

  const handleChangeComplete = useCallback(
    (color, event) => {
      helpers.setValue(color.hex)
      event.stopPropagation()
      event.preventDefault()
    },
    [helpers]
  )

  const handleClickOutside = useCallback(() => {
    setShowPicker(false)
  }, [setShowPicker])

  return (
    <section>
      <div className={style.header}>
        {label && (
          <Typography weight="bold" variant="body1">
            {label}
          </Typography>
        )}
        <div
          className={style.picker}
          role="button"
          tabIndex={tabIndex}
          onKeyDown={() => setShowPicker(true)}
          onClick={() => setShowPicker(true)}>
          <div
            className={style.innerPicker}
            style={{ backgroundColor: field.value }}>
            &nbsp;
          </div>
          {showPicker && (
            <OutsideManager onClickOutside={handleClickOutside}>
              <SketchPicker
                color={field.value || '#000'}
                onChangeComplete={handleChangeComplete}
                onChange={handleChangeColor}
              />
            </OutsideManager>
          )}
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

export default ColorField

ColorField.propTypes = {
  label: T.string,
  description: T.string,
  tabIndex: T.number,
  id: T.string.isRequired,
  name: T.string,
}

ColorField.defaultProps = {
  tabIndex: 0,
}
