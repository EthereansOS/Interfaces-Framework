import React from 'react'
import T from 'prop-types'
import { TextField, Typography } from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  toDecimals,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_ERROR,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import style from '../proposal-confirm.module.scss'
import formatDFOLogs from '../../../lib/formatDFOLogs'

const ID = 'DeployGovernanceRules'

const DeployGovernanceRules = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState, setFieldValue, values, isRecovery }) => (
    <>
      <Typography weight="bold" variant="body1">
        Deploy Govrenance Rules <ActionState state={actionsState} />
      </Typography>
      <div className={style.spacer} />
      {isRecovery && (
        <>
          <Typography variant="body2">
            If you have already deployed this Smart Contract, you can paste here
            the transaction hash, to proceed without needs re-deploy it and pay
            additional ETH fees.
          </Typography>
          <div className={style.spacer} />

          <TextField
            value={values.smartContractTransactionHash || ''}
            name="smartContractTransactionHash"
            id="smartContractTransactionHash"
            placeholder="Transaction hash"
            onChange={(e) => {
              setFieldValue('smartContractTransactionHash', e.target.value)
            }}
          />
        </>
      )}
    </>
  ),
  handler: async ({
    values,
    isRecovery,
    setSubmitting,
    setActionsState,
    web3Context,
    proposalContext,
    setProposalContext,
    dfoHub,
  }) => {
    setActionsState((s) => ({
      ...s,
      [ID]: ACTION_STATE_LOADING,
    }))
    try {
      if (values.validationTransactionHash && isRecovery) {
        const transaction = await web3Context.web3.eth.getTransactionReceipt(
          values.validationTransactionHash
        )
        setProposalContext((s) => ({
          ...s,
          functionalitiesManagerAddress: formatDFOLogs(
            web3Context,
            transaction.logs,
            'DFOCollateralContractsCloned(address_indexed,address)'
          )[0].data[0],
        }))
      } else {
        var params = [
          'address',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
          'uint256',
        ]
        const values = [
          VOID_ETHEREUM_ADDRESS,
          0,
          proposalContext.surveyLength,
          proposalContext.emergencySurveyLength,
          toDecimals(proposalContext.emergencySurveyStaking, 18),
          proposalContext.surveyQuorum
            ? toDecimals(proposalContext.surveyQuorum, 18)
            : 0,
          proposalContext.surveyMaxCap
            ? toDecimals(proposalContext.surveyMaxCap, 18)
            : 0,
          proposalContext.surveyMinStake
            ? toDecimals(proposalContext.surveyMinStake, 18)
            : 0,
          proposalContext.surveySingleReward
            ? toDecimals(proposalContext.surveySingleReward, 18)
            : 0,
        ]
        const payload = web3Context.web3.eth.abi.encodeParameters(
          params,
          values
        )

        const response = await blockchainCall(
          web3Context,
          dfoHub.dFO.methods.submit,
          'deployGovernanceRules',
          payload
        )

        const functionalitiesManagerAddress = formatDFOLogs(
          web3Context,
          response.events.Event,
          'DFOCollateralContractsCloned(address_indexed,address)'
        ).raw.data[0]

        setProposalContext((s) => ({
          ...s,
          functionalitiesManagerAddress,
        }))
      }
    } catch (e) {
      console.log('deploy governance rules step error', e)
      setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_ERROR }))
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

DeployGovernanceRules.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    smartContractTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
  proposalContext: T.any,
}

export default DeployGovernanceRules
