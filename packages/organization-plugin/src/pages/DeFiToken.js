import React, { useEffect } from 'react'
import T from 'prop-types'
import { useParams } from 'react-router-dom'
import { usePlaceholder } from '@ethereansos/interfaces-core'

import useOrganization from '../hooks/useOrganization'

const DeFiToken = ({ setTemplateState }) => {
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)
  const organizationDeFiToken = usePlaceholder('organizationDeFiToken')

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization DeFi Token',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDeFi',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  if (!organization) return null

  return organizationDeFiToken.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

DeFiToken.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DeFiToken
