import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import T from 'prop-types'
import { useWeb3 } from '@dfohub/core'

import OrganizationHeader from './components/OrganizationHeader'

const OrganizationContext = React.createContext('dfo-organization')

export const OrganizationContextProvider = ({ children }) => {
  const { list, loadOrganizationDetail } = useWeb3()

  const [isEditMode, setIsEditMode] = useState(false)
  const [organizationHeader, setOrganizationHeader] = useState(null)
  const [organizationAddress, setOrganizationAddress] = useState(null)
  const [organizationNotFound, setNotFound] = useState(false)

  const setEditMode = useCallback(() => setIsEditMode(true), [setIsEditMode])
  const setViewMode = useCallback(() => setIsEditMode(false), [setIsEditMode])

  const organization = useMemo(
    () =>
      Object.values(list || {}).find(
        (organization) => organization.walletAddress === organizationAddress
      ),
    [list, organizationAddress]
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
  }, [organizationAddress, list, loadOrganizationDetail, organization])

  const unsetOrganization = () => {
    setOrganizationAddress()
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
