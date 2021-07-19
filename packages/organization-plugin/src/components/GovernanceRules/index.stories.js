import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { action } from '@storybook/addon-actions'

import {
  OrganizationContextProvider,
  useOrganizationContext,
} from '../../OrganizationContext'

import GovernanceRules from '.'

const organization = {
  decimals: 2,
  symbol: 'TTT',
  blocks: 20,
  quorum: 10,
  totalSupply: 90,
  minimumStaking: 60,
  votesHardCap: 6,
  surveySingleReward: 17,
  minimumBlockNumberForEmergencySurvey: 21,
  emergencySurveyStaking: 38,
}
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
  return (
    <GovernanceRules
      onSetProposal={onSetProposal}
      organization={organization}
    />
  )
}

export const SampleGovernanceRulesViewMode = () => {
  return (
    <HashRouter>
      <OrganizationContextProvider>
        <GovernanceRules organization={organization} />
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
