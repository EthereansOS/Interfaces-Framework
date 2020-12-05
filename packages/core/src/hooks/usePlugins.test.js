import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'

import { usePlugins, PluginsContextProvider } from './usePlugins'

const TestPage = () => <div>page1</div>
const TestPage2 = () => <div>page2</div>

const pluginOne = {
  name: 'plugin-1',
  init: ({ addElement }) => {
    addElement('router', {
      path: '/',
      Component: TestPage,
      exact: true,
      index: 10,
    })

    addElement('router', {
      path: '/about',
      Component: TestPage2,
      exact: true,
      index: 20,
    })
  },
}

describe('hooks/usePlugins', () => {
  it('Init the hook', () => {
    const wrapper = ({ children }) => (
      <PluginsContextProvider plugins={[pluginOne]}>
        {children}
      </PluginsContextProvider>
    )

    const { result } = renderHook(() => usePlugins(), { wrapper })

    let routes = []
    act(() => {
      routes = result.current.getPlaceholders('router')
    })

    expect(routes.length).toBe(2)
    expect(routes).toEqual([
      expect.objectContaining({
        exact: true,
        path: '/',
      }),
      expect.objectContaining({
        exact: true,
        path: '/about',
      }),
    ])
  })
})
