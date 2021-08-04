import React from 'react'
import {
  Button,
  EditField,
  Typography,
  useFormikContext,
} from '@ethereansos/interfaces-ui'
import T from 'prop-types'

import CheckboxField from '../shared/CheckboxField'
import SelectField from '../shared/SelectField'
import useFetchFunctions from '../../hooks/useFetchFunctions'
import { OrganizationPropType } from '../../propTypes'

import ContractNamePicker from './ContractNamePicker'
import style from './new-proposal-form.module.scss'
import MethodNamePicker from './MethodNamePicker'

const Sidebar = ({
  codeContracts,
  contractNames,
  setContractMethods,
  contractMethods,
  organization,
  compiled,
  compile,
  publish,
}) => {
  const { funcNames } = useFetchFunctions(organization, true)
  const { values, isSubmitting, errors } = useFormikContext()

  return (
    <div className={style.sidebar}>
      <EditField id="functionalityName" name="functionalityName" label="Name" />
      <EditField
        id="functionalityLink"
        name="functionalityLink"
        label="Discussion Link"
      />

      <EditField
        id="functionalityDescription"
        name="functionalityDescription"
        label="Function description"
        isMultiline
        rows="4"
      />

      {values.replacesCheck && (
        <EditField
          id="functionalityDescriptionUpdate"
          name="functionalityDescriptionUpdate"
          label="Update description"
          isMultiline
          rows="4"
        />
      )}

      <ContractNamePicker
        codeContracts={codeContracts}
        contractNames={contractNames}
        containerClassName={style.sidebarSelect}
        setContractMethods={setContractMethods}
      />
      <MethodNamePicker
        containerClassName={style.sidebarSelect}
        contractMethods={contractMethods}
        codeContracts={codeContracts}
      />

      <CheckboxField
        disabled
        name="functionalitySubmitable"
        label="Submitable"
      />
      <CheckboxField
        name="functionalityInternal"
        label="Internal"
        disabled={errors.functionalityInternal}
      />
      <CheckboxField
        name="functionalityNeedsSender"
        label="Needs Sender"
        disabled={errors.functionalityNeedsSender}
      />
      <CheckboxField name="replacesCheck" label="Function replacing" />
      {values.replacesCheck && (
        <SelectField
          name="functionalityReplace"
          placeholder="Replacing functionality"
          options={funcNames.map((name) => ({
            label: name,
            id: name,
          }))}
          containerClassName={style.sidebarSelect}
        />
      )}
      <Button
        text="Compile"
        size="small"
        onClick={compile}
        disabled={isSubmitting}
      />
      <Button
        onClick={publish}
        disabled={!compiled || isSubmitting}
        text="Publish"
        size="small"
      />
      <Typography variant="body1" className={style.advanced} weight="bold">
        Advanced
      </Typography>
      <CheckboxField name="emergency" label="Emergency" />
      <CheckboxField name="deployed" label="Deployed Contract?" />
      {values.deployed && (
        <EditField
          placeholder="Smart Contract address"
          id="functionalityAddressValue"
          name="functionalityAddressValue"
        />
      )}
    </div>
  )
}

export default Sidebar

Sidebar.propTypes = {
  compiled: T.bool,
  codeContracts: T.any,
  contractNames: T.arrayOf(T.string),
  setContractMethods: T.func,
  contractMethods: T.arrayOf(T.shape({ id: T.string, label: T.string })),
  organization: OrganizationPropType,
  compile: T.func,
  publish: T.func,
}
