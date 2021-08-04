import React from 'react'
import T from 'prop-types'
import { Typography } from '@ethereansos/interfaces-ui'
import { deployMetadataLink } from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_ERROR,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import style from '../proposal-confirm.module.scss'
import { orgEditInitialValues } from '../../OrganizationEdit'

const ID = 'DeployMetadata'

const DeployMetadata = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState }) => (
    <>
      <Typography weight="bold" variant="body1">
        Deploy metadata <ActionState state={actionsState} />
      </Typography>
      <div className={style.spacer} />
    </>
  ),
  handler: async ({
    setSubmitting,
    setActionsState,
    web3Context,
    proposalContext,
  }) => {
    setActionsState((s) => ({
      ...s,
      [ID]: ACTION_STATE_LOADING,
    }))
    try {
      const outerMetadata = Object.keys(orgEditInitialValues).reduce(
        (acc, key) => {
          acc[key] = proposalContext[key]
          return acc
        },
        {}
      )

      const metadata = {}
      Object.entries(outerMetadata).forEach(
        (entry) => (metadata[entry[0]] = entry[1])
      )

      await deployMetadataLink(
        web3Context,
        metadata,
        proposalContext.functionalitiesManagerAddress
      )
    } catch (e) {
      console.log('deploy metadata step error', e)
      setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_ERROR }))
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

DeployMetadata.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    smartContractTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
  proposalContext: T.any,
}

export default DeployMetadata
