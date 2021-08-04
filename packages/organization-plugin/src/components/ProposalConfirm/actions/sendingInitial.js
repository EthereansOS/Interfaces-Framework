import React from 'react'
import T from 'prop-types'
import { Typography } from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  fromDecimals,
  numberToString,
} from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'
import { OrganizationPropType } from '../../../propTypes'

const ID = 'sendingInitial'

const sendingInitial = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState, organization }) => (
    <Typography weight="bold" variant="body1">
      Sending Initial{' '}
      {fromDecimals(organization.minimumStaking, organization.decimals)}{' '}
      {organization.symbol} for Staking <ActionState state={actionsState} />
    </Typography>
  ),
  handler: async ({
    setSubmitting,
    setActionsState,
    web3Context,
    proposalContext,
  }) => {
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_LOADING }))

    try {
      await blockchainCall(
        web3Context,
        proposalContext.element.token.methods.transfer,
        proposalContext.element.transaction.events.Proposal.returnValues
          .proposal,
        numberToString(proposalContext.element.minimumStaking)
      )
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

sendingInitial.Component.propTypes = {
  actionsState: T.string.isRequired,
  organization: OrganizationPropType,
}

export default sendingInitial
