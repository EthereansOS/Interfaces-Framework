import React from 'react'
import { Card } from '@dfohub/design-system'

import { OrganizationPropType } from '../propTypes'

const OrganizationInfo = ({ organization }) => {
  return <Card>Organization info {JSON.stringify(organization)}</Card>
}

OrganizationInfo.propTypes = {
  organization: OrganizationPropType.isRequired,
}

export default OrganizationInfo
