import React, { useContext, useState, useEffect, useCallback } from 'react'
import T from 'prop-types'
import pLimit from 'p-limit'

import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import { useInit } from '../hooks/useInit'
import loadDFO from '../lib/web3/loadDFO'
import loadDFOList from '../lib/web3/loadDFOList'
import getInfoFn from '../lib/web3/getInfo'
import loadContentFn from '../lib/web3/loadContent'
import loadOrganizationListInfo from '../lib/web3/loadOrganizationListInfo'

const Web3Context = React.createContext('web3')

const limit = pLimit(20)

export const Web3ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    connectionStatus: NOT_CONNECTED,
    listLoaded: false,
  })
  const [methods, setMethods] = useState({})
  const { context } = useInit()
  const { dfoHub, web3, web3ForLogs, networkId, dfoEvent, dfoHubENSResolver } =
    state

  const getState = useCallback(() => state, [state])

  useEffect(() => {
    const {
      onEthereumUpdate,
      connect,
      getInfo,
      formatLink,
      getLogs,
      loadDFO,
      getNetworkElement,
      refreshBalances,
      initDFO,
    } = initWeb3(context, setState, getState)

    setMethods((s) => ({
      ...s,
      onEthereumUpdate,
      connect,
      getInfo,
      formatLink,
      getLogs,
      loadDFO,
      initDFO: async () => {
        const result = await initDFO()
        setState((s) => ({ ...s, ...result, isDFOInit: true }))
      },
      getNetworkElement,
      refreshBalances,
    }))
  }, [context])

  const loadOrganizationDetail = async (organization) => {
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

    const updatedOrganization = await getInfoFn(
      { web3, context, dfoHub, dfoHubENSResolver },
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
  }

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
          { web3, dfoHub, dfoHubENSResolver, context },
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
    [context, dfoHub, dfoHubENSResolver, networkId, web3, web3ForLogs]
  )

  const loadOrganizationList = useCallback(async () => {
    const list = await loadDFOList({
      dfoHub,
      web3,
      web3ForLogs,
      context,
      networkId,
      dfoEvent,
    })

    const newItems = {
      DFO: {
        ...dfoHub,
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
    dfoHub,
    web3,
    web3ForLogs,
    networkId,
    dfoEvent,
    loadOrganizationListDetails,
    context,
  ])

  const loadContent = (tokenId, address, raw) =>
    loadContentFn({ web3, context, networkId }, tokenId, address, raw)

  const values = {
    ...methods,
    ...state,
    loadOrganizationList,
    loadOrganizationDetail,
    loadContent,
  }

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>
}

Web3ContextProvider.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}

export const webs3States = { NOT_CONNECTED, CONNECTED, CONNECTING }

export const useWeb3 = () => {
  const web3Context = useContext(Web3Context)
  return web3Context
}
