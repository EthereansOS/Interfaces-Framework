import React, { useEffect } from 'react'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'
import StateList from '../components/StateList'

const DappState = ({ setTemplateState }) => {
  const { organizationHeader, organization } = useOrganizationContext()
  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization Dapp State',
      mainMenu: 'organizationMenu',
      mainSubMenu: 'organizationSubMenuDapp',
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  return <StateList organization={organization} />
}

DappState.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DappState
