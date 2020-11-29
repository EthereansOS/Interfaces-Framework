import React, { useContext, useState, useEffect } from 'react'

import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'

const Web3Context = React.createContext('web3')

export const Web3ContextProvider = ({ children, context }) => {
  const [state, setState] = useState({ connectionStatus: NOT_CONNECTED })
  const [methods, setMethods] = useState({})

  useEffect(() => {
    const { onEthereumUpdate, connect } = initWeb3(context, setState)
    setMethods((s) => ({ ...s, onEthereumUpdate, connect }))
  }, [context])

  const values = {
    onEthereumUpdate: methods.onEthereumUpdate,
    connect: methods.connect,
    ...state,
  }

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>
}

export const webs3States = { NOT_CONNECTED, CONNECTED, CONNECTING }
export const useWeb3 = () => {
  const web3Context = useContext(Web3Context)
  return web3Context
}
