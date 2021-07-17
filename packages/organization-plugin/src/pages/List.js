import React, { useEffect, useMemo, useState } from 'react'
import T from 'prop-types'
import { Table, Typography, Link } from '@dfohub/design-system'

import ListControls from '../components/ListControls'
import { useOrganizationContext } from '../OrganizationContext'
import useLocalStorage from '../hooks/useLocalStorage'
import usePrevious from '../hooks/usePrevious'

const columns = [
  {
    field: 'icon',
    headerName: 'Name',
    renderCell: (props) => {
      return (
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
]

export const sortByMarketCap = (list, field) => {
  const sortFunction = (first, second) => {
    const a = first[field]
    const b = second ? second[field] : 0
    return a < b ? 1 : a > b ? -1 : 0
  }
  // mutates the array
  return list.sort(sortFunction)
}

export const sortFromFirst = (list) => {
  return list.sort((first, second) => {
    const a = parseInt(first.key.substring(0, first.key.indexOf('_')))
    const b = second
      ? parseInt(second.key.substring(0, second.key.indexOf('_')))
      : 0
    return a < b ? -1 : a > b ? 1 : 0
  })
}

export const sortFromLast = (list) => {
  const sortedList = list.sort((first, second) => {
    const a = parseInt(first.key.substring(0, first.key.indexOf('_')))
    const b = second
      ? parseInt(second.key.substring(0, second.key.indexOf('_')))
      : 0
    return a < b ? 1 : a > b ? -1 : 0
  })
  const index = sortedList.findIndex((element) => element.key === 'DFO')
  const dfoHub = sortedList.splice(index, 1)
  sortedList.push(dfoHub[0])
  return sortedList
}

export const sortByMetadata = (list) => {
  // TODO use "sort" here too

  const orgsWithMetadata = list.filter((org) => org.dFO.metadataLink)
  const orgsWithoutMetadata = list.filter((org) => !org.dFO.metadataLink)

  return [...orgsWithMetadata, ...orgsWithoutMetadata]
}

const List = ({ setTemplateState }) => {
  const [organizationsLength, setOrganizationLength] = useState(0)

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
  }, [loadOrganizationListDetails, organizations])

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

  const list = useMemo(() => {
    const orgsArray = Object.keys(organizations)
      .slice(0, 10)
      .map((key) => {
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
