import React from 'react'
import { Card } from '@dfohub/design-system'

import { OrganizationPropType } from '../propTypes'

const DecentralizedApplication = ({ organization }) => {
  return <Card>Decentralized Application {JSON.stringify(organization)}</Card>
}

DecentralizedApplication.propTypes = {
  organization: OrganizationPropType.isRequired,
}

export default DecentralizedApplication
