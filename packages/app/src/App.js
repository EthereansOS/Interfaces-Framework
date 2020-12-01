import { HashRouter } from 'react-router-dom'
import React from 'react'
import '@dfohub/design-system/dist/index.cjs.css'
import '@dfohub/components/dist/index.cjs.css'
import { PluginsContextProvider, Web3ContextProvider } from '@dfohub/core'
import samplePlugin from '@dfohub/sample-plugin'
import context from './data/context.json'
import AppRouter from './router'
import './app.css'

function App() {
  return (
    <Web3ContextProvider context={context}>
      <PluginsContextProvider plugins={[samplePlugin]}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </PluginsContextProvider>
    </Web3ContextProvider>
  )
}

export default App
