import React, { useContext, useReducer, useEffect } from 'react'

const PluginsContext = React.createContext('dfo-plugins')

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return {
        plugins: [],
        placeholders: {},
      }
    case 'resetPlaceholders':
      return {
        ...state,
        placeholders: {},
      }
    case 'addPlugin':
      return {
        ...state,
        plugins: [
          ...state.plugins,
          {
            name: action.payload.plugin.name,
            index: action.payload.index,
            ...action.payload.plugin,
          },
        ].sort((a, b) => (a.index > b.index ? 1 : -1)),
      }
    case 'addPlaceholder':
      return {
        ...state,
        placeholders: {
          ...state.placeholders,
          [action.payload.name]: [
            ...(state.placeholders[action.payload.name] || []),
            {
              index: action.payload.index,
              ...action.payload.element,
            },
          ].sort((a, b) => (a.index > b.index ? 1 : -1)),
        },
      }
    default:
      throw new Error()
  }
}

export const PluginsContextProvider = ({ children, plugins }) => {
  const [state, dispatch] = useReducer(reducer, {
    plugins: [],
    placeholders: {},
  })

  const addElement = (placeholder, element, index) => {
    dispatch({
      type: 'addPlaceholder',
      payload: { name: placeholder, index, element },
    })
  }

  useEffect(() => {
    dispatch({ type: 'reset' })
    plugins.forEach((plugin, index) => {
      dispatch({ type: 'addPlugin', payload: { index, plugin } })
    })
  }, [plugins])

  useEffect(() => {
    state.plugins &&
      state.plugins.forEach((plugin, index) => {
        plugin.init({ addElement })
      })
  }, [state.plugins])

  const getPlaceholders = (placeholderName) => {
    return state.placeholders[placeholderName] || []
  }

  const values = { addElement, getPlaceholders }

  return (
    <PluginsContext.Provider value={values}>{children}</PluginsContext.Provider>
  )
}

export const usePlugins = () => {
  const pluginsContext = useContext(PluginsContext)
  return pluginsContext
}

export const usePlaceholder = (placeholderName) => {
  const pluginsContext = useContext(PluginsContext)
  return pluginsContext.getPlaceholders(placeholderName)
}
