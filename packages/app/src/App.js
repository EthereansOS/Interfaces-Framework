import { HashRouter } from 'react-router-dom'
import React from 'react'
import '@dfohub/design-system/dist/index.cjs.css'
import { ModuleContextProvider, Web3ContextProvider } from '@dfohub/core'
import context from './data/context.json'
import moduleOne from './modules/module-one'
import AppRouter from './router'

function App() {
  return (
    <Web3ContextProvider context={context}>
      <ModuleContextProvider plugins={[moduleOne]}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </ModuleContextProvider>
    </Web3ContextProvider>
  )
}

export default App
