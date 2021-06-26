import React, { useEffect } from 'react'
import T from 'prop-types'
import { Table, Typography, Link } from '@dfohub/design-system'

import ListControls from '../components/ListControls'
import { useOrganizationContext } from '../OrganizationContext'

const columns = [
  {
    field: 'icon',
    headerName: 'Name',
    renderCell: (props) => (
      <Link
        style={{ display: 'flex', alignItems: 'center' }}
        to={`organizations/${props.row.walletAddress}`}>
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
    renderCell: ({ value }) => (
      <Link external href={`//${value}`}>
        {value}
      </Link>
    ),
  },
  { field: 'symbol', headerName: 'Token' },
  {
    field: 'address',
    headerName: 'Address',
    renderCell: ({ value }) => (
      <Link external href={`https://ropsten.etherscan.io/address/${value}`}>
        {value}
      </Link>
    ),
  },
]

const List = ({ setTemplateState }) => {
  const { organizations, unsetOrganization } = useOrganizationContext()

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
    <>
      <ListControls />
      <Table
        columns={columns}
        rows={Object.keys(organizations).map((key) => ({
          ...organizations[key],
          ens: organizations[key].ensComplete,
          address: organizations[key].dFO.options.address,
          id: organizations[key].startBlock,
        }))}
      />
    </>
  )
}

List.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default List
