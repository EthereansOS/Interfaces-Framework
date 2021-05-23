import React, { useEffect } from 'react'
import { usePlaceholder } from '@dfohub/core'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'

const DappFunctions = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder('organizationDapp')

  const { organizationHeader, organization } = useOrganizationContext()

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization Dapp Functions',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDapp',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return organizationOverview.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

DappFunctions.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DappFunctions
