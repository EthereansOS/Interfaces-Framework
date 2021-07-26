import React, { useEffect } from 'react'
import T from 'prop-types'
import { useParams } from 'react-router-dom'
import { usePlaceholder } from '@ethereansos/interfaces-core'

import useOrganization from '../hooks/useOrganization'

const DappFunctions = ({ setTemplateState }) => {
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)
  const organizationDappFunctions = usePlaceholder('organizationDappFunctions')

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization Dapp Functions',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDapp',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organizationHeader])

  return organizationDappFunctions.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

DappFunctions.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DappFunctions
