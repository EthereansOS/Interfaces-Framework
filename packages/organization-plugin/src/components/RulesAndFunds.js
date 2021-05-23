import React from 'react'
import { Card } from '@dfohub/design-system'

import { OrganizationPropType } from '../propTypes'

const RulesAndFunds = ({ organization }) => {
  return <Card>Rules And Funds {JSON.stringify(organization)}</Card>
}

RulesAndFunds.propTypes = {
  organization: OrganizationPropType.isRequired,
}

export default RulesAndFunds
