import React from 'react'
import T from 'prop-types'
import { Typography } from '@ethereansos/interfaces-ui'
import {
  blockchainCall,
  getNetworkElement,
  hasEthereumAddress,
  VOID_ETHEREUM_ADDRESS,
} from '@ethereansos/interfaces-core'

import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'

const ID = 'publishProposal'

const publishProposal = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState }) => (
    <Typography weight="bold" variant="body1">
      Publishing Proposal... <ActionState state={actionsState} />
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
        proposalContext.element.dFO.methods.newProposal,
        proposalContext.functionalityName || '',
        proposalContext.emergency || false,
        proposalContext.firstAddress ||
          getNetworkElement(web3Context, 'defaultOcelotTokenAddress'),
        isNaN(proposalContext.functionalitySourceId)
          ? 0
          : proposalContext.functionalitySourceId,
        hasEthereumAddress(proposalContext.functionalityAddress)
          ? proposalContext.functionalityAddress
          : VOID_ETHEREUM_ADDRESS,
        proposalContext.functionalitySubmitable ||
          proposalContext.functionalityMethodSignature ===
            'callOneTime(address)',
        proposalContext.functionalityMethodSignature || '',
        proposalContext.functionalityOutputParameters || '',
        proposalContext.functionalityInternal || false,
        proposalContext.functionalityNeedsSender || false,
        proposalContext.functionalityReplace || ''
      )
    } catch (e) {
      console.log(e)
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

publishProposal.Component.propTypes = {
  actionsState: T.string.isRequired,
}

export default publishProposal
