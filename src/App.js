import './App.css'

import AppRouter from './router'
import {HashRouter} from "react-router-dom"
import React from "react"

function App() {
  return (
    <div className="App">
      <HashRouter>

        <AppRouter/>

      </HashRouter>
    </div>
  )
}

export default App
