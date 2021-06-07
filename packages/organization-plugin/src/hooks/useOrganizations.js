import { useEffect } from 'react'
import { useWeb3 } from '@dfohub/core'

import { useOrganizationContext } from '../OrganizationContext'

const useOrganizations = () => {
  const { list, updateInfo, loadList } = useWeb3()

  const { unsetOrganization } = useOrganizationContext()

  useEffect(() => {
    const run = async () => {
      if (list && Object.keys(list).length) {
        if (list.DFO.updating) {
          return
        }
        for (const key of Object.keys(list)) {
          const el = list[key]
          if (el.updating || el.updated) {
            continue
          }
          await updateInfo(el)
        }
      }
    }
    run()
  }, [list, updateInfo])

  useEffect(() => {
    loadList()
  }, [loadList])

  return {
    organizations: list,
    unsetOrganization: () => unsetOrganization(),
  }
}

export default useOrganizations
