import React, { useEffect } from 'react'
import T from 'prop-types'
import { useFormikContext } from '@ethereansos/interfaces-ui'

import SelectField from '../shared/SelectField'

const MethodNamePicker = ({
  contractMethods,
  containerClassName,
  codeContracts,
}) => {
  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    const onMethodChange = () => {
      setFieldValue('functionalitySubmitable', false)
      setFieldValue('functionalityInternal', false)
      setFieldValue('functionalityNeedsSender', false)

      if (!Object.keys(codeContracts).length) {
        return
      }

      const funct = (
        codeContracts.name ? codeContracts : codeContracts[values.contractName]
      ).abi[values.functionalityMethodSignature.split('_')[0]]
      const isSubmitable =
        funct.stateMutability !== 'view' && funct.stateMutability !== 'pure'

      setFieldValue('functionalitySubmitable', isSubmitable)
    }

    if (
      values.functionalityMethodSignature &&
      Object.keys(codeContracts)?.length
    ) {
      onMethodChange()
    }
  }, [
    codeContracts,
    setFieldValue,
    values.contractName,
    values.functionalityMethodSignature,
  ])

  return (
    <SelectField
      name="functionalityMethodSignature"
      placeholder="Method signature"
      options={contractMethods}
      containerClassName={containerClassName}
    />
  )
}

export default MethodNamePicker

MethodNamePicker.propTypes = {
  contractMethods: T.arrayOf(T.shape({ id: T.string, label: T.string })),
  containerClassName: T.string,
  codeContracts: T.any, //TODO
}
