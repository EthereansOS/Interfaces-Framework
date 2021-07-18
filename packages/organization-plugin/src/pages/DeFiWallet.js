import React, { useEffect } from 'react'
import T from 'prop-types'
import { useParams } from 'react-router-dom'

import BalanceList from '../components/BalanceList'
import useOrganization from '../hooks/useOrganization'

const DeFiWallet = ({ setTemplateState }) => {
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)

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
