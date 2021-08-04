import React, { useEffect } from 'react'
import { useFormikContext } from '@ethereansos/interfaces-ui'
import T from 'prop-types'

import SelectField from '../shared/SelectField'

// this component is used to let the user choose the contract
// to compile and to populate the next MethodNamePicker component
// with the contracts method's names and signatures
const ContractNamePicker = ({
  contractNames,
  containerClassName,
  setContractMethods,
  codeContracts,
}) => {
  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    const onContractChange = () => {
      // delete _this.contractConstructor
      setContractMethods([])
      const selectedContract = codeContracts[values.contractName]
      if (!selectedContract) {
        return
      }

      const abi = selectedContract.abi
      const methods = abi
        .filter((it) => {
          if (it.type !== 'function') {
            return false
          }
          if (it.type === 'constructor') {
            return false
          }
          if (
            it.name === 'onStart' &&
            it.stateMutability !== 'view' &&
            it.stateMutability !== 'pure' &&
            it.inputs.length === 2 &&
            it.inputs[0].type === 'address' &&
            it.inputs[1].type === 'address'
          ) {
            return false
          }
          if (
            it.name === 'onStop' &&
            it.stateMutability !== 'view' &&
            it.stateMutability !== 'pure' &&
            it.inputs.length === 1 &&
            it.inputs[0].type === 'address'
          ) {
            return false
          }
          if (
            it.name === 'getMetadataLink' &&
            it.stateMutability === 'view' &&
            it.inputs.length === 0 &&
            it.outputs.length === 1 &&
            it.outputs[0].type === 'string'
          ) {
            return false
          }

          return true
        })
        .map((it, i) => {
          const name = (
            it.type === 'function'
              ? it.name +
                '(' +
                it.inputs
                  .map((it) => it.type)
                  .join(',')
                  .trim() +
                ')'
              : ''
          )
            .split(' ')
            .join('')
            .split(',)')
            .join(')')
          const args = JSON.stringify(it.outputs.map((it) => it.type))
            .split(' ')
            .join('')

          if (it.type === 'constructor') {
            // setContractConstructor(it)
          }

          return {
            label: name,
            id: `${i}_${name}_${args}`,
          }
        })

      setContractMethods(methods)
      if (!methods.length) {
        setFieldValue('contractName', '')
        // delete this.contractConstructor
      } else {
        setFieldValue('functionalityMethodSignature', methods?.[0]?.id)
      }
      // this.codeContracts.name && delete this.contractConstructor
    }

    if (
      contractNames.length &&
      Object.keys(codeContracts)?.length &&
      values.contractName
    ) {
      onContractChange()
    }
  }, [
    contractNames.length,
    codeContracts,
    setContractMethods,
    setFieldValue,
    values.contractName,
  ])

  return (
    <SelectField
      name="contractName"
      placeholder="Contract name"
      options={contractNames}
      containerClassName={containerClassName}
    />
  )
}

export default ContractNamePicker

ContractNamePicker.propTypes = {
  contractNames: T.arrayOf(T.shape({ id: T.string, label: T.string })),
  containerClassName: T.string,
  setContractMethods: T.func,
  codeContracts: T.any, // TODO
}
