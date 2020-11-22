import React from 'react'

import { renderHook, act } from '@testing-library/react-hooks'
import { useModules, ModuleContextProvider } from './useModules'

const TestPage = () => <div>page1</div>
const TestPage2 = () => <div>page2</div>

const moduleOne = {
  name: 'module-1',
  init: ({ addElement }) => {
    addElement(
      'router',
      {
        path: '/',
        Component: TestPage,
        exact: true,
      },
      10
    )

    addElement(
      'router',
      {
        path: '/about',
        Component: TestPage2,
        exact: true,
      },
      20
    )
  },
}

describe('hooks/useModules', () => {
  it('Init the hook', () => {
    const wrapper = ({ children }) => (
      <ModuleContextProvider plugins={[moduleOne]}>
        {children}
      </ModuleContextProvider>
    )

    const { result } = renderHook(() => useModules(), { wrapper })

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
