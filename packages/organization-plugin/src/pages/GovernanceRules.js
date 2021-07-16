import React, { useEffect } from 'react'
import { usePlaceholder } from '@dfohub/core'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'

const GovernanceRules = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder('organizationGovernanceRules')
  const { organizationHeader, organization } = useOrganizationContext()
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

GovernanceRules.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default GovernanceRules
