import React, { useEffect } from 'react'
import { usePlaceholder } from '@dfohub/core'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'

const DeFi = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder('organizationDeFi')
  const { organizationHeader, organization } = useOrganizationContext()
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization DeFi',
      mainMenu: 'organizationMenu',
      mainSubMenu: null,
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return organizationOverview.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

DeFi.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DeFi
