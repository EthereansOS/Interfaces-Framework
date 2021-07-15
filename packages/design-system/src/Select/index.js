import React, { useMemo } from 'react'
import classNames from 'classnames'
import SelectLibrary from 'react-select'
import T from 'prop-types'

import Label from './label'

const Select = ({
  id,
  containerClassName,
  selectClassName,
  onSelect,
  options = [],
  value,
  showIcon,
  ...props
}) => {
  // TODO verify and properly name the `id` field
  const handleChange = (value) => {
    onSelect(id, value.id)
  }

  const formattedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        label: <Label text={option.label} image={option.image} />,
      })),
    [options]
  )

  // TODO All this should be done using the CSS
  const colourStyles = {
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      const hover = '#292929'
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? hover
          : isFocused
          ? hover
          : null,
        color: isDisabled && '#464646',
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && isSelected && hover,
        },
      }
    },
  }

  return (
    <div className={classNames(containerClassName)}>
      <SelectLibrary
        {...props}
        value={options.find((o) => o.id === value)}
        className={classNames(selectClassName)}
        onChange={(value) => {
          handleChange(value)
        }}
        options={formattedOptions}
        styles={colourStyles}
      />
    </div>
  )
}

Select.propTypes = {
  containerClassName: T.string,
  selectClassName: T.string,
  id: T.string.isRequired,
  onSelect: T.func.isRequired,
  options: T.arrayOf(T.object).isRequired,
  value: T.any.isRequired,
  showIcon: T.bool,
}

export default Select
