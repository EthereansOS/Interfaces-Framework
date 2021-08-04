import React from 'react'
import T from 'prop-types'
import { TextField, Typography } from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  VOID_ETHEREUM_ADDRESS,
  toDecimals,
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

const ID = 'deployVotingToken'

const deployVotingToken = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({
    actionsState,
    setFieldValue,
    values,
    isRecovery,
    proposalContext,
  }) => (
    <>
      <Typography weight="bold" variant="body1">
        Deploy Voting Token | {proposalContext.tokenTotalSupply}{' '}
        {proposalContext.tokenSymbol} <ActionState state={actionsState} />
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

        const response = formatDFOLogs(
          web3Context,
          transaction.logs,
          'DFOCollateralContractsCloned(address_indexed,address,address,address)'
        )[0].data

        setProposalContext((s) => ({
          ...s,
          votingToken: response[0],
          stateHolder: response[1],
          functionaltyModelsManagerAddress: response[2],
        }))
      } else {
        const payload = web3Context.web3.eth.abi.encodeParameters(
          ['address', 'uint256', 'string', 'string', 'uint256', 'uint256'],
          [
            VOID_ETHEREUM_ADDRESS,
            0,
            proposalContext.tokenName,
            proposalContext.tokenSymbol,
            proposalContext.tokenTotalSupply,
            proposalContext.surveyCommunityStake
              ? toDecimals(proposalContext.surveyCommunityStake, 18)
              : 0,
          ]
        )

        let response = await blockchainCall(
          web3Context,
          dfoHub.dFO.methods.submit,
          'deployVotingToken',
          payload
        )

        response = formatDFOLogs(
          web3Context,
          response.events.Event,
          'DFOCollateralContractsCloned(address_indexed,address,address,address)'
        ).raw.data

        setProposalContext((s) => ({
          ...s,
          votingToken: response[0],
          stateHolder: response[1],
          functionaltyModelsManagerAddress: response[2],
        }))
      }
    } catch (e) {
      console.log('deploy voting token step error', e)
      setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_ERROR }))
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

deployVotingToken.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    smartContractTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
  proposalContext: T.any,
}

export default deployVotingToken
