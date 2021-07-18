import React, { useEffect } from 'react'
import T from 'prop-types'
import { useParams } from 'react-router-dom'

import FarmingContracts from '../components/FarmingContracts'
import Inflation from '../components/Inflation'
import useOrganization from '../hooks/useOrganization'

const DeFiFarming = ({ setTemplateState }) => {
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)

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
