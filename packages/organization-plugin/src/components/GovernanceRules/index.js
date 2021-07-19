import React, { useState, useMemo } from 'react'
import { Card, Typography } from '@dfohub/design-system'
import { tokenPercentage, fromDecimals, useEthosContext } from '@dfohub/core'
import T from 'prop-types'

import Section from '../shared/Section'
import { OrganizationPropType } from '../../propTypes'

import Rule from './Rule'
import GovernanceRulesFooter from './GovernanceRulesFooter'
import style from './governance-rules.module.scss'

const getProposals = (organization, context) => [
  {
    id: 'proposalLength',
    type: 'st',
    title: 'Length',
    value: organization.blocks,
    percentage: null,
    unit: 'Blocks',
    description: 'The duration of a Proposal',
    inputLabel: 'Proposal Length',
    getTemplate: (proposalLength) =>
      JSON.parse(
        JSON.stringify(context.simpleValueProposalTemplate)
          .split('getValue()')
          .join('getMinimumBlockNumberForSurvey()')
          .split('type')
          .join('uint256')
          .split('value')
          .join(proposalLength)
      ),
    getProposalInitialValues: () => ({
      functionalityName: 'getMinimumBlockNumberForSurvey',
      functionalitySubmitable: false,
      functionalityMethodSignature: 'getMinimumBlockNumberForSurvey()',
      functionalityReplace: 'getMinimumBlockNumberForSurvey',
      functionalityOutputParameters: '["uint256"]',
    }),
    lines: undefined,
    descriptions: ['Survey Length'],
    updates: ['Survey Length updated to %(proposalLength)s blocks'],
  },
  {
    id: 'st-quorum',
    type: 'st',
    title: 'Quorum',
    value: fromDecimals(organization.quorum, organization.decimals),
    percentage: tokenPercentage(organization.quorum, organization.totalSupply),
    unit: organization.symbol,
    description:
      'The minimum number of Voting Tokens staked by voters to reach the a positive result.',
    inputLabel: 'Quorum',
  },
  {
    id: 'st-generation-stake',
    type: 'st',
    title: 'Generation Stake',
    value: fromDecimals(organization.minimumStaking, organization.decimals),
    percentage: tokenPercentage(
      organization.minimumStaking,
      organization.totalSupply
    ),
    unit: organization.symbol,
    description:
      'The minimum number of Voting Tokens staked to create a Proposal.',
    inputLabel: 'Proposal Stake',
  },
  {
    id: 'st-hard-cap',
    type: 'st',
    title: 'Hard Cap',
    value: fromDecimals(organization.votesHardCap, organization.decimals),
    percentage: tokenPercentage(
      organization.votesHardCap,
      organization.totalSupply
    ),
    unit: organization.symbol,
    description:
      'If a proposal reaches a fixed number of voting tokens (example the 90% of the total Token supply) for “Approve” or “Disapprove” it, the proposal automatically ends, independently from the duration rule.',
    inputLabel: 'Hard Cap',
  },
  {
    id: 'st-proposal-reward',
    type: 'st',
    title: 'Proposal Reward',
    value: fromDecimals(organization.surveySingleReward, organization.decimals),
    percentage: null,
    unit: organization.symbol,
    description:
      'The number of Voting Tokens as a reward to the issuer for every single Successful Proposal.',
    inputLabel: 'Dev Incentives',
  },
  {
    id: 'em-length',
    type: 'em',
    title: 'Length',
    value: organization.minimumBlockNumberForEmergencySurvey,
    percentage: null,
    unit: 'Blocks',
    description: 'The duration of an Emergency Proposal',
    inputLabel: 'Emergency Length',
  },
  {
    id: 'em-penalty-fee',
    type: 'em',
    title: 'Penalty fee',
    value: fromDecimals(
      organization.emergencySurveyStaking,
      organization.decimals
    ),
    percentage: tokenPercentage(
      organization.emergencySurveyStaking,
      organization.totalSupply
    ),
    unit: organization.symbol,
    description:
      'The Fee that Emergency Proposal Issuer must stake to propose it. This stake will be lost if the Proposal fails.',
    inputLabel: 'Emergency Penalty',
  },
]

function GovernanceRules({ organization, onSetProposal }) {
  const context = useEthosContext()
  const [isInfoMode, setIsInfoMode] = useState(false)
  const [selectedRule, setSelectedFooterRule] = useState(null)

  const proposals = useMemo(
    () => (organization ? getProposals(organization, context) : []),
    [organization, context]
  )

  const toggleInfoMode = (e) => {
    e.preventDefault()
    setIsInfoMode(!isInfoMode)
  }

  const handleChange = (e) => {
    setSelectedFooterRule(
      selectedRule && selectedRule.id === e.target.value
        ? null
        : proposals.find((rule) => rule.id === e.target.value)
    )
  }

  return (
    <Card
      footerClassName={style.codeFooter}
      Footer={
        <GovernanceRulesFooter
          organization={organization}
          selectedRule={selectedRule}
          onSetProposal={onSetProposal}
        />
      }>
      <Typography
        variant="h2"
        color="primary"
        fontFamily="secondary"
        className={style.cardTitle}>
        Governance Rules{' '}
      </Typography>

      <div className={style.content}>
        <Section
          category="🏰 Regular Proposals:"
          badge={
            <a className={style.infoBadge} href="." onClick={toggleInfoMode}>
              i
            </a>
          }>
          <div className={style.sectionContent}>
            {proposals.map(
              (rule) =>
                rule.type === 'st' && (
                  <Rule
                    key={rule.id}
                    id={rule.id}
                    title={rule.title}
                    value={rule.value}
                    percentage={rule.percentage}
                    unit={rule.unit}
                    description={rule.description}
                    handleChange={handleChange}
                    isInfoMode={isInfoMode}
                    selectedRule={selectedRule}
                  />
                )
            )}
          </div>
        </Section>
        <Section
          category="🚨 Emergency Proposals:"
          badge={
            <a className={style.infoBadge} href="." onClick={toggleInfoMode}>
              i
            </a>
          }>
          <div className={style.sectionContent}>
            {proposals.map(
              (rule) =>
                rule.type === 'em' && (
                  <Rule
                    key={rule.id}
                    id={rule.id}
                    title={rule.title}
                    value={rule.value}
                    percentage={rule.percentage}
                    unit={rule.unit}
                    description={rule.description}
                    handleChange={handleChange}
                    isInfoMode={isInfoMode}
                    selectedRule={selectedRule}
                  />
                )
            )}
          </div>
        </Section>
      </div>
    </Card>
  )
}

export default GovernanceRules

GovernanceRules.propTypes = {
  organization: OrganizationPropType,
  onSetProposal: T.func,
}
