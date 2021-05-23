import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import T from 'prop-types'

import OrganizationHeader from './components/OrganizationHeader'

const OrganizationContext = React.createContext('dfo-organization')

export const OrganizationContextProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [organizationHeader, setOrganizationHeader] = useState(null)

  const organization = useMemo(
    () => ({
      name: 'My org',
      logo: 'https://gateway.ipfs.io/ipfs/QmVQDWku1ZkCNKDzcs1DbnDBxbC7ETdaj4515GUsmjZY8q',
    }),
    []
  )

  const setEditMode = useCallback(() => setIsEditMode(true), [setIsEditMode])
  const setViewMode = useCallback(() => setIsEditMode(false), [setIsEditMode])

  useEffect(() => {
    setOrganizationHeader(<OrganizationHeader organization={organization} />)
  }, [organization])

  const contextValue = {
    isEditMode,
    setEditMode,
    setViewMode,
    organizationHeader,
    organization,
  }

  return (
    <OrganizationContext.Provider value={contextValue}>
      {children}
    </OrganizationContext.Provider>
  )
}

OrganizationContextProvider.propTypes = {
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
}

export const useOrganizationContext = () => {
  const context = useContext(OrganizationContext)
  if (context === null) {
    console.warn(
      'The OrganizationContext should be used inside a OrganizationContextProvider'
    )
  }
  return context
}
