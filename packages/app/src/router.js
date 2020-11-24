import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom"

import {usePlaceholder} from './hooks/useModules'

const NoMatch = () => <div>No Match</div>

const AppRouter = () => {
  const routes = usePlaceholder('router')

  return <Switch>
    {routes
      .map(({path, exact, Component}) => {
          return <Route key={path} path={path} exact={exact}><Component/></Route>
        }
      )
    }
    <Route>
      <NoMatch/>
    </Route>
  </Switch>
}

export default AppRouter
