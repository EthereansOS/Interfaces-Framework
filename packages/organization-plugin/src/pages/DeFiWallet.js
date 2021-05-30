import React, { useEffect } from 'react'
import { usePlaceholder } from '@dfohub/core'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'

const DeFiWallet = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder('organizationDeFi')
  const { organizationHeader, organization } = useOrganizationContext()
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization DeFi Wallet',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDeFi',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return organizationOverview.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

DeFiWallet.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DeFiWallet
