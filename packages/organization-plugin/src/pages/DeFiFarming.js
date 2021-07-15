import React, { useEffect } from 'react'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'
import FarmingContracts from '../components/FarmingContracts'
import Inflation from '../components/Inflation'

const DeFiFarming = ({ setTemplateState }) => {
  const { organizationHeader, organization } = useOrganizationContext()
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization DeFi Farming',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDeFi',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return (
    <>
      <FarmingContracts />
      <Inflation />
    </>
  )
}

DeFiFarming.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DeFiFarming
