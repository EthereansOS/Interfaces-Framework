import React, { useMemo } from 'react'
import T from 'prop-types'
import { LinearProgress, Typography } from '@ethereansos/interfaces-ui'
import { getNetworkElement, useWeb3 } from '@ethereansos/interfaces-core'

import { OrganizationPropType } from '../../propTypes'
import Proposal from '../Proposal'

function GovernanceHistoryProposals({
  organization,
  loadDiff,
  finalizeProposal,
  proposals,
  loaded,
}) {
  const web3Context = useWeb3()
  const etherscanURL = useMemo(
    () => getNetworkElement(web3Context, 'etherscanURL'),
    [web3Context]
  )

  const list = useMemo(() => {
    return (
      proposals.filter(
        (proposal) =>
          proposal.checkedTimes !== undefined && proposal.checkedTimes
      ) || []
    )
  }, [proposals])

  return (
    <>
      <Typography variant="h1" fontFamily="secondary" color="primary">
        Proposals History
      </Typography>

      {!loaded && list.length === 0 && <LinearProgress />}
      {loaded && list.length === 0 && (
        <Typography variant="body2">No proposals</Typography>
      )}
      {!!list.length &&
        list.map((proposal) => (
          <Proposal
            key={proposal.key}
            organization={organization}
            survey={proposal}
            loadDiff={loadDiff}
            finalizeProposal={finalizeProposal}
            etherscanURL={etherscanURL}
          />
        ))}
    </>
  )
}

export default GovernanceHistoryProposals

GovernanceHistoryProposals.propTypes = {
  organization: OrganizationPropType,
  loadDiff: T.func.isRequired,
  finalizeProposal: T.func.isRequired,
  proposals: T.array.isRequired,
  loaded: T.bool,
}
