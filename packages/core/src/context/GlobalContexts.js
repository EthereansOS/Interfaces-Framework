import React from 'react'
import T from 'prop-types'

import { usePlaceholder } from '../hooks/usePlugins'

const GlobalContextsRenderer = ({ contexts, children }) => {
  if (!contexts.length) {
    return children
  }

  const Component = contexts[0].Component

  return (
    <Component>
      <GlobalContextsRenderer contexts={contexts.slice(1)}>
        {children}
      </GlobalContextsRenderer>
    </Component>
  )
}

GlobalContextsRenderer.propTypes = {
  contexts: T.arrayOf(
    T.shape({
      Component: T.oneOfType([T.string, T.func]),
    })
  ).isRequired,
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}

export const GlobalContextsProvider = ({ children }) => {
  const globalContexts = usePlaceholder('globalContexts')

  return (
    <GlobalContextsRenderer contexts={globalContexts}>
      {children}
    </GlobalContextsRenderer>
  )
}

GlobalContextsProvider.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}
