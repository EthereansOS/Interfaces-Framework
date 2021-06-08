import React, { useContext, useState, useEffect, useCallback } from 'react'
import T from 'prop-types'

import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../../lib/web3'
import { useInit } from '../useInit'
import getInfoFn from '../../lib/web3/getInfo'
import loadDFO from '../../lib/web3/loadDFO'
import loadDFOList from '../../lib/web3/loadDFOList'

const Web3Context = React.createContext('web3')

export const Web3ContextProvider = ({ children }) => {
  const [state, setState] = useState({ connectionStatus: NOT_CONNECTED })
  const [methods, setMethods] = useState({})
  const { context } = useInit()

  const getState = useCallback(() => state)

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

  const getInfo = async (element) => {
    if (!element || element.updating) {
      return
    }

    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        [element.key]: { ...element, updating: true },
      },
    }))

    const newElement = await getInfoFn(
      { ...getState(), context, getState },
      element
    )

    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        [newElement.key]: { ...newElement, updating: false, updated: true },
      },
    }))
  }

  const loadList = useCallback(async () => {
    const { dfoHub, web3, web3ForLogs, networkId, dfoEvent } = state

    const list =
      (await loadDFOList({
        dfoHub,
        web3,
        web3ForLogs,
        context,
        networkId,
        dfoEvent,
      })) || []

    let newItems = {
      DFO: { ...dfoHub, updating: false, updated: false, hasDetails: false },
    }

    for (const log of list) {
      const key = log.blockNumber + '_' + log.id

      newItems[key] = {
        key,
        dFO: { options: log },
        updating: false,
        updated: false,
        hasDetails: false,
        startBlock: log.blockNumber,
      }
    }

    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        ...newItems,
      },
    }))
  }, [
    state.dfoHub,
    state.web3,
    state.web3ForLogs,
    state.networkId,
    state.dfoEvent,
  ])

  const updateDetails = async (elements) => {
    const { web3, web3ForLogs, networkId } = getState()
    if (!elements.length) return

    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        ...elements.reduce((acc, next) => {
          acc[next.key] = { ...s.list[next.key], updating: true }

          return acc
        }, {}),
      },
    }))

    async function loadDetails(element) {
      let newElement = element
      if (element.key !== 'DFO') {
        const result = await loadDFO(
          { web3, web3ForLogs, context, networkId },
          element.dFO.options.data[0]
        )

        newElement = {
          dFO: result,
        }
      }

      newElement = await getInfoFn(
        { ...getState(), context, getState },
        newElement
      )

      setState((s) => ({
        ...s,
        list: {
          ...s.list,
          [element.key]: {
            ...element,
            ...newElement,
            updating: false,
            updated: false,
            hasDetails: true,
          },
        },
      }))
    }

    elements.forEach((element) => loadDetails(element))
  }

  const values = {
    ...methods,
    loadList,
    updateDetails,
    updateInfo: getInfo,
    ...state,
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
