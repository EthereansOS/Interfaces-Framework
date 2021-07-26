import React, { useEffect } from 'react'
import { usePlaceholder } from '@ethereansos/interfaces-core'
import T from 'prop-types'
import { useParams } from 'react-router-dom'

import useOrganization from '../hooks/useOrganization'

const GovernanceNewProposal = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder(
    'organizationGovernanceNewProposal'
  )
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

  return organizationOverview.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

GovernanceNewProposal.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default GovernanceNewProposal
