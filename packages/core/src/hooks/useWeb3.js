import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'

import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'

import { useInit } from './useInit'

const Web3Context = React.createContext('web3')

export const Web3ContextProvider = ({ children }) => {
  const [state, setState] = useState({ connectionStatus: NOT_CONNECTED })
  const [methods, setMethods] = useState({})
  const { context } = useInit()

  useEffect(() => {
    const { onEthereumUpdate, connect, getInfo, formatLink, loadList } =
      initWeb3(context, setState)
    setMethods((s) => ({
      ...s,
      onEthereumUpdate,
      connect,
      getInfo,
      formatLink,
      loadList,
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

    const newElement = await methods.getInfo(element)

    setState((s) => ({
      ...s,
      list: {
        ...s.list,
        [newElement.key]: { ...newElement, updating: false, updated: true },
      },
    }))
  }

  const values = {
    onEthereumUpdate: methods.onEthereumUpdate,
    connect: methods.connect,
    formatLink: methods.formatLink,
    loadList: methods.loadList,
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
