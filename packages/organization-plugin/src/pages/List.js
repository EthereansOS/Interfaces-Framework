import React, { useEffect } from 'react'
import T from 'prop-types'
import { useWeb3 } from '@dfohub/core'
import { Table, Typography, Link } from '@dfohub/design-system'

import TableLink from '../components/shared/TableLink'
import useOrganizations from '../hooks/useOrganizations'

const columns = [
  {
    field: 'icon',
    headerName: 'Name',
    renderCell: (props) => (
      <Link
        style={{ display: 'flex', alignItems: 'center' }}
        to={`organizations/${props.row.address}`}>
        <img
          style={{ width: 35, marginRight: 25 }}
          src={props.value}
          alt="logo"
        />
        <Typography variant="subtitle1" weight="bold">
          {props.row.name}
        </Typography>
      </Link>
    ),
    flex: 2,
  },
  { field: 'functionalitiesAmount', headerName: 'Functions' },
  { field: 'startBlock', headerName: 'Start Block' },
  {
    field: 'ens',
    headerName: 'ENS',
    renderCell: TableLink,
  },
  { field: 'symbol', headerName: 'Token', renderCell: TableLink },
  { field: 'address', headerName: 'Address', renderCell: TableLink },
]

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
    <Table
      columns={columns}
      rows={Object.keys(organizations).map((key) => ({
        ...organizations[key],
        ens: organizations[key].ensComplete,
        address: organizations[key].dFO.options.address,
        id: organizations[key].startBlock,
      }))}
    />
  )
}

List.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default List
