import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { action } from '@storybook/addon-actions'

import {
  OrganizationContextProvider,
  useOrganizationContext,
} from '../../OrganizationContext'

import GovernanceRules from '.'

const item = {
  title: 'Example/GovernanceRules',
  component: GovernanceRules,
}

const onSetProposal = async (...args) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      action('onSetProposal with 500 ms delay')(...args)
      resolve()
    }, 500)
  })
}

const ActiveEditMode = () => {
  const { setEditMode } = useOrganizationContext()
  useEffect(() => {
    setEditMode()
  })
  return <GovernanceRules onSetProposal={onSetProposal} />
}

export const SampleGovernanceRulesViewMode = () => {
  return (
    <HashRouter>
      <OrganizationContextProvider>
        <GovernanceRules />
      </OrganizationContextProvider>
    </HashRouter>
  )
}

export const SampleGovernanceRulesEditMode = () => {
  return (
    <HashRouter>
      <OrganizationContextProvider>
        <ActiveEditMode />
      </OrganizationContextProvider>
    </HashRouter>
  )
}

export default item
