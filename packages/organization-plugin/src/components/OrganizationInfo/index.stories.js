import React from 'react'

import OrganizationInfo from '.'

const item = {
  title: 'Example/OrganizationInfo',
  component: OrganizationInfo,
}

export const SampleOrganizationInfo = () => (
  <OrganizationInfo
    organization={{
      metadataLink:
        'http://gateway.ipfs.io/ipfs/Qmcu59PwH9yEpGUKCMDxR3bm35kQPQfggfvKRJxPRwFGJG',
    }}
  />
)

export default item
