import React, { useState } from 'react'
import { Card, Typography } from '@dfohub/design-system'
import T from 'prop-types'

import Section from '../shared/Section'
import { OrganizationPropType } from '../../propTypes'

import Rule from './Rule'
import GovernanceRulesFooter from './GovernanceRulesFooter'
import style from './governance-rules.module.scss'

function GovernanceRules({ organization, onSetProposal, proposals }) {
  const [isInfoMode, setIsInfoMode] = useState(false)
  const [selectedRule, setSelectedFooterRule] = useState(null)

  const defaultProposals = [
    {
      id: 'st-length',
      title: 'Length',
      value: 'NA',
      percentage: null,
      unit: 'Blocks',
      description: 'The duration of a Proposal',
      inputLabel: 'Proposal Length',
    },
    {
      id: 'st-quorum',
      title: 'Quorum',
      value: 'NA',
      percentage: 'NA',
      unit: 'NNT',
      description:
        'The minimum number of Voting Tokens staked by voters to reach the a positive result.',
      inputLabel: 'Quorum',
    },
    {
      id: 'st-generation-stake',
      title: 'Generation Stake',
      value: 'NA',
      percentage: 'NA',
      unit: 'NNT',
      description:
        'The minimum number of Voting Tokens staked to create a Proposal.',
      inputLabel: 'Proposal Stake',
    },
    {
      id: 'st-hard-cap',
      title: 'Hard Cap',
      value: 'NA',
      percentage: 'NA',
      unit: 'NNT',
      description:
        'If a proposal reaches a fixed number of voting tokens (example the 90% of the total Token supply) for “Approve” or “Disapprove” it, the proposal automatically ends, independently from the duration rule.',
      inputLabel: 'Hard Cap',
    },
    {
      id: 'st-proposal-reward',
      title: 'Proposal Reward',
      value: 'NA',
      percentage: null,
      unit: 'NNT',
      description:
        'The number of Voting Tokens as a reward to the issuer for every single Successful Proposal.',
      inputLabel: 'Dev Incentives',
    },
    {
      id: 'em-length',
      title: 'Length',
      value: organization?.minimumBlockNumberForEmergencySurvey,
      percentage: null,
      unit: 'Blocks',
      description: 'The duration of an Emergency Proposal',
      inputLabel: 'Emergency Length',
    },
    {
      id: 'em-penalty-fee',
      title: 'Penalty fee',
      value: 'NA',
      percentage: 'NA',
      unit: 'NNT',
      description:
        'The Fee that Emergency Proposal Issuer must stake to propose it. This stake will be lost if the Proposal fails.',
      inputLabel: 'Emergency Penalty',
    },
  ]
  const onSetProposalDefault = async () => null

  const _proposals = proposals ? proposals : defaultProposals
  const _onSetProposal = onSetProposal ? onSetProposal : onSetProposalDefault

  const toggleInfoMode = (e) => {
    e.preventDefault()
    setIsInfoMode(!isInfoMode)
  }

  const handleChange = (e) => {
    setSelectedFooterRule(
      selectedRule && selectedRule.id === e.target.value
        ? null
        : _proposals.find((rule) => rule.id === e.target.value)
    )
  }

  return (
    <Card
      footerClassName={style.codeFooter}
      Footer={
        <GovernanceRulesFooter
          selectedRule={selectedRule}
          onSetProposal={_onSetProposal}
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
            {_proposals.map(
              (rule) =>
                rule.id.startsWith('st-') && (
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
            {_proposals.map(
              (rule) =>
                rule.id.startsWith('em-') && (
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
  proposals: T.array,
}
