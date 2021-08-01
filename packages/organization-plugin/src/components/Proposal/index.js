import React, { useState } from 'react'
import T from 'prop-types'
import { Card, Typography } from '@ethereansos/interfaces-ui'

import { OrganizationPropType } from '../../propTypes'
import Section from '../shared/Section'
import Link from '../shared/Link'

import { ProposalPropTypes } from './propTypes'
import style from './proposal.module.scss'
import ProposalRunning from './ProposalRunning'
import ProposalTerminated from './ProposalTerminated'
import ProposalCardFooterCode from './ProposalCardFooterCode'
import ProposalCardFooterInfo from './ProposalCardFooterInfo'

function Proposal({
  organization,
  survey,
  loadDiff,
  finalizeProposal,
  etherscanURL,
}) {
  const unit = 'buidl'
  const descriptionMaxLength = 300
  const description = survey.description || ''
  const length =
    description.length > descriptionMaxLength
      ? descriptionMaxLength
      : description.length

  const [isMore, setIsMore] = useState(length < description.length)
  const [showCode, setShowCode] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)

  const toggleIsMore = (e) => {
    e.preventDefault()
    setIsMore(!isMore)
  }

  const handleCode = async () => {
    setLoadingCode(true)
    setShowInfo(false)
    setShowCode(!showCode)
    await loadDiff(survey)
    setLoadingCode(false)
  }
  const handleInfo = () => {
    setShowCode(false)
    setShowInfo(!showInfo)
  }

  const handleFinalize = () => {
    console.log('FInalize proposal', survey.key)
    return finalizeProposal(survey)
  }

  let percAccepted = (parseInt(survey.accepted) / survey.allVotes) * 100
  percAccepted = (isNaN(percAccepted) ? 0 : percAccepted) + '%'
  let percRefused = (parseInt(survey.refused) / survey.allVotes) * 100
  percRefused = (isNaN(percRefused) ? 0 : percRefused) + '%'

  return (
    <Card
      contentClassName={style.cardContent}
      Footer={
        showCode ? (
          <ProposalCardFooterCode survey={survey} loadingCode={loadingCode} />
        ) : showInfo ? (
          <ProposalCardFooterInfo
            survey={survey}
            percAccepted={percAccepted}
            percRefused={percRefused}
            unit={unit}
          />
        ) : null
      }>
      <Section
        category={
          <span className={style.title}>
            <strong>
              {survey.emergency && (
                <span role="img" aria-label="emergency">
                  &#x1F6A8;{'\u00a0'}
                </span>
              )}
              {!survey.codeName
                ? !survey.replaces
                  ? 'One Time'
                  : 'Kill'
                : survey.replaces
                ? 'Edit'
                : 'Add New'}
              {(survey.codeName || survey.replaces) && [
                <span> | </span>,
                <span>{survey.codeName || survey.replaces}</span>,
              ]}
            </strong>
          </span>
        }
        className={style.bioSection}>
        <div className={style.content}>
          <Typography variant="body1">
            <span
              dangerouslySetInnerHTML={{
                __html: description.substring(
                  0,
                  isMore ? length : description.length
                ),
              }}
              className={style.contentDescription}
            />
            {length < description.length && (
              <>
                {isMore ? '... ' : ' '}
                <Link
                  href="."
                  onClick={toggleIsMore}
                  rel="noreferrer"
                  className={style.moreLink}>
                  {isMore ? 'More' : 'Less'}
                </Link>
              </>
            )}
          </Typography>
        </div>
      </Section>
      <Section>
        {survey.checkedTimes > 0 ? (
          <ProposalTerminated
            organization={organization}
            survey={survey}
            percAccepted={percAccepted}
            percRefused={percRefused}
            etherscanURL={etherscanURL}
            unit={unit}
            handleCode={handleCode}
            showCode={showCode}
            handleInfo={handleInfo}
            showInfo={showInfo}
            handleFinalize={handleFinalize}
          />
        ) : (
          <ProposalRunning
            organization={organization}
            survey={survey}
            percAccepted={percAccepted}
            percRefused={percRefused}
            etherscanURL={etherscanURL}
            unit={unit}
            handleCode={handleCode}
            showCode={showCode}
            handleFinalize={handleFinalize}
          />
        )}
      </Section>
    </Card>
  )
}

export default Proposal

Proposal.propTypes = {
  organization: OrganizationPropType,
  survey: ProposalPropTypes,
  loadDiff: T.func.isRequired,
  finalizeProposal: T.func.isRequired,
  etherscanURL: T.string.isRequired,
}
