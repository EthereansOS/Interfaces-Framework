import React, {
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import T from 'prop-types'

const PluginsContext = React.createContext('dfo-plugins')

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return {
        plugins: [],
        placeholders: {},
        singlePlaceholder: {},
      }
    case 'resetPlaceholders':
      return {
        ...state,
        placeholders: {},
        singlePlaceholder: {},
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
              ...action.payload.element,
            },
          ].sort((a, b) => (a.index > b.index ? 1 : -1)),
        },
      }
    case 'setSinglePlaceholder':
      return {
        ...state,
        singlePlaceholder: {
          ...state.singlePlaceholder,
          [action.payload.name]: action.payload.element,
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

  useEffect(() => {
    dispatch({ type: 'reset' })
    plugins.forEach((plugin, index) => {
      dispatch({ type: 'addPlugin', payload: { index, plugin } })
    })
  }, [plugins])

  const addElement = useCallback((placeholder, element) => {
    dispatch({
      type: 'addPlaceholder',
      payload: { name: placeholder, element },
    })
  }, [])

  useEffect(() => {
    state.plugins &&
      state.plugins.forEach((plugin, index) => {
        plugin.init({ addElement })
      })
  }, [state.plugins, addElement])

  const setSingleElement = useCallback((placeholder, element) => {
    dispatch({
      type: 'setSinglePlaceholder',
      payload: { name: placeholder, element },
    })
  }, [])

  const getPlaceholders = (placeholderName) => {
    return state.placeholders[placeholderName] || []
  }

  const getSinglePlaceholder = (placeholderName) => {
    return state.singlePlaceholder[placeholderName]
  }

  const values = {
    addElement,
    getPlaceholders,
    setSingleElement,
    getSinglePlaceholder,
  }

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
  return useMemo(
    () => pluginsContext.getPlaceholders(placeholderName),
    [pluginsContext, placeholderName]
  )
}

export const useSinglePlaceholder = (placeholderName) => {
  const pluginsContext = useContext(PluginsContext)
  return pluginsContext.getSinglePlaceholder(placeholderName)
}

PluginsContextProvider.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  plugins: T.array,
}
