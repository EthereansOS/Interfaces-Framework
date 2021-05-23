import React, { useEffect, useMemo } from 'react'
import { usePlaceholder } from '@dfohub/core'

import MainTemplate from '../components/MainTemplate'
import Menu from '../components/Menu'

const DeFi = ({ setTemplateState, ...props }) => {
  const organizationOverview = usePlaceholder('organizationDeFi')
  useEffect(() => {
    setTemplateState((s) => ({ ...s, headerTitle: 'Organization DeFi' }))
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

export default DeFi
