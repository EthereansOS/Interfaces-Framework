import React, { useEffect } from 'react'
import T from 'prop-types'
import { useParams } from 'react-router-dom'

import StateList from '../components/StateList'
import useOrganization from '../hooks/useOrganization'

const DappState = ({ setTemplateState }) => {
  const params = useParams()
  const { organization, organizationHeader } = useOrganization(params.address)

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
