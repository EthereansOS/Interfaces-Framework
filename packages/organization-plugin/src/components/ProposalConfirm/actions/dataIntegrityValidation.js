import React from 'react'
import T from 'prop-types'
import { Typography } from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  formatMoney,
  fromDecimals,
  toDecimals,
  web3Utils,
} from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_ERROR,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import style from '../proposal-confirm.module.scss'

const ID = 'dataIntegrityValidation'

function calculateAvailableSupplyBasedField(
  data,
  availableSupply,
  errors,
  fieldName,
  label,
  bypassCheck
) {
  console.log(data[fieldName], data, fieldName)
  const value = !isNaN(data[fieldName]) && parseFloat(data[fieldName])
  if (!value) return
  const minCheck = bypassCheck ? value < 0 : value <= 0
  ;(isNaN(value) || minCheck || value > availableSupply) &&
    errors.push(
      `${label} must be a valid, positive number ${
        bypassCheck ? 'between 0 and' : 'less than'
      } ${formatMoney(availableSupply)}`
    )
}

const dataIntegrityValidation = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState }) => (
    <>
      <Typography weight="bold" variant="body1">
        Data Integrity Validation <ActionState state={actionsState} />
      </Typography>
      <div className={style.spacer} />
    </>
  ),
  handler: async ({
    setSubmitting,
    setActionsState,
    proposalContext,
    setProposalContext,
    web3Context,
    dfoHub,
  }) => {
    console.log('DFOHUB', dfoHub)
    setActionsState((s) => ({
      ...s,
      [ID]: ACTION_STATE_LOADING,
    }))

    const totalSupplyWei = toDecimals(proposalContext.tokenTotalSupply, 18)

    let votingTokenAmountForHub = await blockchainCall(
      web3Context,
      dfoHub.dFO.methods.read,
      'getVotingTokenAmountForHub',
      web3Context.web3.eth.abi.encodeParameter('uint256', totalSupplyWei)
    )
    votingTokenAmountForHub = web3Context.web3.eth.abi.decodeParameter(
      'uint256',
      votingTokenAmountForHub
    )

    const amount = {
      votingTokenAmountForHub,
      available: web3Context.web3.utils
        .toBN(totalSupplyWei)
        .sub(web3Utils.toBN(votingTokenAmountForHub))
        .toString(),
    }

    setProposalContext((s) => ({
      ...s,
      totalSupplyWei,
      availableSupply: amount.available,
    }))

    var errors = []
    !proposalContext.tokenName && errors.push('Insert a valid Token Name')
    !proposalContext.tokenSymbol && errors.push('Insert a valid Token Symbol')
    ;(isNaN(proposalContext.tokenTotalSupply) ||
      proposalContext.tokenTotalSupply <= 0) &&
      errors.push('Token Total Supply must be greater than 0')
    !proposalContext.ensDomain && errors.push('ENS Domain is mandatory')
    ;(isNaN(proposalContext.surveyLength) ||
      proposalContext.surveyLength <= 0) &&
      errors.push('Survey Length must be a number greater than 0')
    ;(isNaN(proposalContext.emergencySurveyLength) ||
      proposalContext.emergencySurveyLength <= 0) &&
      errors.push('Emergency Survey Length must be a number greater than 0')

    const availableSupply = parseFloat(
      fromDecimals(amount.available, 18).split(',').join('')
    )

    calculateAvailableSupplyBasedField(
      proposalContext,
      availableSupply,
      errors,
      'emergencySurveyStaking',
      'Penalty Fee',
      true
    )
    calculateAvailableSupplyBasedField(
      proposalContext,
      availableSupply,
      errors,
      'surveyQuorum',
      'Survey Quorum'
    )
    calculateAvailableSupplyBasedField(
      proposalContext,
      availableSupply,
      errors,
      'surveyMaxCap',
      'Max Cap'
    )
    calculateAvailableSupplyBasedField(
      proposalContext,
      availableSupply,
      errors,
      'surveyMinStake',
      'Min Staking'
    )
    calculateAvailableSupplyBasedField(
      proposalContext,
      availableSupply,
      errors,
      'surveyCommunityStake',
      'DFO Locked Supply'
    )
    calculateAvailableSupplyBasedField(
      proposalContext,
      availableSupply,
      errors,
      'surveySingleReward',
      'Activity Reward'
    )
    setSubmitting(false)

    if (errors.length > 0) {
      setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_ERROR }))

      throw errors
    }

    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

dataIntegrityValidation.Component.propTypes = {
  actionsState: T.string.isRequired,
  setFieldValue: T.func.isRequired,
  values: T.shape({
    smartContractTransactionHash: T.string,
  }).isRequired,
  isRecovery: T.bool,
}

export default dataIntegrityValidation
