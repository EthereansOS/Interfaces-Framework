import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import T from 'prop-types'
import { Modal } from '@dfohub/design-system'

import OrganizationHeader from './components/OrganizationHeader'
import useOrganizations from './hooks/useOrganizations'
import ProposalConfirm from './components/ProposalConfirm'

const OrganizationContext = React.createContext('dfo-organization')

export const OrganizationContextProvider = ({ children }) => {
  const {
    organizations,
    loadOrganizationDetail,
    loadOrganizationListDetails,
    loadOrganizationSubListDetails,
  } = useOrganizations()

  const [isEditMode, setIsEditMode] = useState(false)
  const [organizationHeader, setOrganizationHeader] = useState(null)
  const [organizationAddress, setOrganizationAddress] = useState(null)
  const [organizationNotFound, setNotFound] = useState(false)
  const [proposalData, setProposalData] = useState()

  const setEditMode = useCallback(() => setIsEditMode(true), [])
  const setViewMode = useCallback(() => setIsEditMode(false), [])
  const showProposalModal = useCallback((data) => {
    setProposalData(data)
  }, [])
  const closeProposalModal = useCallback(() => {
    setProposalData()
  }, [])

  console.log('PROPOSAL DATA', proposalData)

  const organization = useMemo(() => {
    const org = Object.values(organizations || {}).find(
      (organization) =>
        organization?.dFO?.options?.address === organizationAddress ||
        organization?.dFO?.options?.data?.includes(organizationAddress)
    )

    console.log('Org found', org)
    return org
  }, [organizations, organizationAddress])

  useEffect(() => {
    if (!organization) {
      return false
    }

    if (!organization.updating && !organization.listDetailsLoaded) {
      loadOrganizationSubListDetails([organization])
    }
    setOrganizationHeader(<OrganizationHeader organization={organization} />)
  }, [organization, loadOrganizationSubListDetails])

  useEffect(() => {
    if (!organizationAddress) {
      return
    }

    if (!organization) {
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
    loadOrganizationDetail,
    loadOrganizationListDetails,
    showProposalModal,
    closeProposalModal,
  }

  return (
    <OrganizationContext.Provider value={contextValue}>
      {children}
      <Modal visible={!!proposalData}>
        <ProposalConfirm onClose={closeProposalModal} {...proposalData} />
      </Modal>
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
