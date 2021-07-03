import React, { useEffect } from 'react'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'
import FunctionList from '../components/FunctionList'

const DappFunctions = ({ setTemplateState }) => {
  const { organizationHeader, organization } = useOrganizationContext()

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization Dapp Functions',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDapp',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organizationHeader])

  return (
    <>
      <FunctionList organization={organization} />
    </>
  )
}

DappFunctions.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DappFunctions
