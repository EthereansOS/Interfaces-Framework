import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'

import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../../lib/web3'
import { useInit } from '../useInit'
import loadDFOList from '../useWeb3/loadDFOList'
import getInfoFn from '../../lib/web3/getInfo'

const Web3Context = React.createContext('web3')

export const Web3ContextProvider = ({ children }) => {
  const [state, setState] = useState({ connectionStatus: NOT_CONNECTED })
  const [methods, setMethods] = useState({})
  const { context } = useInit()

  const getState = () => state
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
    } = initWeb3(context, setState, getState)
    setMethods((s) => ({
      ...s,
      onEthereumUpdate,
      connect,
      getInfo,
      formatLink,
      getLogs,
      loadDFO,
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

  const loadList = loadDFOList(methods, () => state, setState)

  const values = {
    onEthereumUpdate: methods.onEthereumUpdate,
    connect: methods.connect,
    formatLink: methods.formatLink,
    loadList,
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
