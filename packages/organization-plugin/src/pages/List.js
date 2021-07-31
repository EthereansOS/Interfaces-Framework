import React, { useEffect, useMemo, useState } from 'react'
import T from 'prop-types'
import { Table, Typography } from '@ethereansos/interfaces-ui'
import { formatLink, useEthosContext } from '@ethereansos/interfaces-core'

import ListControls from '../components/ListControls'
import { useOrganizationContext } from '../OrganizationContext'
import useLocalStorage from '../hooks/useLocalStorage'
import usePrevious from '../hooks/usePrevious'
import {
  sortByMarketCap,
  sortByMetadata,
  sortFromFirst,
  sortFromLast,
} from '../utils/listFilters'
import Link from '../components/shared/Link'

const List = ({ setTemplateState }) => {
  const [organizationsLength, setOrganizationLength] = useState(0)
  const context = useEthosContext()
  const previousOrganizationsLength = usePrevious(organizationsLength)
  const { organizations, unsetOrganization, loadOrganizationListDetails } =
    useOrganizationContext()

  const [filters, setFilters] = useLocalStorage('dfoListFilters', {
    sortBy: 'circSupply',
  })

  useEffect(() => {
    if (
      organizations &&
      previousOrganizationsLength !== Object.keys(organizations).length
    ) {
      setOrganizationLength(Object.keys(organizations).length)
      loadOrganizationListDetails()
    }
  }, [loadOrganizationListDetails, organizations, previousOrganizationsLength])

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

  const columns = useMemo(
    () => [
      {
        field: 'icon',
        headerName: 'Name',
        renderCell: (props) => {
          /* eslint-disable  react/prop-types */
          return (
            <Link
              style={{ display: 'flex', alignItems: 'center' }}
              to={`organizations/${props.row.address}`}>
              <img
                style={{ width: 35, marginRight: 25 }}
                src={
                  props.row.metadata?.brandUri
                    ? formatLink({ context }, props.row.metadata?.brandUri)
                    : props.value
                }
                alt="logo"
              />
              <Typography variant="subtitle1" weight="bold">
                {props.row.name}
              </Typography>
            </Link>
          )
        },
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
    ],
    [context]
  )

  const list = useMemo(() => {
    const orgsArray = Object.keys(organizations).map((key) => {
      return {
        ...organizations[key],
        ens: organizations[key].ensComplete,
        address: organizations[key].dFO.options.address,
        id: organizations[key].startBlock,
      }
    })

    let orgs = orgsArray

    if (filters.metadataFirst) {
      orgs = sortByMetadata(orgs)
    }

    switch (filters.sortBy) {
      case 'circSupply':
        orgs = sortByMarketCap(orgs, 'unlockedMarketCapDollar')
        break
      case 'lockSupply':
        orgs = sortByMarketCap(orgs, 'lockedMarketCapDollar')
        break
      case 'markCap':
        orgs = sortByMarketCap(orgs, 'totalMarketCapDollar')
        break
      case 'newest':
        orgs = sortFromLast(orgs)
        break
      case 'oldest':
        orgs = sortFromFirst(orgs)
        break
      default:
    }

    return orgs
  }, [filters.metadataFirst, filters.sortBy, organizations])

  return (
    <>
      <ListControls filters={filters} setFilters={setFilters} />
      <Table columns={columns} rows={list} />
    </>
  )
}

List.propTypes = {
  setTemplateState: T.func.isRequired,
}

export default List
