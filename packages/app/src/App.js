import './App.css'

import AppRouter from './router'
import { HashRouter } from 'react-router-dom'
import React from 'react'
import { ModuleContextProvider } from '@dfohub/core'

import moduleOne from './modules/module-one'

function App() {
  return (
    <div className="App">
      <ModuleContextProvider plugins={[moduleOne]}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </ModuleContextProvider>
    </div>
  )
}

export default App
