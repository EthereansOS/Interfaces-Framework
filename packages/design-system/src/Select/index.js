import React from 'react'
import classNames from 'classnames'
import SelectLibrary from 'react-select'
import T from 'prop-types'

const Select = ({
  containerClassName,
  selectClassName,
  onSelect,
  options,
  value,
  valueKey,
  ...props
}) => {
  const handleChange = (value) => {
    onSelect(valueKey, value)
  }

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
        value={options.find((o) => o.value === value)}
        className={classNames(selectClassName)}
        onChange={(e) => handleChange(e.value)}
        options={options}
        styles={colourStyles}
      />
    </div>
  )
}

Select.propTypes = {
  containerClassName: T.string,
  selectClassName: T.string,
  onSelect: T.func.isRequired,
  options: T.arrayOf(T.object).isRequired,
  value: T.any.isRequired,
  valueKey: T.string.isRequired,
}

export default Select
