import { useEffect } from 'react'
import { useWeb3 } from '@dfohub/core'
import { WEB3_CONNECTED } from '@dfohub/core'

import { useOrganizationContext } from '../OrganizationContext'

const useOrganizations = () => {
  const {
    list,
    initDFO,
    loadOrganizationList,
    listLoaded,
    connectionStatus,
    isDFOInit,
  } = useWeb3()

  const { unsetOrganization } = useOrganizationContext()

  useEffect(() => {
    if (connectionStatus === WEB3_CONNECTED) {
      console.log('CONNECTED')
      initDFO()
    }
  }, [connectionStatus])

  useEffect(() => {
    if (!listLoaded && isDFOInit) {
      loadOrganizationList()
    }
  }, [isDFOInit])

  return {
    organizations: list || [],
    unsetOrganization,
  }
}

export default useOrganizations
