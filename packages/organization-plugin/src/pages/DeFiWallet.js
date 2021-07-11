import React, { useEffect } from 'react'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'
import BalanceList from '../components/BalanceList'

const DeFiWallet = ({ setTemplateState }) => {
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

  return <BalanceList organization={organization} />
}

DeFiWallet.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DeFiWallet
