import { useCallback, useEffect, useState } from 'react'
import {
  WEB3_CONNECTED,
  useEthosContext,
  useWeb3,
} from '@ethereansos/interfaces-core'
import PQueue from 'p-queue'

import loadDFOList from '../lib/loadDFOList'
import initDFO from '../lib/initDFO'
import loadDFO from '../lib/loadDFO'
import getInfo from '../lib/getInfo'
import loadOrganizationListInfo from '../lib/loadOrganizationListInfo'

const queue = new PQueue({ concurrency: 20 })

const useOrganizations = () => {
  const context = useEthosContext()

  const {
    connectionStatus,
    networkId,
    web3,
    web3ForLogs,
    proxyChangedTopic,
    wethAddress,
    uniswapV2Router,
    walletAddress,
  } = useWeb3()

  const [state, setState] = useState({
    listLoaded: false,
  })

  useEffect(() => {
    const run = async () => {
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
  const loadOrganizationSubListDetails = useCallback(
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

        if (organization.key === 'DFO') {
          // here we take the full info for the dfo org
          // since it contains info necessary for the refreshbalances function
          // of every other organization
          updatedOrganization = await getInfo(
            {
              web3,
              context,
              dfoHub: state.dfoHub,
              dfoHubENSResolver: state.dfoHubENSResolver,
              walletAddress,
              uniswapV2Router,
              wethAddress,
            },
            updatedOrganization
          )
          setState((s) => ({
            ...s,
            dfoHub: updatedOrganization,
          }))
        } else {
          updatedOrganization = await loadOrganizationListInfo(
            {
              web3,
              dfoHub: state.dfoHub,
              dfoHubENSResolver: state.dfoHubENSResolver,
              context,
              wethAddress,
              uniswapV2Router,
            },
            updatedOrganization
          )
        }

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

      organizations.forEach((organization) =>
        queue.add(() => fetchDetails(organization))
      )
    },
    [
      web3,
      web3ForLogs,
      context,
      networkId,
      state.dfoHub,
      state.dfoHubENSResolver,
      walletAddress,
      uniswapV2Router,
      wethAddress,
    ]
  )

  const loadOrganizationListDetails = useCallback(async () => {
    if (state.list)
      return loadOrganizationSubListDetails(
        Object.values(state.list)
          .filter((element) => !element.listDetailsLoaded && !element.updating)
          // Uncomment this to load the details from the full list
          .slice(0, 20)
      )
  }, [state.list, loadOrganizationSubListDetails])

  const loadOrganizationList = useCallback(async () => {
    const list = await loadDFOList({
      dfoHub: state.dfoHub,
      web3,
      web3ForLogs,
      context,
      networkId,
      dfoEvent: state.dfoEvent,
    })

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
  }, [state.dfoHub, web3, web3ForLogs, networkId, state.dfoEvent, context])

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
          walletAddress,
          uniswapV2Router,
          wethAddress,
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
    [
      state.dfoHub,
      state.dfoHubENSResolver,
      web3,
      context,
      walletAddress,
      uniswapV2Router,
      wethAddress,
    ]
  )

  useEffect(() => {
    if (!state.listLoaded && state.isDFOInit) {
      loadOrganizationList()
    }
  }, [state.isDFOInit, loadOrganizationList, state.listLoaded])

  return {
    organizations: state.list || [],
    loadOrganizationDetail,
    loadOrganizationListDetails,
    loadOrganizationSubListDetails,
    isDFOInit: state.isDFOInit,
    listLoaded: state.listLoaded,
    dfoHub: state.dfoHub,
  }
}

export default useOrganizations
