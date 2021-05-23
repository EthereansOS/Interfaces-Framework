import React, { useEffect } from 'react'
import { usePlaceholder } from '@dfohub/core'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'

const Governance = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder('organizationGovernance')
  const { organizationHeader, organization } = useOrganizationContext()
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization governance',
      mainMenu: 'organizationMenu',
      mainSubMenu: null,
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return organizationOverview.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

Governance.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Governance
