import React from 'react'
import T from 'prop-types'
import { Typography } from '@dfohub/design-system'

import generateAndCompileContract from '../../../lib/generateAndCompileContract'
import ActionState from '../ActionState'
import {
  ACTION_STATE_DONE,
  ACTION_STATE_LOADING,
  ACTION_STATE_NONE,
} from '../constants'

const ID = 'generateSmartContractProposal'
const generateSmartContractProposal = {
  id: ID,
  initialActionState: ACTION_STATE_NONE,
  Component: ({ actionsState }) => (
    <Typography weight="bold" variant="body1">
      Generating Smart Contract proposal <ActionState state={actionsState} />
    </Typography>
  ),
  handler: async ({
    setSubmitting,
    setActionsState,
    proposalContext,
    setProposalContext,
  }) => {
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_LOADING }))

    try {
      const generatedAndCompiled = await generateAndCompileContract(
        proposalContext.template,
        proposalContext.lines,
        proposalContext.descriptions,
        proposalContext.updates,
        proposalContext.prefixedLines,
        proposalContext.postFixedLines
      )

      setProposalContext((s) => ({
        ...s,
        sourceCode: generatedAndCompiled.sourceCode,
        selectedContract: generatedAndCompiled.selectedContract,
      }))
    } catch (e) {
      console.log('Error on generateSmartContractProposal')
      console.log(e)
    }

    setSubmitting(false)
    setActionsState((s) => ({ ...s, [ID]: ACTION_STATE_DONE }))
  },
}

generateSmartContractProposal.Component.propTypes = {
  actionsState: T.string.isRequired,
}

export default generateSmartContractProposal
