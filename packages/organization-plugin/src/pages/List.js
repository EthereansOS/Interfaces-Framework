import React, { useEffect } from 'react'
import T from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from '@dfohub/design-system'

import useOrganizations from '../hooks/useOrganizations'

const List = ({ setTemplateState }) => {
  const { organizations, unsetOrganization } = useOrganizations()

  useEffect(() => {
    unsetOrganization()
  }, [unsetOrganization])

  useEffect(() => {
    setTemplateState((s) => ({
      ...s,
      headerTitle: 'LIST',
      mainMenu: null,
      mainSubMenu: null,
    }))
  }, [setTemplateState])

  return (
    <Card>
      <ul>
        {Object.keys(organizations).map((key) => {
          const item = organizations[key]
          return (
            <li key={item.key}>
              Icon: <img src={item.icon} alt="logo" />
              <br />
              Name: {item.name}
              <br />
              Functions: {item.functionalitiesAmount}
              <br />
              Start block: {item.startBlock}
              <br />
              ENS: {(item.ens && item.ens.toLowerCase() + '.') || ''}dfohub.eth
              <br />
              Token: {item.symbol}
              <br />
              Address: {item.walletAddress?.substring(0, 9) + '...'}
              <Link to={`/organizations/${item.walletAddress}`}>View</Link>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

List.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default List
