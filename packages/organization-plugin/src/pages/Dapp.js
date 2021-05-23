import React, { useEffect, useMemo } from 'react'
import { usePlaceholder } from '@dfohub/core'

import MainTemplate from '../components/MainTemplate'
import Menu from '../components/Menu'

const Dapp = ({ setTemplateState, ...props }) => {
  const organizationOverview = usePlaceholder('organizationDapp')
  useEffect(() => {
    setTemplateState((s) => ({ ...s, headerTitle: 'Organization Dapp' }))
  }, [setTemplateState])

  const renderedMenu = useMemo(
    () => <Menu selected={props?.selected} />,
    [props?.selected]
  )

  const organization = {}

  return (
    <MainTemplate {...props} Menu={renderedMenu}>
      {organizationOverview.map(({ Component, key }) => (
        <Component key={key} organization={organization} />
      ))}
    </MainTemplate>
  )
}

export default Dapp
