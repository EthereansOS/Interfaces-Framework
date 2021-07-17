import React, { useEffect } from 'react'
import { usePlaceholder } from '@dfohub/core'
import { useParams } from 'react-router-dom'
import T from 'prop-types'

import useOrganization from '../hooks/useOrganization'

const Overview = ({ setTemplateState }) => {
  const organizationOverview = usePlaceholder('organizationOverview')
  const params = useParams()

  const { organization, organizationHeader } = useOrganization(params.address)

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'Organization overview',
      mainMenu: 'organizationMenu',
      mainSubMenu: null,
      beforeMenu: organizationHeader,
    }))
  }, [setTemplateState, organization, organizationHeader])

  if (!organization) {
    return false
  }

  return organizationOverview.map(({ Component, key }) => (
    <Component key={key} organization={organization} />
  ))
}

Overview.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default Overview
