import React, { useContext, useState, useEffect } from 'react'
import T from 'prop-types'

const InitContext = React.createContext('dfo-init')

export const InitContextProvider = ({
  children,
  initMethod,
  Loading,
  Error,
}) => {
  const [state, setState] = useState({ isInit: false, error: null })

  const setValue = (name, value) => setState((s) => ({ ...s, [name]: value }))
  const setReady = () => setState((s) => ({ ...s, isInit: true }))
  const setError = (error) => setState((s) => ({ ...s, error }))

  useEffect(() => {
    async function run() {
      initMethod && (await initMethod({ setValue, setReady, setError }))
    }

    run()
  }, [initMethod])

  const values = state

  return (
    <InitContext.Provider value={values}>
      {!state.isInit && !state.error && <Loading />}
      {state.error && <Error error={state.error} />}
      {state.isInit && children}
    </InitContext.Provider>
  )
}

export const useInit = () => {
  const initContext = useContext(InitContext)
  return initContext
}

InitContextProvider.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  initMethod: T.func,
  Loading: T.elementType,
  Error: T.elementType,
}
