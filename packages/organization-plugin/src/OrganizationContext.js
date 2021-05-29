import React, { useContext, useState, useCallback, useEffect } from 'react'
import T from 'prop-types'
import { useWeb3 } from '@dfohub/core'

import OrganizationHeader from './components/OrganizationHeader'

const OrganizationContext = React.createContext('dfo-organization')

export const OrganizationContextProvider = ({ children }) => {
  const { list } = useWeb3()

  const [isEditMode, setIsEditMode] = useState(false)
  const [organizationHeader, setOrganizationHeader] = useState(null)
  const [organizationAddress, setOrganizationAddress] = useState(null)
  const [organizationNotFound, setNotFound] = useState(false)
  const [organization, setOrganization] = useState()

  const setEditMode = useCallback(() => setIsEditMode(true), [setIsEditMode])
  const setViewMode = useCallback(() => setIsEditMode(false), [setIsEditMode])

  useEffect(() => {
    if (!organization) {
      return false
    }
    setOrganizationHeader(<OrganizationHeader organization={organization} />)
  }, [organization])

  useEffect(() => {
    if (!organizationAddress) {
      return
    }
    const organization = Object.values(list || {}).find(
      (organization) => organization.walletAddress === organizationAddress
    )
    if (!organization) {
      setNotFound(true)
    }
    setOrganization(organization)
  }, [organizationAddress, list])

  const unsetOrganization = () => {
    setOrganizationAddress()
    setOrganization()
    setNotFound(false)
  }

  const contextValue = {
    isEditMode,
    setEditMode,
    setViewMode,
    organizationHeader,
    organization,
    setOrganizationAddress,
    unsetOrganization,
    organizationNotFound,
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
