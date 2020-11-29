import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { usePlaceholder } from '@dfohub/core'
import Connect from './components/Connect'

const NoMatch = () => <div>No Match</div>

const AppRouter = () => {
  const routes = usePlaceholder('router')

  return (
    <div style={{ width: '100%' }}>
      <Switch>
        {routes.map(({ path, exact, Component, requireConnection }) => {
          return (
            <Route key={path} path={path} exact={exact}>
              {requireConnection ? (
                <Connect>
                  <Component />
                </Connect>
              ) : (
                <Component />
              )}
            </Route>
          )
        })}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  )
}

export default AppRouter
