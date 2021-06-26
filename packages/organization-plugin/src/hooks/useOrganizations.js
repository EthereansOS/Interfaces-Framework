import { useCallback, useEffect, useState } from 'react'
import { WEB3_CONNECTED, useInit, useWeb3 } from '@dfohub/core'
import pLimit from 'p-limit'

import loadDFOList from '../lib/loadDFOList'
import initDFO from '../lib/initDFO'
import loadDFO from '../lib/loadDFO'
import getInfo from '../lib/getInfo'
import loadOrganizationListInfo from '../lib/loadOrganizationListInfo'

const limit = pLimit(20)

const useOrganizations = () => {
  const { context } = useInit()

  const { connectionStatus, networkId, web3, web3ForLogs, proxyChangedTopic } =
    useWeb3()

  const [state, setState] = useState({
    listLoaded: false,
  })

  useEffect(() => {
    const run = async () => {
      console.log('CONNECTED')
      const result = await initDFO({
        context,
        networkId,
        web3,
        web3ForLogs,
        proxyChangedTopic,
      })
      setState((s) => ({ ...s, ...result, isDFOInit: true }))
    }
    if (connectionStatus === WEB3_CONNECTED) {
      run()
    }
  }, [
    connectionStatus,
    context,
    networkId,
    web3,
    web3ForLogs,
    proxyChangedTopic,
  ])

  // To build the list we need details that can't be fetched altogether
  // so here we extract further details for each list items
  // be careful adding stuff here
  const loadOrganizationListDetails = useCallback(
    async (organizations) => {
      if (!organizations.length) return

      const fetchDetails = async (organization) => {
        let updatedOrganization = organization
        if (organization.key !== 'DFO') {
          const result = await loadDFO(
            { web3, web3ForLogs, context, networkId },
            organization.dFO.options.data[0]
          )

          updatedOrganization = {
            dFO: result,
          }
        }

        updatedOrganization = await loadOrganizationListInfo(
          {
            web3,
            dfoHub: state.dfoHub,
            dfoHubENSResolver: state.dfoHubENSResolver,
            context,
          },
          updatedOrganization
        )

        setState((s) => ({
          ...s,
          list: {
            ...s.list,
            [organization.key]: {
              ...organization,
              ...updatedOrganization,
              updating: false,
              listDetailsLoaded: true,
            },
          },
        }))
      }

      setState((s) => ({
        ...s,
        list: {
          ...s.list,
          ...organizations.reduce((acc, nextOrganization) => {
            acc[nextOrganization.key] = {
              ...s.list[nextOrganization.key],
              updating: true,
            }

            return acc
          }, {}),
        },
      }))

      return Promise.all(
        organizations.map((organization) =>
          limit(() => fetchDetails(organization))
        )
      )
    },
    [
      context,
      state.dfoHub,
      state.dfoHubENSResolver,
      networkId,
      web3,
      web3ForLogs,
    ]
  )

  const loadOrganizationList = useCallback(async () => {
    console.log('loadOrganizationList')
    const list = await loadDFOList({
      dfoHub: state.dfoHub,
      web3,
      web3ForLogs,
      context,
      networkId,
      dfoEvent: state.dfoEvent,
    })

    console.log(list)
    const newItems = {
      DFO: {
        ...state.dfoHub,
        updating: false,
        detailsLoaded: false,
        listDetailsLoaded: false,
      },
    }

    for (const log of list) {
      const key = log.blockNumber + '_' + log.id

      newItems[key] = {
        key,
        dFO: { options: log },
        updating: false,
        listDetailsLoaded: false,
        detailsLoaded: false,
        startBlock: log.blockNumber,
      }
    }

    setState((s) => ({
      ...s,
      listLoaded: true,
      list: {
        ...s.list,
        ...newItems,
      },
    }))

    return loadOrganizationListDetails(
      Object.values(newItems)
        .filter((element) => !element.listDetailsLoaded && !element.updating)
        // Uncomment this to load the details from the full list
        .slice(0, 20)
    )
  }, [
    state.dfoHub,
    web3,
    web3ForLogs,
    networkId,
    state.dfoEvent,
    loadOrganizationListDetails,
    context,
  ])

  const loadOrganizationDetail = useCallback(
    async (organization) => {
      if (!organization || organization.updating) {
        return
      }

      setState((s) => ({
        ...s,
        list: {
          ...s.list,
          [organization.key]: { ...organization, updating: true },
        },
      }))

      const updatedOrganization = await getInfo(
        {
          web3,
          context,
          dfoHub: state.dfoHub,
          dfoHubENSResolver: state.dfoHubENSResolver,
        },
        organization
      )

      setState((s) => ({
        ...s,
        list: {
          ...s.list,
          [updatedOrganization.key]: {
            ...updatedOrganization,
            updating: false,
            detailsLoaded: true,
          },
        },
      }))
    },
    [state.dfoHub, web3, state.dfoEvent, context, state.dfoHubENSResolver]
  )

  useEffect(() => {
    if (!state.listLoaded && state.isDFOInit) {
      loadOrganizationList()
    }
  }, [state.isDFOInit, loadOrganizationList, state.listLoaded])

  return {
    organizations: state.list || [],
    loadOrganizationDetail,
  }
}

export default useOrganizations
