import React, { useEffect } from 'react'
import T from 'prop-types'

import { useOrganizationContext } from '../OrganizationContext'
import VotingToken from '../components/VotingToken'

const DeFiToken = ({ setTemplateState }) => {
  const { organizationHeader, organization } = useOrganizationContext()
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

  return <VotingToken organization={organization} />
}

DeFiToken.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default DeFiToken
