import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'
import { create as createIpfsHttpClient } from 'ipfs-http-client'

import ethosEvents from '../lib/ethosEvents'
import initWeb3, { NOT_CONNECTED, CONNECTED, CONNECTING } from '../lib/web3'
import { usePlaceholder } from '../hooks/usePlugins'
import useEthosContext from '../hooks/useEthosContext'

const Web3Context = React.createContext('web3')

const WEB3_CONTEXT_STATUS_NEW = 'WEB3_CONTEXT_STATUS_NEW'
const WEB3_CONTEXT_STATUS_ON_INIT = 'WEB3_CONTEXT_STATUS_ON_INIT'
const WEB3_CONTEXT_STATUS_INIT = 'WEB3_CONTEXT_STATUS_INIT'

export const Web3ContextProvider = ({ children }) => {
  const [initStatus, setInitStatus] = useState(WEB3_CONTEXT_STATUS_NEW)
  const [state, setState] = useState({
    connectionStatus: NOT_CONNECTED,
  })
  const [methods, setMethods] = useState({})
  const context = useEthosContext()

  const afterInitFunctionList = usePlaceholder('web3/afterInit')

  useEffect(() => {
    setState((s) => ({
      ...s,
      ipfsHttpClient: createIpfsHttpClient(context.ipfsHost),
    }))
  }, [context])

  useEffect(() => {
    setMethods((s) => ({
      ...s,
      connect: async () => {
        await s.connectFn(afterInitFunctionList.map((item) => item.fn))
      },
    }))
  }, [afterInitFunctionList])

  useEffect(() => {
    async function run() {
      if (initStatus !== WEB3_CONTEXT_STATUS_NEW) {
        return
      }

      setInitStatus(WEB3_CONTEXT_STATUS_ON_INIT)
      const { onEthereumUpdate, connect } = initWeb3(context, setState)

      setMethods((s) => ({
        ...s,
        onEthereumUpdate,
        connectFn: connect,
      }))

      setInitStatus(WEB3_CONTEXT_STATUS_INIT)
    }

    run()
  }, [context, initStatus])

  const values = {
    ...methods,
    ...state,
    ethosEvents,
    context,
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
