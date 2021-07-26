import React, { useState, useMemo } from 'react'
import { Card, Typography } from '@dfohub/design-system'
import { useEthosContext } from '@ethereansos/interfaces-core'
import T from 'prop-types'

import Section from '../shared/Section'
import { OrganizationPropType } from '../../propTypes'

import Rule from './Rule'
import GovernanceRulesFooter from './GovernanceRulesFooter'
import style from './governance-rules.module.scss'
import getProposals from './getProposals'

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
