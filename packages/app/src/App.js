import { HashRouter } from 'react-router-dom'
import React from 'react'
import '@ethereansos/interfaces-ui/dist/index.cjs.css'
import '@dfohub/organization-plugin/dist/index.cjs.css'

import {
  PluginsContextProvider,
  Web3ContextProvider,
  InitContextProvider,
  GlobalContextsProvider,
} from '@ethereansos/interfaces-core'
import organizationPlugin from '@dfohub/organization-plugin'
import appPlugin from './plugins'
import AppRouter from './router'
import './app.css'

// FIXME this should be imported in the app otherwise breaks the unit test of the modules
// ipfs.http.client.min is imported from HTML
// import './lib/ipfs.http.client.min'

function App() {
  return (
    <InitContextProvider
      initMethod={async ({ setReady, setValue }) => {
        // This line as only a demo purpose, to show the loading action
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await fetch(
          `${process.env.PUBLIC_URL}/data/context.json`
        )
        const context = await response.json()
        setValue('context', context)
        setReady()
      }}
      Loading={() => <div>Loading...</div>}
      Error={({ error }) => <div>Error on application init: {error}</div>}>
      <PluginsContextProvider plugins={[appPlugin, organizationPlugin]}>
        <Web3ContextProvider>
          <GlobalContextsProvider>
            <HashRouter>
              <AppRouter />
            </HashRouter>
          </GlobalContextsProvider>
        </Web3ContextProvider>
      </PluginsContextProvider>
    </InitContextProvider>
  )
}

export default App
