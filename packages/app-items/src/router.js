import React, { useMemo } from 'react'
import { Switch, Route } from 'react-router-dom'

import { usePlaceholder } from '@ethereansos/interfaces-core'
import Connect from './components/Connect'
import MainTemplate from './components/MainTemplate'

const NoMatch = () => <div>No Match</div>

const AppRouter = () => {
  const routes = usePlaceholder('router')

  const memoedRoutes = useMemo(() => {
    return routes.map(
      ({ path, exact, Component, requireConnection, templateProps }) => {
        return (
          <Route key={path} path={path} exact={exact}>
            {requireConnection ? (
              <Connect>
                <MainTemplate {...templateProps} Component={Component} />
              </Connect>
            ) : (
              <MainTemplate {...templateProps} Component={Component} />
            )}
          </Route>
        )
      }
    )
  }, [routes])

  return (
    <div style={{ width: '100%' }}>
      <Switch>
        {memoedRoutes}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  )
}

export default AppRouter
