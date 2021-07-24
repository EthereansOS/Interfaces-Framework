import React from 'react'
import T from 'prop-types'
import { Button, Link, Typography } from '@dfohub/design-system'

import { OrganizationPropType } from '../../propTypes'

import { ProposalPropTypes } from './propTypes'

function Finalize({ survey, key, finalizeProposal }) {
  const handleFinalize = () => {
    console.log('FInalize proposal', key)
    return finalizeProposal(survey)
  }

  return (
    <div>
      <Typography variant="body1">
        Sometime Web 3 providers can't estimate correctly the Max Gas needed for
        complex transactions. Finalizing a Proposal, you execute the code in the
        EVM, be sure to add the right Max Gas required for its execution. Do it
        at your own risk.{' '}
        <Link href="https://blockgeeks.com/guides/ethereum-gas/" external>
          More
        </Link>
      </Typography>
      <Button
        size="small"
        text="Finalize"
        value={key}
        onClick={handleFinalize}
        color={'tertiary'}
      />
    </div>
  )
}

export default Finalize

Finalize.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  key: ProposalPropTypes.key,
  finalizeProposal: T.func.isRequired,
}
