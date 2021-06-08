import { useEffect, useState } from 'react'
import { useWeb3 } from '@dfohub/core'
import { WEB3_CONNECTED } from '@dfohub/core'

import { useOrganizationContext } from '../OrganizationContext'

const MAX_CONCURRENT_UPDATE = 10

const useOrganizations = () => {
  const {
    list,
    updateInfo,
    updateDetails,
    initDFO,
    loadList,
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
    if (!isDFOInit) {
      return
    }
    loadList()
  }, [isDFOInit, loadList])

  useEffect(() => {
    if (!list || !isDFOInit) return

    const updating = Object.values(list).filter(
      (element) => element.updating
    ).length

    const toUpdate = Object.values(list)
      .filter((element) => !element.hasDetails && !element.updating)
      .slice(0, MAX_CONCURRENT_UPDATE - updating)

    // TODO uncomment this to limit the number of the detail requests
    if (Object.values(list).filter((element) => element.hasDetails).length > 5)
      return

    if (toUpdate.length > MAX_CONCURRENT_UPDATE) {
      return
    }
    updateDetails(toUpdate)
  }, [isDFOInit, list])

  return {
    organizations: list || [],
    unsetOrganization: () => unsetOrganization(),
  }
}

export default useOrganizations
