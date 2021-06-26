import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import T from 'prop-types'

import OrganizationHeader from './components/OrganizationHeader'
import useOrganizations from './hooks/useOrganizations'

const OrganizationContext = React.createContext('dfo-organization')

export const OrganizationContextProvider = ({ children }) => {
  const { organizations, loadOrganizationDetail } = useOrganizations()

  const [isEditMode, setIsEditMode] = useState(false)
  const [organizationHeader, setOrganizationHeader] = useState(null)
  const [organizationAddress, setOrganizationAddress] = useState(null)
  const [organizationNotFound, setNotFound] = useState(false)

  const setEditMode = useCallback(() => setIsEditMode(true), [setIsEditMode])
  const setViewMode = useCallback(() => setIsEditMode(false), [setIsEditMode])

  const organization = useMemo(
    () =>
      Object.values(organizations || {}).find(
        (organization) => organization.walletAddress === organizationAddress
      ),
    [organizations, organizationAddress]
  )

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

    if (!organization) {
      setNotFound(true)
      return
    }

    const fetch = async () => {
      try {
        await loadOrganizationDetail(organization)
      } catch (e) {
        setNotFound(true)
      }
    }

    if (!organization.detailsLoaded && !organization.updating) {
      fetch()
    }
  }, [organizationAddress, organizations, loadOrganizationDetail, organization])

  const unsetOrganization = useCallback(() => {
    setOrganizationAddress()
    setNotFound(false)
  }, [setOrganizationAddress, setNotFound])

  const contextValue = {
    isEditMode,
    setEditMode,
    setViewMode,
    organizationHeader,
    organization,
    organizations,
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
