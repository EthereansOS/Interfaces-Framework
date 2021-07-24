import React, { useEffect } from 'react'
import { usePlaceholder, usePrevious, useWeb3 } from '@dfohub/core'
import T from 'prop-types'
import { useParams } from 'react-router-dom'

import useOrganization from '../hooks/useOrganization'
import useOrganizationProposals from '../hooks/useOrganizationProposals'

const GovernanceProposals = ({ setTemplateState }) => {
  const web3Context = useWeb3()
  const organizationOverview = usePlaceholder('organizationGovernanceProposals')
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization Governance Rules',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuGovernance',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  const {
    proposals,
    loadOrganizationProposal,
    listLoading,
    listLoaded,
    myBalance,
    loadProposalCode,
  } = useOrganizationProposals(organization)
  const previousOrganization = usePrevious(organization)

  useEffect(() => {
    if (
      !previousOrganization ||
      !organization ||
      listLoading ||
      !organization.detailsLoaded
    ) {
      return
    }

    loadOrganizationProposal(organization)
  }, [
    organization,
    previousOrganization,
    listLoading,
    proposals,
    loadOrganizationProposal,
  ])

  return organizationOverview.map(({ Component, key }) => (
    <Component
      key={key}
      organization={organization}
      proposals={proposals}
      loading={listLoading}
      loaded={listLoaded}
      myBalance={myBalance}
      loadProposalCode={loadProposalCode}
      web3Context={web3Context}
    />
  ))
}

GovernanceProposals.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default GovernanceProposals
