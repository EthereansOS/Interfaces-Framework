import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { useInit, InitContextProvider } from './useInit'

describe('hooks/useInit', () => {
  it('The compent is initialized properly', async () => {
    const wrapper = ({ children }) => (
      <InitContextProvider
        initMethod={async ({ setValue, setReady }) => {
          setValue('foo', 'bar')
          setReady()
        }}
        Loading={() => <div>Loading</div>}
        Error={({ error }) => <div>Error {error}</div>}>
        {children}
      </InitContextProvider>
    )

    const { result } = renderHook(() => useInit(), { wrapper })
    let state
    act(() => {
      state = result.current
    })

    expect(state).toEqual({ isInit: true, error: null, foo: 'bar' })
  })

  it('The compent is still not initialized', async () => {
    render(
      <InitContextProvider
        initMethod={async () => {}}
        Loading={() => <div>Loading</div>}
        Error={({ error }) => <div>Error {error}</div>}>
        <div>SUCCESS</div>
      </InitContextProvider>
    )

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument()
  })

  it('The component is initialized', async () => {
    render(
      <InitContextProvider
        initMethod={async ({ setValue, setReady }) => {
          setValue('foo', 'bar')
          setReady()
        }}
        Loading={() => <div>Loading</div>}
        Error={({ error }) => <div>Error {error}</div>}>
        <div>SUCCESS</div>
      </InitContextProvider>
    )

    expect(await screen.findByText(/Success/i)).toBeInTheDocument()
  })

  it('The component shows an error', async () => {
    render(
      <InitContextProvider
        initMethod={async ({ setError }) => {
          setError('Some error')
        }}
        Loading={() => <div>Loading</div>}
        Error={({ error }) => <div>Error {error}</div>}>
        <div>SUCCESS</div>
      </InitContextProvider>
    )

    expect(await screen.findByText(/Some error/i)).toBeInTheDocument()
  })
})
