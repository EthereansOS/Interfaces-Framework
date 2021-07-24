import React, { useMemo } from 'react'
import T from 'prop-types'
import { Typography } from '@dfohub/design-system'

import { OrganizationPropType } from '../../propTypes'
import Proposal from '../Proposal'

function GovernanceActiveProposals({
  organization,
  loadProposalCode,
  proposals,
  loaded,
}) {
  const list = useMemo(() => {
    return (
      proposals?.filter(
        (proposal) =>
          proposal.checkedTimes !== undefined && !proposal.checkedTimes
      ) || []
    )
  }, [proposals])

  return (
    <>
      <Typography variant="h1">Active Proposals</Typography>

      {!loaded && list.length === 0 && <div>Loading</div>}
      {loaded && list.length === 0 && <div>No proposals</div>}
      {list.length &&
        list.map((proposal) => (
          <Proposal
            key={proposal.key}
            organization={organization}
            survey={proposal}
            loadProposalCode={loadProposalCode}
          />
        ))}
    </>
  )
}

export default GovernanceActiveProposals

GovernanceActiveProposals.propTypes = {
  organization: OrganizationPropType,
  loadProposalCode: T.func.isRequired,
  proposals: T.array.isRequired,
  loaded: T.bool,
}
