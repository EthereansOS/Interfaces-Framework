import { useEffect } from 'react'

import { useOrganizationContext } from '../OrganizationContext'

const useOrganization = (address) => {
  const {
    organizationHeader,
    organization,
    organizationNotFound,
    setOrganizationAddress,
  } = useOrganizationContext()

  useEffect(() => {
    if (address) {
      setOrganizationAddress(address)
    }
  }, [setOrganizationAddress, address])

  return {
    organizationHeader: organizationHeader,
    organization: organization,
    organizationNotFound: organizationNotFound,
    setOrganizationAddress: setOrganizationAddress,
  }
}

export default useOrganization
